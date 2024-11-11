// Register the setting for toggling logs
Hooks.once('init', () => {
  game.settings.register('overWriteDisplay', 'enableLogging', {
    name: "Enable Debug Logging",
    hint: "Toggle debug logging for the overWriteDisplay module.",
    scope: "client",   // Client-specific setting (per user)
    config: true,      // Displays in the Configure Settings menu
    type: Boolean,
    default: true,     // Default to logging enabled
    onChange: value => window.location.reload() // Reload to apply setting immediately
  });
});

// Helper function to log if the setting is enabled
function log(message, style = "") {
  if (game.settings.get('overWriteDisplay', 'enableLogging')) {
    console.log(message, style);
  }
}

// Main hook logic
Hooks.once('ready', () => {
  log("[overWriteDisplay.js]: Initializing module to restrict GM administrative actions.");

  const authorizedUsers = ["Sin (GM)", "Miria (GM)", "Sven (ADM)", "Vanille (GM)"];

  if (!authorizedUsers.includes(game.user.name) || !game.user.isOwner) {
    log("%c[overWriteDisplay.js]: User not authorized nor world owner. Applying restrictions...", "color: orange; font-weight: bold;");

    // Function to remove restricted buttons using document.querySelector
    const removeRestrictedButtons = () => {
      log("[overWriteDisplay.js]: Executing removeRestrictedButtons function.");

      // Attempt to find and log the User Management button
      const userManagementButton = document.querySelector('button[data-action="players"]');
      log("[overWriteDisplay.js]: User Management Button:", userManagementButton);
      if (userManagementButton) {
        userManagementButton.remove();
        log("%c[overWriteDisplay.js]: Removed 'User Management' button from settings tab.", "color: grey; font-weight: bold;");
      } else {
        log("%c[overWriteDisplay.js]: 'User Management' button not found in settings tab.", "color: orange;");
      }

      // Attempt to find and log the Modules button
      const modulesButton = document.querySelector('button[data-action="modules"]');
      log("[overWriteDisplay.js]: Modules Button:", modulesButton);
      if (modulesButton) {
        modulesButton.remove();
        log("%c[overWriteDisplay.js]: Removed 'Manage Modules' button from settings tab.", "color: grey; font-weight: bold;");
      } else {
        log("%c[overWriteDisplay.js]: 'Manage Modules' button not found in settings tab.", "color: orange;");
      }

      // Attempt to find and log the World Settings button
      const worldSettingsButton = document.querySelector('button[data-action="world"]');
      log("[overWriteDisplay.js]: World Settings Button:", worldSettingsButton);
      if (worldSettingsButton) {
        worldSettingsButton.remove();
        log("%c[overWriteDisplay.js]: Removed 'Edit World' button from settings tab.", "color: grey; font-weight: bold;");
      } else {
        log("%c[overWriteDisplay.js]: 'Edit World' button not found in settings tab.", "color: orange;");
      }
    };

    // Apply the function when the settings sidebar tab is rendered
    Hooks.on('renderSidebarTab', (app) => {
      log("[overWriteDisplay.js]: renderSidebarTab hook triggered.");
      log("[overWriteDisplay.js]: Sidebar Tab Name:", app.tabName);

      if (app.tabName === 'settings') {
        log("%c[overWriteDisplay.js]: Settings sidebar tab rendered. Applying button restrictions.", "color: grey; font-style: italic;");
        removeRestrictedButtons();

        // Use MutationObserver to detect any future changes within the settings tab
        const observer = new MutationObserver(() => {
          log("[overWriteDisplay.js]: MutationObserver detected changes in settings tab.");
          removeRestrictedButtons();
        });

        const settingsTab = document.getElementById('settings');
        log("[overWriteDisplay.js]: Settings Tab Element:", settingsTab);
        if (settingsTab) {
          log("[overWriteDisplay.js]: MutationObserver attached to settings tab.");
          observer.observe(settingsTab, { childList: true, subtree: true });
        } else {
          log("[overWriteDisplay.js]: Settings tab element not found.", "color: red;");
        }
      }
    });
  } else {
    log("%c[overWriteDisplay.js]: User is either authorized or the world owner. No restrictions applied.", "color: green; font-weight: bold;");
  }
});
