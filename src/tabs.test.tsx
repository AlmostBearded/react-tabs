import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Tabs } from './tabs'

describe('Tabs', () => {
  it('should render a single tab', () => {
    render(<Tabs tabs={[{ id: 'a', title: 'A', content: 'Content of A' }]} selectedTab='a' />)
    expect(screen.getByRole('tablist')).toBeDefined()
    expect(screen.getByRole('tab', { name: 'A' })).toBeDefined()
  })

  it('should render multiple tabs', () => {
    render(
      <Tabs
        tabs={[
          { id: 'a', title: 'A', content: 'Content of A' },
          { id: 'b', title: 'B', content: 'Content of B' },
        ]}
        selectedTab='a'
      />,
    )
    expect(screen.getByRole('tablist')).toBeDefined()
    expect(screen.getByRole('tab', { name: 'A' })).toBeDefined()
    expect(screen.getByRole('tab', { name: 'B' })).toBeDefined()
  })

  it('should only show the panel of the selected tab', async () => {
    render(
      <Tabs
        tabs={[
          { id: 'a', title: 'A', content: 'Content of A' },
          { id: 'b', title: 'B', content: 'Content of B' },
        ]}
        selectedTab='b'
      />,
    )
    expect(screen.getByRole('tablist')).toBeDefined()
    expect(screen.getByRole('tab', { name: 'A', selected: false })).toBeDefined()
    expect(screen.getByRole('tab', { name: 'B', selected: true })).toBeDefined()
    expect(screen.getByText('Content of A')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Content of B')).toHaveAttribute('aria-hidden', 'false')
  })

  it('should call the onSelectTab callback when a tab is clicked', () => {
    const onSelectTab = jest.fn()
    render(
      <Tabs
        tabs={[
          { id: 'a', title: 'A', content: 'Content of A' },
          { id: 'b', title: 'B', content: 'Content of B' },
        ]}
        selectedTab='a'
        onSelectTab={onSelectTab}
      />,
    )
    fireEvent.click(screen.getByRole('tab', { name: 'B' }))
    expect(onSelectTab).toHaveBeenCalledTimes(1)
    expect(onSelectTab).toHaveBeenCalledWith('b')
  })
})
