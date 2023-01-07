import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Tabs } from './tabs'
import userEvent from '@testing-library/user-event'

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

  it('should navigate the tabs in the tab list in the correct order', async () => {
    userEvent.setup()

    const onSelectTab = jest.fn()
    render(
      <Tabs
        tabs={[
          { id: 'a', title: 'A', content: 'Content of A' },
          { id: 'b', title: 'B', content: 'Content of B' },
          { id: 'c', title: 'C', content: 'Content of C' },
        ]}
        selectedTab='a'
        onSelectTab={onSelectTab}
      />,
    )
    const a = screen.getByRole('tab', { name: 'A' })
    const b = screen.getByRole('tab', { name: 'B' })
    const c = screen.getByRole('tab', { name: 'C' })

    a.focus()
    expect(a).toHaveFocus()
    await userEvent.tab()
    expect(b).toHaveFocus()
    await userEvent.tab()
    expect(c).toHaveFocus()
  })

  it('should first navigate through all tabs and then to the content of the currently selected tab', async () => {
    userEvent.setup()

    const onSelectTab = jest.fn()
    render(
      <Tabs
        tabs={[
          { id: 'a', title: 'A', content: <a href='#'>Content of A</a> },
          { id: 'b', title: 'B', content: <a href='#'>Content of B</a> },
          { id: 'c', title: 'C', content: <a href='#'>Content of C</a> },
        ]}
        selectedTab='a'
        onSelectTab={onSelectTab}
      />,
    )

    const a = screen.getByRole('tab', { name: 'A' })
    const aContent = screen.getByRole('link', { name: 'Content of A' })

    a.focus()
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()
    expect(aContent).toHaveFocus()
  })
})
