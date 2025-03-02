import React from 'react'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from 'react-hot-toast'  // Keep the import for Toaster
import AppRouter from './AppRouter'



function App() {

  
  return (
    <>
      <BrowserRouter>
        <Toaster /> {/* This will show toast notifications */}
        <AppRouter/>
        
      </BrowserRouter>
    </>
  )
}

export default App
