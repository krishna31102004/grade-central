import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FileUploadProvider } from './context/FileUploadContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FileUploadProvider>
        <App />
      </FileUploadProvider>
    </BrowserRouter>
  </StrictMode>,
)
