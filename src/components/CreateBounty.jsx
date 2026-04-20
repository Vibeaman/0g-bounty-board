import { X } from 'lucide-react'
import { useState } from 'react'

const BOUNTY_TYPES = [
  { id: 0, label: 'Text Generation', desc: 'Writing, summaries, articles' },
  { id: 1, label: 'Image Generation', desc: 'AI art, logos, designs' },
  { id: 2, label: 'Transcription', desc: 'Audio to text' },
  { id: 3, label: 'Code Review', desc: 'Audits, bug finding' },
  { id: 4, label: 'Translation', desc: 'Language translation' },
  { id: 5, label: 'Data Analysis', desc: 'Process and analyze' },
  { id: 6, label: 'Other', desc: 'Custom task' },
]

export default function CreateBounty({ onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    type: null,
    title: '',
    description: '',
    reward: '',
    deadline: '',
  })

  const handleTypeSelect = (typeId) => {
    setForm({ ...form, type: typeId })
    setStep(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating bounty:', form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative card-0g w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-0g-border">
          <div>
            <p className="text-0g-muted text-xs uppercase tracking-wider mb-1">
              {step === 1 ? 'Step 1 of 2' : 'Step 2 of 2'}
            </p>
            <h2 className="text-xl font-medium text-white">
              {step === 1 ? 'Select Type' : 'Bounty Details'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-0g-muted hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            /* Step 1: Type Selection */
            <div className="grid grid-cols-1 gap-3">
              {BOUNTY_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className="card-0g p-4 text-left hover:border-0g-accent transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white group-hover:text-0g-accent transition-colors">
                        {type.label}
                      </h3>
                      <p className="text-sm text-0g-muted">{type.desc}</p>
                    </div>
                    <span className="text-0g-muted group-hover:text-0g-accent">→</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Step 2: Details */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Type */}
              <div className="flex items-center justify-between p-3 border border-0g-border">
                <span className="text-white">{BOUNTY_TYPES[form.type].label}</span>
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-0g-muted hover:text-0g-accent text-sm"
                >
                  Change
                </button>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-0g-muted mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Brief description of the task"
                  className="input-0g"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-0g-muted mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Detailed requirements, format, and expected output"
                  className="input-0g min-h-[120px] resize-y"
                  required
                />
              </div>

              {/* Reward & Deadline */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-0g-muted mb-2">
                    Reward (0G)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={form.reward}
                    onChange={(e) => setForm({ ...form, reward: e.target.value })}
                    placeholder="0.5"
                    className="input-0g"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-0g-muted mb-2">
                    Deadline
                  </label>
                  <input
                    type="datetime-local"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    className="input-0g"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4 border-t border-0g-border">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary-0g flex-1"
                >
                  Back
                </button>
                <button type="submit" className="btn-primary-0g flex-1">
                  Create Bounty
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
