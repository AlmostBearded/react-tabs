import React from 'react'
import { ReactNode } from 'react'
import './tabs.css'

export type TabsProps = {
  tabs: { id: string; title: ReactNode; content: ReactNode }[]
  selectedTab: string
  onSelectTab?: (tabId: string) => void
}

export const Tabs = ({ tabs, selectedTab, onSelectTab }: TabsProps) => {
  return (
    <div className='tabs'>
      <div role='tablist'>
        {tabs.map((tab) => (
          <button
            role='tab'
            aria-selected={tab.id === selectedTab}
            aria-controls={`${tab.id}-panel`}
            id={tab.id}
            key={tab.id}
            onClick={() => onSelectTab?.(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          role='tabpanel'
          aria-labelledby={tab.id}
          id={`${tab.id}-panel`}
          key={tab.id}
          aria-hidden={tab.id !== selectedTab}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
