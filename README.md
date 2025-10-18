# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    # customerlabs-segment-builder-app

    Initial commit README — simple and minimal.

    Tech used
    - Vite
    - React 18 + TypeScript
    - Tailwind CSS

    How to run (PowerShell)

    Install dependencies

    ```powershell
    npm install
    ```

    Start development server (HMR)

    ```powershell
    npm run dev
    ```

    Build for production

    ```powershell
    npm run build
    ```

    Preview production build

    ```powershell
    npm run preview
    ```

    Lint the project

    ```powershell
    npm run lint
    ```

    Main files
    - `src/main.tsx` — app entry
    - `src/App.tsx` — demo component

    You can update this README later with project description, license, badges, and contribution notes.
      },
````
