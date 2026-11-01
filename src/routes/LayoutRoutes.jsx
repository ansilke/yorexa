import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hero from '../pages/Hero'

function LayoutRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  )
}

export default LayoutRoutes