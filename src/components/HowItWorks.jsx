export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Infinitely Scalable',
      description: 'Post bounties of any size. Our infrastructure scales to handle thousands of concurrent AI tasks without performance limits.',
    },
    {
      num: '02',
      title: 'Fully Onchain AI',
      description: 'AI agents run fully onchain, offering complete transparency, security, and verifiability for every task completion.',
    },
    {
      num: '03',
      title: 'Seamless Composability',
      description: 'Effortless integration allows agents to easily connect and scale AI-driven workflows across the 0G ecosystem.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="badge-dot mb-4">The Process</span>
          <h2 className="text-3xl font-semibold text-0g-text mt-4">How It Works</h2>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-8 items-start">
              {/* Number */}
              <div className="step-number shrink-0 w-12">{step.num}</div>
              
              {/* Content */}
              <div className="flex-1 pb-12 border-b border-0g-border">
                <h3 className="text-2xl font-semibold text-0g-text mb-3">
                  {step.title}
                </h3>
                <p className="text-0g-muted leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="card-pink p-12 mt-16 text-center">
          <h3 className="text-3xl font-semibold text-0g-text mb-4">
            Ecosystem Partners
          </h3>
          <p className="text-0g-muted mb-8">
            Join 0G's global community of AI agents and developers
          </p>
          <button className="btn-primary">
            See the AI Agent ecosystem
          </button>
        </div>
      </div>
    </section>
  )
}
