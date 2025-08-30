javascript:(function(){
  const PROMPTS_URL = 'https://raw.githubusercontent.com/DavidMooreUK/prompt-library/main/prompts.json';
  
  if (document.getElementById('prompt-picker-modal')) {
    document.getElementById('prompt-picker-modal').remove();
    return;
  }

  const modal = document.createElement('div');
  modal.id = 'prompt-picker-modal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.8); z-index: 10000; display: flex;
    align-items: center; justify-content: center; font-family: system-ui;
  `;

  const container = document.createElement('div');
  container.style.cssText = `
    background: white; border-radius: 8px; width: 90%; max-width: 600px;
    max-height: 80vh; overflow: hidden; display: flex; flex-direction: column;
  `;

  const header = document.createElement('div');
  header.style.cssText = `
    padding: 20px; border-bottom: 1px solid #eee; display: flex;
    justify-content: space-between; align-items: center;
  `;
  header.innerHTML = `
    <h2 style="margin: 0;">Prompt Library</h2>
    <button onclick="document.getElementById('prompt-picker-modal').remove()" 
            style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
  `;

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search prompts...';
  searchInput.style.cssText = `
    width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd;
    border-radius: 4px; font-size: 14px;
  `;

  const promptList = document.createElement('div');
  promptList.style.cssText = `
    flex: 1; overflow-y: auto; padding: 0 20px 20px;
  `;

  container.appendChild(header);
  container.appendChild(searchInput);
  container.appendChild(promptList);
  modal.appendChild(container);

  fetch(PROMPTS_URL)
    .then(response => response.json())
    .then(data => {
      let allPrompts = data.prompts;
      
      function renderPrompts(prompts) {
        promptList.innerHTML = '';
        prompts.forEach(prompt => {
          const item = document.createElement('div');
          item.style.cssText = `
            border: 1px solid #eee; border-radius: 6px; padding: 15px;
            margin: 10px 0; cursor: pointer; transition: background 0.2s;
          `;
          item.onmouseenter = () => item.style.background = '#f5f5f5';
          item.onmouseleave = () => item.style.background = 'white';
          
          item.innerHTML = `
            <h3 style="margin: 0 0 8px 0; color: #333;">${prompt.title}</h3>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${prompt.description}</p>
            <div style="font-size: 12px; color: #888;">
              Category: ${prompt.category} | Tags: ${prompt.tags.join(', ')}
            </div>
          `;
          
          item.onclick = () => {
            navigator.clipboard.writeText(prompt.prompt).then(() => {
              alert('Prompt copied to clipboard!');
              modal.remove();
            });
          };
          
          promptList.appendChild(item);
        });
      }

      searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allPrompts.filter(prompt =>
          prompt.title.toLowerCase().includes(query) ||
          prompt.description.toLowerCase().includes(query) ||
          prompt.tags.some(tag => tag.toLowerCase().includes(query)) ||
          prompt.category.toLowerCase().includes(query)
        );
        renderPrompts(filtered);
      };

      renderPrompts(allPrompts);
    })
    .catch(err => {
      promptList.innerHTML = `<p style="color: red; text-align: center;">Failed to load prompts: ${err.message}</p>`;
    });

  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  document.body.appendChild(modal);
})();