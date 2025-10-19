# 🧩 CustomerLabs Segment Builder App

A single-page application built to demonstrate the creation and saving of custom user segments using a dynamic schema builder interface. The application features a modal workflow where users can name a segment and dynamically select user and group traits to construct a payload, which is then sent to an external webhook via a Netlify Function proxy.

## ✨ Features

* **Dynamic Schema Builder:** Allows users to add, remove, and modify schema traits (e.g., 'First Name', 'Age', 'Account Name') for a new segment.
* **Trait Exclusivity:** Ensures that each schema trait can only be selected once across all active dropdowns within the segment builder.
* **Trait Indicators:** Visual indicators differentiate between User Traits (e.g., green dot) and Group Traits (e.g., red dot).
* **Netlify Proxy Integration:** Uses a Netlify Function to act as a CORS proxy, successfully submitting the JSON segment payload to an external `webhook.site` endpoint.
* **Form Validation:** Basic validation for segment name and schema count.

## 🚀 Tech Stack

This project is built using modern JavaScript development tools to ensure performance and maintainability.

| Technology | Purpose |
| :--- | :--- |
| **Frontend** | |
| **React 18 + TypeScript** | Core application logic and type safety. |
| **Vite** | Fast development server and optimized build tooling. |
| **Tailwind CSS** | Utility-first CSS framework for rapid UI development. |
| **Deployment** | |
| **Netlify** | Continuous deployment and hosting. |
| **Netlify Functions** | Serverless function (`proxyWebhook.js`) for handling CORS and API communication. |
| **Dependencies** | |
| **`node-fetch@2`** | Used in the Netlify function for making external HTTP requests. |

## 📁 Project Structure (Key Files)

| File / Directory | Description |
| :--- | :--- |
| `src/components/SegmentPopup.tsx` | The core modal component containing the state, business logic, and API submission handler (`handleSaveSegment`). |
| `src/components/SchemaDropDown.tsx` | Reusable component for selecting and managing a single schema trait. |
| `src/types.ts` | TypeScript definitions for schema options, selected schemas, and the final payload structure. |
| `netlify/functions/proxyWebhook.js` | The Node.js serverless function that proxies the segment data POST request to `webhook.site`, bypassing CORS limitations. |
| `src/App.tsx` | The application's main entry point (contains the demo component). |

## ⚙️ Local Development

### Prerequisites

You need **Node.js** (v18+) and **npm** or **Yarn** installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone [Your-Repo-URL]
    cd customerlabs-segment-builder-app
    ```

2.  Install dependencies (this includes frontend packages and `node-fetch` for the Netlify function):
    ```bash
    npm install
    # OR
    yarn install
    ```

### Running the Application

1.  **Start Development Server (with HMR):**
    ```bash
    npm run dev
    # OR
    yarn dev
    ```
    The application will typically be available at `http://localhost:5173`.

2.  **Build for Production:**
    ```bash
    npm run build
    # OR
    yarn build
    ```
    This command compiles the source code into the `dist` directory.

3.  **Preview Production Build:**
    ```bash
    npm run preview
    # OR
    yarn preview
    ```

4.  **Lint the Project:**
    ```bash
    npm run lint
    # OR
    yarn lint
    ```

## ⚠️ Important Note on Netlify Function

To deploy this application successfully on Netlify:

1.  Ensure your function files are located in the `netlify/functions` directory.
2.  The `node-fetch` package **must** be declared in the root `package.json` under `dependencies`.
3.  The client-side `fetch` in `SegmentPopup.tsx` must point to the proxy path: `/.netlify/functions/proxyWebhook`.

