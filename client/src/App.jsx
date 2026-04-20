import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import BountyList from './components/BountyList'
import CreateBounty from './components/CreateBounty'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'

function App() {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="min-h-screen">
      <Header onCreateClick={() => setShowCreate(true)} />
      
      <main>
        <Hero onCreateClick={() => setShowCreate(true)} />
        <Stats />
        <BountyList />
        <HowItWorks />
      </main>

      <Footer />

      {/* Create Bounty Modal */}
      {showCreate && (
        <CreateBounty onClose={() => setShowCreate(false)} />
      )}
    </div>
  )
}

export default App
