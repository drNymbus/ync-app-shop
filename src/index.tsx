// Import des modules et composants React nécessaires
import React from "react";
import { createRoot } from "react-dom/client";

import { ShopAPIProvider } from "./context/ShopAPIProvider";
import App from "./App";

// Sélection de l'élément DOM où l'application sera rendue et créartion d'une variable capable de rendre dynamiquement l'application
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// StrictMode activé pour demander à React de détecter et expliciter plus de problèmes potentiels
// BrowserRouter est une composante qui nous permet de gérer la navigation entre les pages de l'application
root.render(
    <ShopAPIProvider>
        <App />
    </ShopAPIProvider>
);
