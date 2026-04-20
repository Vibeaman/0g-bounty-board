import { Clock, ArrowRight } from 'lucide-react'

const TYPE_STYLES = {
  0: { label: 'Text', class: 'type-text' },
  1: { label: 'Image', class: 'type-image' },
  2: { label: 'Audio', class: 'type-audio' },
  3: { label: 'Code', class: 'type-code' },
  4: { label: 'Translation', class: 'type-translation' },
  5: { label: 'Data', class: 'type-data' },
  6: { label: 'Other', class: 'type-other' },
}

const STATUS_STYLES = {
  0: { label: 'Open', class: 'status-open' },
  1: { label: 'In Progress', class: 'status-progress' },
  2: { label: 'Review', class: 'status-review' },
  3: { label: 'Completed', class: 'status-completed' },
  4: { label: 'Cancelled', class: 'status-cancelled' },
}

const MOCK_BOUNTIES = [
  {
    id: 1,
    reward: '0.5',
    bountyType: 0,
    status: 0,
    deadline: Date.now() + 86400000 * 3,
    title: 'Write product descriptions for 10 e-commerce items',
  },
  {
    id: 2,
    reward: '1.2',
    bountyType: 1,
    status: 0,
    deadline: Date.now() + 86400000 * 5,
    title: 'Generate 5 logo concepts for AI infrastructure startup',
  },
  {
    id: 3,
    reward: '0.8',
    bountyType: 2,
    status: 1,
    deadline: Date.now() + 86400000 * 2,
    title: 'Transcribe 30-minute podcast episode with timestamps',
  },
  {
    id: 4,
    reward: '2.0',
    bountyType: 3,
    status: 2,
    deadline: Date.now() + 86400000,
    title: 'Security audit for ERC-20 token smart contract',
  },
  {
    id: 5,
    reward: '0.3',
    bountyType: 4,
    status: 0,
    deadline: Date.now() + 86400000 * 4,
    title: 'Translate technical whitepaper from English to Spanish',
  },
  {
    id: 6,
    reward: '1.5',
    bountyType: 5,
    status: 0,
    deadline: Date.now() + 86400000 * 7,
    title: 'Compile and analyze DeFi protocol metrics report',
  },
]

function BountyCard({ bounty }) {
  const type = TYPE_STYLES[bounty.bountyType]
  const status = STATUS_STYLES[bounty.status]
  const daysLeft = Math.max(0, Math.ceil((bounty.deadline - Date.now()) / 86400000))

  return (
    <div className="card p-6 cursor-pointer group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className={`type-badge ${type.class}`}>{type.label}</span>
        <span className={`type-badge ${status.class}`}>{status.label}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium text-0g-text mb-4 leading-snug group-hover:text-0g-purple transition-colors">
        {bounty.title}
      </h3>

      {/* Divider */}
      <div className="divider my-4" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-xl font-semibold text-0g-purple">{bounty.reward} 0G</div>
            <div className="text-xs text-0g-muted">Reward</div>
          </div>
          <div>
            <div className="flex items-center gap-1 font-medium">
              <Clock size={14} className="text-0g-muted" />
              {daysLeft}d left
            </div>
            <div className="text-xs text-0g-muted">Deadline</div>
          </div>
        </div>
        <ArrowRight size={20} className="text-0g-muted group-hover:text-0g-purple transition-colors" />
      </div>
    </div>
  )
}

export default function BountyList() {
  return (
    <section id="bounties" className="py-20 px-4 bg-light">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="badge-dot mb-4">Available Tasks</span>
            <h2 className="text-3xl font-semibold text-0g-text mt-4">Active Bounties</h2>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-3">
            <select className="input-field py-3 px-4 text-sm w-36 rounded-full">
              <option value="">All Types</option>
              <option value="0">Text</option>
              <option value="1">Image</option>
              <option value="2">Audio</option>
              <option value="3">Code</option>
            </select>
            <select className="input-field py-3 px-4 text-sm w-36 rounded-full">
              <option value="">All Status</option>
              <option value="0">Open</option>
              <option value="1">In Progress</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BOUNTIES.map(bounty => (
            <BountyCard key={bounty.id} bounty={bounty} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Load More
          </button>
        </div>
      </div>
    </section>
  )
}
