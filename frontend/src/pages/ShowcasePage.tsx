import React from 'react'
import { GenieHero } from '../components/ui/genie-hero'
import { GenieFeatures } from '../components/ui/genie-features'
import { GenieAgentsSection } from '../components/ui/genie-agents-section'
import { GenieSplineDemo } from '../components/ui/genie-spline-demo'

export const ShowcasePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <GenieHero />

      {/* Spline Demo Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              Interactive 3D Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Immerse yourself in the future of AI development with interactive 3D visualizations.
            </p>
          </div>
          <GenieSplineDemo />
        </div>
      </section>

      {/* Features Section */}
      <GenieFeatures />

      {/* Agents Section */}
      <GenieAgentsSection />

      {/* Footer */}
      <footer className="border-t border-border py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Transform Your Development?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers already using Genie AI to accelerate their development workflow.
            </p>
            <a
              href="/terminal"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:opacity-90"
            >
              Launch Genie AI
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}