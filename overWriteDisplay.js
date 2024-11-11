Hooks.once('ready', () => {
  console.log("[overWriteDisplay.js]: Initializing module to restrict GM administrative actions.");

  const authorizedUsers = ["Sin (GM)", "Miria (GM)", "Sven (ADM)", "Vanille (GM)"];

  if (!authorizedUsers.includes(game.user.name) || !game.user.isOwner) {
    console.log("%c[overWriteDisplay.js]: User not authorized nor world owner. Applying restrictions...", "color: orange; font-weight: bold;");

    // Function to remove restricted buttons using document.querySelector
    const removeRestrictedButtons = () => {
      // Remove User Management button
      const userManagementButton = document.querySelector('button[data-action="players"]');
      if (userManagementButton) {
        userManagementButton.remove();
        console.log("%c[overWriteDisplay.js]: Removed 'User Management' button from settings tab.", "color: grey; font-weight: bold;");
      } else {
        console.warn("%c[overWriteDisplay.js]: 'User Management' button not found in settings tab.", "color: orange;");
      }

      // Remove Modules button
      const modulesButton = document.querySelector('button[data-action="modules"]');
      if (modulesButton) {
        modulesButton.remove();
        console.log("%c[overWriteDisplay.js]: Removed 'Manage Modules' button from settings tab.", "color: grey; font-weight: bold;");
      } else {
        console.warn("%c[overWriteDisplay.js]: 'Manage Modules' button not found in settings tab.", "color: orange;");
      }

      // Remove World Settings button
      const worldSettingsButton = document.querySelector('button[data-action="world"]');
      if (worldSettingsButton) {
        worldSettingsButton.remove();
        console.log("%c[overWriteDisplay.js]: Removed 'Edit World' button from settings tab.", "color: grey; font-weight: bold;");
      } else {
        console.warn("%c[overWriteDisplay.js]: 'Edit World' button not found in settings tab.", "color: orange;");
      }
    };

    // Apply the function when the settings sidebar tab is rendered
    Hooks.on('renderSidebarTab', (app) => {
      if (app.options.id === 'settings') {
        console.log("%c[overWriteDisplay.js]: Settings sidebar tab rendered. Applying button restrictions.", "color: grey; font-style: italic;");
        removeRestrictedButtons();

        // Use MutationObserver to detect any future changes within the settings tab
        const observer = new MutationObserver(() => {
          removeRestrictedButtons();
        });

        const settingsTab = document.getElementById('settings');
        if (settingsTab) {
          observer.observe(settingsTab, { childList: true, subtree: true });
        }
      }
    });
  } else {
    console.log("%c[overWriteDisplay.js]: User is either authorized or the world owner. No restrictions applied.", "color: green; font-weight: bold;");
  }
});
