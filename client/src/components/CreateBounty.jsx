import { X, FileText, Image, Mic, Code, Globe, Database, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const BOUNTY_TYPES = [
  { id: 0, label: 'Text Generation', icon: FileText, desc: 'Writing, summaries, articles' },
  { id: 1, label: 'Image Generation', icon: Image, desc: 'AI art, logos, designs' },
  { id: 2, label: 'Transcription', icon: Mic, desc: 'Audio to text conversion' },
  { id: 3, label: 'Code Review', icon: Code, desc: 'Security audits, bug finding' },
  { id: 4, label: 'Translation', icon: Globe, desc: 'Language translation' },
  { id: 5, label: 'Data Analysis', icon: Database, desc: 'Process and analyze data' },
  { id: 6, label: 'Other', icon: HelpCircle, desc: 'Custom task type' },
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
    // TODO: Contract interaction
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-0g-700/20">
          <h2 className="text-2xl font-bold text-white">
            {step === 1 ? 'Select Bounty Type' : 'Create Bounty'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-0g-700/20 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            /* Step 1: Type Selection */
            <div className="grid sm:grid-cols-2 gap-4">
              {BOUNTY_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className="glass-card p-4 text-left hover:border-0g-500/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-0g-600/20 flex items-center justify-center group-hover:bg-0g-600/30 transition-colors">
                      <type.icon className="w-5 h-5 text-0g-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{type.label}</h3>
                      <p className="text-sm text-gray-500">{type.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Step 2: Bounty Details */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Type */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-0g-600/10 border border-0g-600/20">
                {(() => {
                  const type = BOUNTY_TYPES[form.type]
                  return (
                    <>
                      <type.icon className="w-5 h-5 text-0g-400" />
                      <span className="text-white font-medium">{type.label}</span>
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="ml-auto text-sm text-0g-400 hover:text-0g-300"
                      >
                        Change
                      </button>
                    </>
                  )
                })()}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bounty Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Write product descriptions for 10 items"
                  className="input-0g"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the task in detail. Be specific about requirements, format, and expected output."
                  className="input-0g min-h-[120px] resize-y"
                  required
                />
              </div>

              {/* Reward & Deadline */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">
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
              <div className="flex items-center gap-4 pt-4 border-t border-0g-700/20">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button type="submit" className="btn-0g flex-1">
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
