import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header({ onCreateClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className={`max-w-6xl mx-auto transition-all duration-300 ${
        scrolled ? 'navbar-float' : ''
      }`}>
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="text-2xl font-semibold">0G</span>
            <span className="text-2xl font-light text-0g-muted">/Bounty</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#bounties" className="text-0g-muted hover:text-0g-text transition-colors text-sm font-medium">
              Bounties
            </a>
            <a href="#how-it-works" className="text-0g-muted hover:text-0g-text transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="https://docs.0g.ai" target="_blank" rel="noopener" className="text-0g-muted hover:text-0g-text transition-colors text-sm font-medium">
              Docs
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button onClick={onCreateClick} className="btn-primary">
              Launch App
            </button>
            
            {/* Mobile menu */}
            <button 
              className="md:hidden p-2 text-0g-muted"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-4 navbar-float">
          <div className="px-6 py-6 space-y-4">
            <a href="#bounties" className="block text-0g-muted hover:text-0g-text font-medium">Bounties</a>
            <a href="#how-it-works" className="block text-0g-muted hover:text-0g-text font-medium">How It Works</a>
            <a href="https://docs.0g.ai" className="block text-0g-muted hover:text-0g-text font-medium">Docs</a>
            <div className="pt-4 border-t border-0g-border">
              <button onClick={onCreateClick} className="btn-primary w-full">Launch App</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
