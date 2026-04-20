import { Clock, User, ArrowUpRight } from 'lucide-react'

const BOUNTY_TYPES = {
  0: { label: 'Text', class: 'badge-text' },
  1: { label: 'Image', class: 'badge-image' },
  2: { label: 'Audio', class: 'badge-transcription' },
  3: { label: 'Code', class: 'badge-code' },
  4: { label: 'Translation', class: 'badge-translation' },
  5: { label: 'Data', class: 'badge-data' },
  6: { label: 'Other', class: 'badge-other' },
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
  2: 'Review',
  3: 'Done',
  4: 'Cancelled',
}

// Mock data
const MOCK_BOUNTIES = [
  {
    id: 1,
    poster: '0x742d35Cc6634C0532925a3b844Bc9e7595f8a5F2',
    reward: '0.5',
    bountyType: 0,
    status: 0,
    deadline: Date.now() + 86400000 * 3,
    title: 'Write product descriptions for 10 items',
  },
  {
    id: 2,
    poster: '0x8B3392483BA26D65E331dB86D4F430E9B3814E5C',
    reward: '1.2',
    bountyType: 1,
    status: 0,
    deadline: Date.now() + 86400000 * 5,
    title: 'Generate logo concepts for AI startup',
  },
  {
    id: 3,
    poster: '0x1A2B3C4D5E6F7890AbCdEf1234567890aBcDeF12',
    reward: '0.8',
    bountyType: 2,
    status: 1,
    deadline: Date.now() + 86400000 * 2,
    title: 'Transcribe 30-minute podcast episode',
  },
  {
    id: 4,
    poster: '0x9876543210FeDcBa0987654321FeDcBa09876543',
    reward: '2.0',
    bountyType: 3,
    status: 2,
    deadline: Date.now() + 86400000,
    title: 'Review smart contract for vulnerabilities',
  },
  {
    id: 5,
    poster: '0xAbCdEf1234567890AbCdEf1234567890AbCdEf12',
    reward: '0.3',
    bountyType: 4,
    status: 0,
    deadline: Date.now() + 86400000 * 4,
    title: 'Translate whitepaper to Spanish',
  },
  {
    id: 6,
    poster: '0x123456789AbCdEf0123456789AbCdEf01234567',
    reward: '1.5',
    bountyType: 5,
    status: 0,
    deadline: Date.now() + 86400000 * 7,
    title: 'Analyze DeFi protocol metrics',
  },
]

function BountyCard({ bounty }) {
  const type = BOUNTY_TYPES[bounty.bountyType]
  const timeLeft = bounty.deadline - Date.now()
  const daysLeft = Math.max(0, Math.ceil(timeLeft / 86400000))

  return (
    <div className="card-0g p-6 hover:border-0g-muted/50 transition-all cursor-pointer group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className={`badge ${type.class}`}>
          {type.label}
        </span>
        <span className={`badge ${STATUS_CLASSES[bounty.status]}`}>
          {STATUS_LABELS[bounty.status]}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-white font-medium mb-4 leading-snug group-hover:text-0g-accent transition-colors">
        {bounty.title}
      </h3>

      {/* Divider */}
      <div className="divider my-4" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-0g-accent font-medium">{bounty.reward} 0G</div>
            <div className="text-0g-muted text-xs uppercase tracking-wider">Reward</div>
          </div>
          <div>
            <div className="text-white font-medium flex items-center gap-1">
              <Clock size={12} />
              {daysLeft}d
            </div>
            <div className="text-0g-muted text-xs uppercase tracking-wider">Left</div>
          </div>
        </div>
        <ArrowUpRight size={16} className="text-0g-muted group-hover:text-0g-accent transition-colors" />
      </div>
    </div>
  )
}

export default function BountyList() {
  return (
    <section id="bounties" className="py-24 px-6 lg:px-8 border-t border-0g-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-title">Available Tasks</p>
            <h2 className="text-3xl font-medium text-white">Active Bounties</h2>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-3">
            <select className="input-0g py-2 px-4 text-sm w-36">
              <option value="">All Types</option>
              <option value="0">Text</option>
              <option value="1">Image</option>
              <option value="2">Audio</option>
              <option value="3">Code</option>
              <option value="4">Translation</option>
              <option value="5">Data</option>
            </select>
            <select className="input-0g py-2 px-4 text-sm w-36">
              <option value="">All Status</option>
              <option value="0">Open</option>
              <option value="1">In Progress</option>
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
        <div className="text-center mt-12">
          <button className="btn-secondary-0g">
            Load More
          </button>
        </div>
      </div>
    </section>
  )
}
