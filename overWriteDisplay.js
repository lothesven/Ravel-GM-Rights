Hooks.once('ready', () => {
  console.log("[overWriteDisplay.js]: Initializing module to restrict GM administrative actions.");
  
  const authorizedUsers = ["Sin (GM)", "Miria (GM)", "Sven (ADM)", "Vanille (GM)"];
  
  if (!authorizedUsers.includes(game.user.name) || !game.user.isOwner) {
    console.log("%c[overWriteDisplay.js]: User not authorized nor world owner. Applying restrictions...", "color: orange; font-weight: bold;");
    
    // Observe the settings tab for DOM changes
    const removeRestrictedButtons = (html) => {
      const settingsContainer = html.find('#settings-game');

      // Remove User Management button
      const userManagementButton = settingsContainer.find('button[data-action="players"]');
      if (userManagementButton.length > 0) {
        userManagementButton.remove();
        console.log("%c[overWriteDisplay.js]: Removed 'User Management' button from settings tab.", "color: grey; font-weight: bold;");
      }

      // Remove Modules button
      const modulesButton = settingsContainer.find('button[data-action="modules"]');
      if (modulesButton.length > 0) {
        modulesButton.remove();
        console.log("%c[overWriteDisplay.js]: Removed 'Manage Modules' button from settings tab.", "color: grey; font-weight: bold;");
      }

      // Remove World Settings button
      const worldSettingsButton = settingsContainer.find('button[data-action="world"]');
      if (worldSettingsButton.length > 0) {
        worldSettingsButton.remove();
        console.log("%c[overWriteDisplay.js]: Removed 'Edit World' button from settings tab.", "color: grey; font-weight: bold;");
      }
    };

    // Apply the function when settings are rendered
    Hooks.on('renderSettingsConfig', (app, html) => {
      console.log("%c[overWriteDisplay.js]: SettingsConfig rendered. Applying button restrictions.", "color: grey; font-style: italic;");
      removeRestrictedButtons(html);

      // Use MutationObserver to detect any future changes within the settings tab
      const observer = new MutationObserver(() => {
        removeRestrictedButtons(html);
      });
      
      observer.observe(html[0], { childList: true, subtree: true });
    });
  } else {
    console.log("%c[overWriteDisplay.js]: User is either authorized or the world owner. No restrictions applied.", "color: green; font-weight: bold;");
  }
});
