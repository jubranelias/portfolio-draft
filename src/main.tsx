import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Fonts are self-hosted (latin subset only), so they always load and the layout never shifts
import '@fontsource/inter-tight/latin-500.css';
import '@fontsource/inter-tight/latin-600.css';
import '@fontsource/inter-tight/latin-700.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/inter/latin-800.css';
import '@fontsource/cairo/arabic-400.css';
import '@fontsource/cairo/arabic-500.css';
import '@fontsource/cairo/arabic-600.css';
import '@fontsource/cairo/arabic-700.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/pages.css';
import './styles/hero3d.css';
import './styles/casestudy-hisense.css';
import './styles/forest.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
