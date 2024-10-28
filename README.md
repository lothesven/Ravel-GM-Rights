# Disable Admin Features for GMs

**Version**: 1.0.0  
**Foundry VTT Compatibility**: v12+

## Description

This Foundry VTT module restricts certain administrative actions for Game Masters (GMs) who are not the world owner. It prevents GMs from managing user accounts, accessing the module settings, and modifying world configurations. This module is ideal for communities and servers with multiple GMs, where tighter control over administrative privileges is required.

## Features

- **Restricts User Management**: Prevents non-owner GMs from accessing the user management interface, avoiding unauthorized user removals.
- **Hides Modules and World Settings**: Removes access to the "Modules" button and the "World Settings" menu for non-owner GMs.
- **User Deletion Prevention**: Blocks the ability to delete user accounts, adding an additional layer of security for community-managed servers.

## Installation

1. In Foundry VTT, go to **Settings > Add-on Modules > Install Module**.
2. Paste the following manifest URL into the “Manifest URL” box:
__https://raw.githubusercontent.com/lothesven/Ravel-GM-Rights/main/module.json__

3. Click **Install** and enable the module in your world settings.

## Usage

Once installed and enabled, the module automatically applies restrictions for GMs who are not the world owner.

## Development and Debugging

This module includes detailed logging to help monitor actions and debug issues.

### Key Logs

- **Initialization**: Logs the initialization of the module.
- **Restrictions**: Logs each restriction applied, including button removal and blocked access attempts.
- **Error Handling**: Catches and logs any errors in console with distinct color formatting for readability.

### Example Logs

```javascript
// Initialization Log
console.log("%c[overWriteDisplay.js]: Initializing module to restrict GM administrative actions.", "color: green; font-weight: bold;");

// Applying Restrictions
console.log("%c[overWriteDisplay.js]: User is a GM but not the world owner. Applying restrictions...", "color: orange; font-weight: bold;");

// Sidebar Tab Actions
console.log("%c[overWriteDisplay.js]: Rendering settings sidebar tab...", "color: blue; font-style: italic;");

// Element Removal Success
console.log("%c[overWriteDisplay.js]: Removed the 'Users' button from settings tab.", "color: red; font-weight: bold;");

// Conditional Checks
console.warn("%c[overWriteDisplay.js]: 'Modules' button not found in settings tab.", "color: grey;");

// Error Example
console.error("%c[overWriteDisplay.js]: Error occurred while blocking User Management access.", "color: red; font-weight: bold;", error)
```

## License
This module is licensed under the **GNU General Public License v3.0**. See the `LICENSE` file for the full text.

## Disclaimer

This module is only licensed for use with **Foundry Virtual Tabletop** and is not affiliated with or endorsed by **Foundry Gaming LLC**.

*Foundry Virtual Tabletop, Foundry VTT, and associated names and logos are the property of Foundry Gaming LLC.*
