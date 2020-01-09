# Werewolf App

A browser-based tool to assist moderators for the Werewolf party game. Built in React 16.12.0

**View on Netlify: https://techspeterson-werewolf.netlify.com/**

## About
This app is intended as an aid for Werewolf moderators, allowing them to track game progress, player status (including roles, and alive/dead status), and choices made during day and night phases.

### Roles currently supported
- Villager
- Werewolf
- Bodyguard
- Seer
- Spellcaster

## How to run locally
Yarn commands supported by create-react-app applications are supported here. Run `yarn start` in the project directory to run the app (in development mode) in the web browser. The page will reload automatically if any edits are made while the app is running. Run `yarn build` to build for production.

## How to use

### Game setup
The **Add Players** interface is displayed upon starting the app. Use the form to enter the names of the players. Remove a player from the list by clicking the ✖ next to their name. Clicking the **Finalise Players** button will lock in the current list of players.

From here, roles (including the werewolf role, and any other special roles) can be added to any number of players. Select the role from the first drop-down and the player's name from the second drop-down, and click **Add Role**  to confirm. A player's role can be overwritten by repeating this process.

Clicking the **Finalise Roles** will automatically assign the Villager role to any players that have not been assigned a role, and end the setup phase.

### Gameplay cycle
Upon finishing the game setup, the app will now begin the game's day/night cycle, starting at Day 1. The full list of **Players** (including roles) is now visible and separated into **Alive** and **Dead** categories, and the ratio of living player count to total player count is also displayed.

The other half of the display will show the current phase's actions, as well as any alerts (eg. announcement of player death) following the previous phase's events.

#### Day phase
**Day 1** is an introductory day, reserved for the moderator to explain the rules of the game and for the players to introduce their characters. No voting takes place on this day.

From **Day 2 onwards** the players are given a time limit (typically ten minutes) to have discussion and potentially vote for someone to execute that day. If the players reach a majority vote, enter that player's name using the drop-down form, and that player will be recorded as dead. If a majority vote is not reached, submit without selecting a name. Either way, the game will now proceed to the following night phase.

#### Night phase
During night phases, the app will allow the moderator to input the selections for any roles (notably the werewolf team) that are able to act during the night, if their players are still alive. Select the targeted player from the drop-down next to the role name if/when that player or team chooses to target someone. If that role's action receives immediate feedback (such as for the Seer), it will be displayed next to their target.

Submitting the form will confirm all actions, process any deaths or additional effects, and proceed to the following day phase.

### Ending the game
An alert will display if any of the following win conditions are met:
- All the werewolves are eliminated (victory for the villagers)
- The werewolves reach a majority in the village (victory for the wolves)