Hooks.once('ready', () => {
  try {
    console.log("[overWriteDisplay.js]: Initializing module to restrict GM administrative actions.");
    console.log(`[overWriteDisplay.js]: User name: ${game.user.name}`);

    // List of authorized usernames
    const authorizedUsers = ["Sin (GM)", "Miria (GM)", "Sven (ADM)", "Vanille (GM)"];

    // Check if the current user is a GM but not the world owner
    if (!authorizedUsers.includes(game.user.name) && !game.user.isOwner) {
      console.log("%c[overWriteDisplay.js]: User not authorized nor world owner. Applying restrictions...", "color: orange; font-weight: bold;");

      // Disable specific elements in the sidebar to restrict GM access
      Hooks.on('renderSidebarTab', (app, html) => {
        try {
          if (app.options.id === 'settings') {
            console.log("%c[overWriteDisplay.js]: Rendering settings sidebar tab...", "color: grey; font-style: italic;");

            // Remove the Users button
            const userManagementButton = html.find('button[data-action="users"]');
            if (userManagementButton.length > 0) {
              userManagementButton.remove();
              console.log("%c[overWriteDisplay.js]: Removed the 'Users' button from settings tab.", "color: grey; font-weight: bold;");
            } else {
              console.warn("%c[overWriteDisplay.js]: 'Users' button not found in settings tab.", "color: orange;");
            }

            // Remove the Modules button
            const modulesButton = html.find('button[data-action="modules"]');
            if (modulesButton.length > 0) {
              modulesButton.remove();
              console.log("%c[overWriteDisplay.js]: Removed the 'Modules' button from settings tab.", "color: grey; font-weight: bold;");
            } else {
              console.warn("%c[overWriteDisplay.js]: 'Modules' button not found in settings tab.", "color: orange;");
            }

            // Remove the World Settings menu item
            const worldSettingsMenu = html.find('.menu-world');
            if (worldSettingsMenu.length > 0) {
              worldSettingsMenu.remove();
              console.log("%c[overWriteDisplay.js]: Removed the 'World Settings' menu item.", "color: grey; font-weight: bold;");
            } else {
              console.warn("%c[overWriteDisplay.js]: 'World Settings' menu item not found.", "color: orange;");
            }
          }
        } catch (error) {
          console.error("%c[overWriteDisplay.js]: Error occurred while rendering sidebar settings.", "color: red; font-weight: bold;", error);
        }
      });

      // Block access to user management through URL manipulation
      Hooks.on('renderUserManagement', (app) => {
        try {
          console.log("%c[overWriteDisplay.js]: Attempt to access User Management detected. Blocking access.", "color: purple; font-weight: bold;");
          ui.notifications.warn("Access to user management is restricted.");
          app.close();
        } catch (error) {
          console.error("%c[overWriteDisplay.js]: Error occurred while blocking User Management access.", "color: red; font-weight: bold;", error);
        }
      });

      // Intercept user deletion attempt
      try {
        game.users.apps.forEach(app => {
          if (app.deleteUser) {
            console.log("%c[overWriteDisplay.js]: Intercepting deleteUser function.", "color: orange; font-weight: bold;");
            app.deleteUser = () => {
              try {
                ui.notifications.warn("Deleting users is restricted.");
                console.log("%c[overWriteDisplay.js]: User deletion attempt blocked.", "color: grey; font-weight: bold;");
                return false;
              } catch (error) {
                console.error("%c[overWriteDisplay.js]: Error occurred while blocking user deletion.", "color: red; font-weight: bold;", error);
              }
            };
          } else {
            console.warn("%c[overWriteDisplay.js]: No deleteUser function found for app.", "color: orange;");
          }
        });
      } catch (error) {
        console.error("%c[overWriteDisplay.js]: Error occurred while intercepting user deletion attempts.", "color: red; font-weight: bold;", error);
      }
    } else {
      console.log("%c[overWriteDisplay.js]: User is either authorized or the world owner. No restrictions applied.", "color: green; font-weight: bold;");
    }
  } catch (error) {
    console.error("%c[overWriteDisplay.js]: Critical error during module initialization.", "color: red; font-weight: bold;", error);
  }
});
