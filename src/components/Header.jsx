import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header({ onCreateClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-0g-black/90 backdrop-blur-sm border-b border-0g-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-medium tracking-tight">0G</span>
            <span className="text-0g-muted">/</span>
            <span className="text-0g-muted text-sm">BOUNTY</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#bounties" className="text-0g-muted hover:text-white transition-colors text-sm uppercase tracking-wider">
              Bounties
            </a>
            <a href="#how-it-works" className="text-0g-muted hover:text-white transition-colors text-sm uppercase tracking-wider">
              How It Works
            </a>
            <a href="https://docs.0g.ai" target="_blank" rel="noopener" className="text-0g-muted hover:text-white transition-colors text-sm uppercase tracking-wider">
              Docs
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="btn-secondary-0g hidden sm:block">
              Connect
            </button>
            <button onClick={onCreateClick} className="btn-primary-0g">
              Post Bounty
            </button>
            
            {/* Mobile menu */}
            <button 
              className="md:hidden p-2 text-0g-muted"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-0g-border bg-0g-black">
          <div className="px-6 py-6 space-y-4">
            <a href="#bounties" className="block text-0g-muted hover:text-white text-sm uppercase tracking-wider">Bounties</a>
            <a href="#how-it-works" className="block text-0g-muted hover:text-white text-sm uppercase tracking-wider">How It Works</a>
            <a href="https://docs.0g.ai" className="block text-0g-muted hover:text-white text-sm uppercase tracking-wider">Docs</a>
            <div className="pt-4 border-t border-0g-border">
              <button className="btn-secondary-0g w-full">Connect Wallet</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
