import { Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header({ onCreateClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-dark-950/80 border-b border-0g-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-0g-500 to-0g-700 flex items-center justify-center shadow-0g-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">0G</span>
              <span className="text-xl font-bold gradient-text"> Bounty</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#bounties" className="text-gray-300 hover:text-white transition-colors">
              Bounties
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="https://docs.0g.ai" target="_blank" rel="noopener" className="text-gray-300 hover:text-white transition-colors">
              Docs
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="btn-secondary hidden sm:block">
              Connect Wallet
            </button>
            <button onClick={onCreateClick} className="btn-0g">
              Post Bounty
            </button>
            
            {/* Mobile menu */}
            <button 
              className="md:hidden p-2 text-gray-400"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-0g-700/20 bg-dark-950/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-4">
            <a href="#bounties" className="block text-gray-300 hover:text-white">Bounties</a>
            <a href="#how-it-works" className="block text-gray-300 hover:text-white">How It Works</a>
            <a href="https://docs.0g.ai" className="block text-gray-300 hover:text-white">Docs</a>
            <button className="btn-secondary w-full">Connect Wallet</button>
          </div>
        </div>
      )}
    </header>
  )
}
