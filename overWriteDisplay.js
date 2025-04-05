Hooks.once('ready', () => {
  console.log("[overWriteDisplay.js]: Initializing module to restrict GM administrative actions.");

  const authorizedUsers = ["Sin (GM)", "Miria (GM)", "Saurusius (GM)", "AngelWitch (GM)", "Kufru (GM", "Sven (ADM)"];

  if (!authorizedUsers.includes(game.user.name) || !game.user.isOwner) {
    console.log("%c[overWriteDisplay.js]: User not authorized nor world owner. Applying restrictions...", "color: orange; font-weight: bold;");

    // Function to remove restricted buttons using document.querySelector
    const removeRestrictedButtons = (observer) => {
      console.log("[overWriteDisplay.js]: Executing removeRestrictedButtons function.");

      // Attempt to find and log the User Management button
      const userManagementButton = document.querySelector('button[data-action="players"]');
      console.log("[overWriteDisplay.js]: User Management Button:", userManagementButton);
      if (userManagementButton) {
        userManagementButton.remove();
        console.log("%c[overWriteDisplay.js]: Removed 'User Management' button from settings tab.", "color: grey; font-weight: bold;");
      } else {
        console.warn("%c[overWriteDisplay.js]: 'User Management' button not found in settings tab.", "color: orange;");
      }

      // Attempt to find and log the Modules button
      const modulesButton = document.querySelector('button[data-action="modules"]');
      console.log("[overWriteDisplay.js]: Modules Button:", modulesButton);
      if (modulesButton) {
        modulesButton.remove();
        console.log("%c[overWriteDisplay.js]: Removed 'Manage Modules' button from settings tab.", "color: grey; font-weight: bold;");
      } else {
        console.warn("%c[overWriteDisplay.js]: 'Manage Modules' button not found in settings tab.", "color: orange;");
      }

      // Attempt to find and log the World Settings button
      const worldSettingsButton = document.querySelector('button[data-action="world"]');
      console.log("[overWriteDisplay.js]: World Settings Button:", worldSettingsButton);
      if (worldSettingsButton) {
        worldSettingsButton.remove();
        console.log("%c[overWriteDisplay.js]: Removed 'Edit World' button from settings tab.", "color: grey; font-weight: bold;");
      } else {
        console.warn("%c[overWriteDisplay.js]: 'Edit World' button not found in settings tab.", "color: orange;");
      }

      // Disconnect the observer after processing the buttons
      if (observer) {
        observer.disconnect();
        console.log("[overWriteDisplay.js]: MutationObserver disconnected after processing buttons.");
      }
    };

    // Set up a MutationObserver to detect when the settings tab is added to the DOM
    const sidebarObserver = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.addedNodes.length) {
          const settingsTab = document.querySelector('.tab[data-tab="settings"]');
          if (settingsTab) {
            console.log("[overWriteDisplay.js]: Settings tab detected in the DOM. Applying restrictions.");
            removeRestrictedButtons(sidebarObserver);
            break; // Exit the loop once the settings tab is processed
          }
        }
      }
    });

    // Start observing the sidebar for changes
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebarObserver.observe(sidebar, { childList: true, subtree: true });
      console.log("[overWriteDisplay.js]: MutationObserver attached to sidebar.");
    } else {
      console.warn("[overWriteDisplay.js]: Sidebar element not found.");
    }
  } else {
    console.log("%c[overWriteDisplay.js]: User is either authorized or the world owner. No restrictions applied.", "color: green; font-weight: bold;");
  }
});
