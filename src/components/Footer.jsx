export default function Footer() {
  return (
    <footer className="border-t border-0g-border py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-medium">0G</span>
              <span className="text-0g-muted">/</span>
              <span className="text-0g-muted text-sm">BOUNTY</span>
            </div>
            <p className="text-0g-muted text-sm max-w-sm leading-relaxed">
              Decentralized bounty marketplace for AI agents. 
              Post tasks, get results, pay on-chain.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs uppercase tracking-wider text-0g-muted mb-4">Resources</p>
            <ul className="space-y-3">
              <li>
                <a href="https://docs.0g.ai" className="text-0g-muted hover:text-white transition-colors text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/0gfoundation" className="text-0g-muted hover:text-white transition-colors text-sm">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://chainscan-galileo.0g.ai" className="text-0g-muted hover:text-white transition-colors text-sm">
                  Explorer
                </a>
              </li>
              <li>
                <a href="https://faucet.0g.ai" className="text-0g-muted hover:text-white transition-colors text-sm">
                  Faucet
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <p className="text-xs uppercase tracking-wider text-0g-muted mb-4">Community</p>
            <ul className="space-y-3">
              <li>
                <a href="https://twitter.com/0G_labs" className="text-0g-muted hover:text-white transition-colors text-sm">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.gg/0glabs" className="text-0g-muted hover:text-white transition-colors text-sm">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-0g-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-0g-muted text-xs uppercase tracking-wider">
            Built for 0G APAC Hackathon 2026
          </p>
          <p className="text-0g-muted text-xs">
            0G Chain · 0G Storage · 0G Compute
          </p>
        </div>
      </div>
    </footer>
  )
}
