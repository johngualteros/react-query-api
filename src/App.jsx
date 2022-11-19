import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Products from './components/Products'
import ProductForm from './components/ProductForm'

function App() {

  return (
    <div className="App">
      <ProductForm />
      <Products />
    </div>
  )
}

export default App
