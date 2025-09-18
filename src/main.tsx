import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

<GoogleOAuthProvider clientId="TU_CLIENT_ID_DE_GOOGLE">
  <App />
</GoogleOAuthProvider>
