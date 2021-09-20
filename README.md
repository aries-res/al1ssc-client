# Aditya-L1 Science Support Cell: Client-side

This is a [React.js](https://reactjs.org/) application for the client side (or front-end) of the Aditya-L1 Science Support Cell (website).

- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- Components are based on [AntDesign](https://ant.design/components/overview/) Design System
- Uses [React Router](https://reactrouter.com/web) to produce multi-page behavior

## Local Setup

### Pre-requisites

- LINUX or MacOS Operating System
- Install [Git](https://git-scm.com/)
- Install and activate LTS version of [Node.js](https://nodejs.org/)

  It's recommended to use [NVM](https://github.com/nvm-sh/nvm) to manage multiple active Node.js versions.

  - Install NVM using [these instructions](https://github.com/nvm-sh/nvm#install--update-script).

  - After that install latest LTS version of Node.js using:

    ```bash
    nvm ls-remote
    nvm install --lts
    ```

    > Note: This project was developed using v14 (fermium), so if you face any problems replace `lts/*` in above command with `lts/fermium`

  - The above command will also automatically activate the installed Node.js version in your shell. Now to make sure it gets activated each time you spawn a shell, do:

    ```bash
    nvm alias default `node -v`
    ```

    > Note: If you don't want to use the installed Node.js version as default, you can replace `default` in above command with another alias name (say `al1ssc`). But then it's your responsibility to remember to activate this version when working with this project each time you spawn a shell, by doing `nvm use al1ssc`.

- Install [yarn](https://yarnpkg.com/) (package manager for Node.js) globally:

  ```bash
  npm install -g yarn
  ```

### Setting up project

1. Clone the repository to your machine:

   ```bash
   git clone https://github.com/aries-res/al1ssc-client.git
   cd al1ssc-client
   ```

2. Install all dependencies of the project:

   ```bash
   yarn
   ```

3. Run the React.js app in development mode:

   ```bash
   yarn start
   ```

   This will open http://localhost:3000 in your browser and any changes you'll make in code will automatically reflect in the webpage.

   > Optional: If you want to configure additional settings like which port is used by development server, you can define concerned [environment variables](https://create-react-app.dev/docs/advanced-configuration/) in an `env.local` file.

### Additional information

You can find information about [creating production build](https://create-react-app.dev/docs/getting-started#npm-run-build-or-yarn-build), [analysing bundle size](https://create-react-app.dev/docs/analyzing-the-bundle-size), etc. in [Create React App docs](https://create-react-app.dev/docs/getting-started).
