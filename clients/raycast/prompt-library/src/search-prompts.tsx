import { ActionPanel, Action, List, showToast, Toast, Clipboard } from "@raycast/api";
import { useState, useEffect } from "react";

interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  tags: string[];
  category: string;
  variables?: string[];
  example_usage?: string;
}

interface PromptLibrary {
  version: string;
  updated: string;
  prompts: Prompt[];
}

const PROMPTS_URL = "https://raw.githubusercontent.com/DavidMooreUK/prompt-library/main/prompts.json";

export default function SearchPrompts() {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPrompts() {
      try {
        const response = await fetch(PROMPTS_URL);
        const data: PromptLibrary = await response.json();
        setPrompts(data.prompts || []);
        showToast(Toast.Style.Success, `Loaded ${data.prompts?.length || 0} prompts`);
      } catch (error) {
        showToast(Toast.Style.Failure, "Failed to load prompts", String(error));
      } finally {
        setIsLoading(false);
      }
    }
    loadPrompts();
  }, []);

  const filteredPrompts = prompts.filter((prompt) => {
    const searchLower = searchText.toLowerCase();
    return (
      prompt.title.toLowerCase().includes(searchLower) ||
      prompt.description.toLowerCase().includes(searchLower) ||
      prompt.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
      prompt.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search prompts..."
    >
      <List.Item
        title="Debug: Extension is working"
        subtitle={`Found ${prompts.length} prompts, filtered to ${filteredPrompts.length}`}
        accessories={[{ text: isLoading ? "Loading..." : "Ready" }]}
      />
      {filteredPrompts.map((prompt) => (
        <List.Item
          key={prompt.id}
          title={prompt.title}
          subtitle={prompt.description}
          accessories={[{ text: prompt.category }]}
          actions={
            <ActionPanel>
              <Action
                title="Copy Prompt"
                onAction={async () => {
                  await Clipboard.copy(prompt.prompt);
                  await showToast(Toast.Style.Success, "Copied to clipboard");
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}