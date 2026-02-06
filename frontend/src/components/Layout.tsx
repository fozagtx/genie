import React, { ReactNode } from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-background text-foreground ${className}`}>
      <Header />
      <main className="mx-auto max-w-[1400px] px-4 pb-4 md:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
