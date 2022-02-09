# PP Commander

Electron app.

Frequently used commands, like rsync scripts for HDD backups, or for encrypted container mounting etc. can be stored in json config files, and this app provides a GUI for the same.

Features:
---------
1. Create/Update/View Json config with commands logically grouped into 'Features'
2. Execute the commands

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.

The app will reload when you make changes.
You may also see any lint errors in the console.
In the background, frontend react app will be served in localhost:3000 which the electron app renders.

### `npm run build`

Builds the react app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run dist`

Uses electron-builder to build an installer for the app to the `out` folder.
React production build is done first, and that build is used to create the electron app installer.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
