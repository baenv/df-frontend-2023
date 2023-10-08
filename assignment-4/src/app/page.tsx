import React from 'react'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('./comp/App'), { ssr: false })

export default function Home() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
