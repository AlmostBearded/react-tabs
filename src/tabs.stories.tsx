import React, { useState } from 'react'
import { Tabs } from './tabs'

export default {
  title: 'Tabs',
  component: Tabs,
}

export const SingleTab = () => {
  const [selectedTab, setSelectedTab] = useState('a')
  return (
    <Tabs
      tabs={[{ id: 'a', title: 'Tab 1', content: 'Content of Tab 1' }]}
      selectedTab={selectedTab}
      onSelectTab={setSelectedTab}
    />
  )
}

export const TwoTabs = () => {
  const [selectedTab, setSelectedTab] = useState('a')
  return (
    <Tabs
      tabs={[
        { id: 'a', title: 'Tab 1', content: 'Content of Tab 1' },
        { id: 'b', title: 'Tab 2', content: 'Content of Tab 2' },
      ]}
      selectedTab={selectedTab}
      onSelectTab={setSelectedTab}
    />
  )
}

export const ManyTabs = () => {
  const [selectedTab, setSelectedTab] = useState('a')
  return (
    <Tabs
      tabs={[
        { id: 'a', title: 'Tab 1', content: 'Content of Tab 1' },
        { id: 'b', title: 'Tab 2', content: 'Content of Tab 2' },
        { id: 'c', title: 'Tab 3', content: 'Content of Tab 3' },
        { id: 'd', title: 'Tab 4', content: 'Content of Tab 4' },
        { id: 'e', title: 'Tab 5', content: 'Content of Tab 5' },
        { id: 'g', title: 'Tab 6', content: 'Content of Tab 6' },
      ]}
      selectedTab={selectedTab}
      onSelectTab={setSelectedTab}
    />
  )
}

export const TabsWithComplexContent = () => {
  const [selectedTab, setSelectedTab] = useState('sign-in')
  const formItemStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '0.4em',
    padding: '0.25em',
  }
  return (
    <Tabs
      tabs={[
        {
          id: 'sign-in',
          title: 'Sign in',
          content: (
            <form>
              <input type='email' placeholder='Email' style={formItemStyle} />
              <input type='password' placeholder='Password' style={formItemStyle} />
              <button type='submit' style={formItemStyle}>
                Sign in
              </button>
            </form>
          ),
        },
        {
          id: 'sign-up',
          title: 'Sign up',
          content: (
            <form>
              <input type='email' placeholder='Email' style={formItemStyle} />
              <input type='password' placeholder='Password' style={formItemStyle} />
              <input type='password' placeholder='Repeated Password' style={formItemStyle} />
              <button type='submit' style={formItemStyle}>
                Sign up
              </button>
            </form>
          ),
        },
      ]}
      selectedTab={selectedTab}
      onSelectTab={setSelectedTab}
    />
  )
}
