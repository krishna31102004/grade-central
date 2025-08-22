import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FileUploadProvider } from './context/FileUploadContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FileUploadProvider>
      <App />
    </FileUploadProvider>
  </StrictMode>,
)
