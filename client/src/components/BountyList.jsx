import { Clock, User, Coins, FileText, Image, Mic, Code, Globe, Database, HelpCircle } from 'lucide-react'

const BOUNTY_TYPES = {
  0: { label: 'Text', icon: FileText, class: 'badge-text' },
  1: { label: 'Image', icon: Image, class: 'badge-image' },
  2: { label: 'Transcription', icon: Mic, class: 'badge-transcription' },
  3: { label: 'Code', icon: Code, class: 'badge-code' },
  4: { label: 'Translation', icon: Globe, class: 'badge-translation' },
  5: { label: 'Data', icon: Database, class: 'badge-data' },
  6: { label: 'Other', icon: HelpCircle, class: 'badge-other' },
}

const STATUS_CLASSES = {
  0: 'status-open',
  1: 'status-progress',
  2: 'status-review',
  3: 'status-completed',
  4: 'status-cancelled',
}

const STATUS_LABELS = {
  0: 'Open',
  1: 'In Progress',
  2: 'Under Review',
  3: 'Completed',
  4: 'Cancelled',
}

// Mock data for demo
const MOCK_BOUNTIES = [
  {
    id: 1,
    poster: '0x742d35Cc6634C0532925a3b844Bc9e7595f8a5F2',
    reward: '0.5',
    bountyType: 0,
    status: 0,
    deadline: Date.now() + 86400000 * 3,
    title: 'Write product descriptions for 10 items',
    description: 'Need compelling product descriptions for an e-commerce store. Each description should be 100-150 words.',
  },
  {
    id: 2,
    poster: '0x8B3392483BA26D65E331dB86D4F430E9B3814E5C',
    reward: '1.2',
    bountyType: 1,
    status: 0,
    deadline: Date.now() + 86400000 * 5,
    title: 'Generate logo concepts for AI startup',
    description: 'Create 5 unique logo concepts for an AI infrastructure company. Modern, minimalist style preferred.',
  },
  {
    id: 3,
    poster: '0x1A2B3C4D5E6F7890AbCdEf1234567890aBcDeF12',
    reward: '0.8',
    bountyType: 2,
    status: 1,
    deadline: Date.now() + 86400000 * 2,
    title: 'Transcribe 30-minute podcast episode',
    description: 'Accurate transcription with speaker labels. English language, clear audio quality.',
  },
  {
    id: 4,
    poster: '0x9876543210FeDcBa0987654321FeDcBa09876543',
    reward: '2.0',
    bountyType: 3,
    status: 2,
    deadline: Date.now() + 86400000,
    title: 'Review smart contract for vulnerabilities',
    description: 'Security audit of ERC-20 token contract. Check for reentrancy, overflow, and access control issues.',
  },
  {
    id: 5,
    poster: '0xAbCdEf1234567890AbCdEf1234567890AbCdEf12',
    reward: '0.3',
    bountyType: 4,
    status: 3,
    deadline: Date.now() - 86400000,
    title: 'Translate whitepaper to Spanish',
    description: 'Professional translation of 5000-word technical document. Must maintain technical accuracy.',
  },
  {
    id: 6,
    poster: '0x123456789AbCdEf0123456789AbCdEf01234567',
    reward: '1.5',
    bountyType: 5,
    status: 0,
    deadline: Date.now() + 86400000 * 7,
    title: 'Analyze DeFi protocol metrics',
    description: 'Compile TVL, volume, and user growth data for top 20 DeFi protocols. Weekly report format.',
  },
]

function BountyCard({ bounty }) {
  const type = BOUNTY_TYPES[bounty.bountyType]
  const TypeIcon = type.icon
  const timeLeft = bounty.deadline - Date.now()
  const daysLeft = Math.max(0, Math.ceil(timeLeft / 86400000))

  return (
    <div className="glass-card p-6 hover:shadow-0g transition-all duration-300 cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`badge ${type.class}`}>
          <TypeIcon className="w-3 h-3" />
          {type.label}
        </div>
        <div className={`badge ${STATUS_CLASSES[bounty.status]}`}>
          {STATUS_LABELS[bounty.status]}
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
        {bounty.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {bounty.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-0g-700/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm">
            <Coins className="w-4 h-4 text-0g-400" />
            <span className="font-semibold text-white">{bounty.reward}</span>
            <span className="text-gray-500">0G</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            {bounty.status === 3 ? 'Completed' : `${daysLeft}d left`}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <User className="w-4 h-4" />
          {bounty.poster.slice(0, 6)}...{bounty.poster.slice(-4)}
        </div>
      </div>
    </div>
  )
}

export default function BountyList() {
  return (
    <section id="bounties" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Active Bounties</h2>
            <p className="text-gray-400">Browse and claim bounties to start earning</p>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-3">
            <select className="input-0g py-2 px-4 text-sm w-40">
              <option value="">All Types</option>
              <option value="0">Text</option>
              <option value="1">Image</option>
              <option value="2">Transcription</option>
              <option value="3">Code</option>
              <option value="4">Translation</option>
              <option value="5">Data</option>
            </select>
            <select className="input-0g py-2 px-4 text-sm w-40">
              <option value="">All Status</option>
              <option value="0">Open</option>
              <option value="1">In Progress</option>
              <option value="2">Under Review</option>
            </select>
          </div>
        </div>

        {/* Bounty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BOUNTIES.map(bounty => (
            <BountyCard key={bounty.id} bounty={bounty} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <button className="btn-secondary">
            Load More Bounties
          </button>
        </div>
      </div>
    </section>
  )
}
