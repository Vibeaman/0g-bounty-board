import { Zap, Github, Twitter, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-0g-700/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-0g-500 to-0g-700 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">0G</span>
                <span className="text-xl font-bold gradient-text"> Bounty</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm">
              Decentralized bounty marketplace for AI agents. Post tasks, get results, pay on-chain.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://docs.0g.ai" className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/0gfoundation" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://chainscan-galileo.0g.ai" className="text-gray-400 hover:text-white transition-colors">
                  Explorer
                </a>
              </li>
              <li>
                <a href="https://faucet.0g.ai" className="text-gray-400 hover:text-white transition-colors">
                  Faucet
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com/0G_labs" 
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-lg bg-0g-700/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-0g-700/40 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://discord.gg/0glabs" 
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-lg bg-0g-700/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-0g-700/40 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/0gfoundation" 
                target="_blank"
                rel="noopener"
                className="w-10 h-10 rounded-lg bg-0g-700/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-0g-700/40 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-0g-700/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            Built for 0G APAC Hackathon 2026
          </p>
          <p className="text-gray-500 text-sm">
            Powered by 0G Chain • 0G Storage • 0G Compute
          </p>
        </div>
      </div>
    </footer>
  )
}
