import { ActionPanel, Action, List, showToast, Toast, Clipboard } from "@raycast/api";
import { useState, useEffect } from "react";
import { useFetch } from "@raycast/utils";

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

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, error } = useFetch<PromptLibrary>(PROMPTS_URL);

  const filteredPrompts = data?.prompts.filter((prompt) => {
    const searchLower = searchText.toLowerCase();
    return (
      prompt.title.toLowerCase().includes(searchLower) ||
      prompt.description.toLowerCase().includes(searchLower) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      prompt.category.toLowerCase().includes(searchLower)
    );
  }) || [];

  if (error) {
    showToast(Toast.Style.Failure, "Failed to load prompts", error.message);
  }

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search prompts by title, description, tags, or category..."
      throttle
    >
      {filteredPrompts.map((prompt) => (
        <PromptListItem key={prompt.id} prompt={prompt} />
      ))}
    </List>
  );
}

function PromptListItem({ prompt }: { prompt: Prompt }) {
  const accessories = [
    { text: prompt.category },
    ...prompt.tags.map(tag => ({ tag }))
  ];

  return (
    <List.Item
      title={prompt.title}
      subtitle={prompt.description}
      accessories={accessories}
      actions={
        <ActionPanel>
          <Action
            title="Copy Prompt"
            onAction={() => {
              Clipboard.copy(prompt.prompt);
              showToast(Toast.Style.Success, "Copied to clipboard");
            }}
          />
          <Action
            title="Copy Prompt with Variables"
            onAction={() => {
              const variables = prompt.variables || [];
              const promptWithVars = variables.length > 0 
                ? `${prompt.prompt}\n\nVariables to replace:\n${variables.map(v => `- {${v}}: `).join('\n')}`
                : prompt.prompt;
              Clipboard.copy(promptWithVars);
              showToast(Toast.Style.Success, "Copied with variable placeholders");
            }}
          />
        </ActionPanel>
      }
    />
  );
}