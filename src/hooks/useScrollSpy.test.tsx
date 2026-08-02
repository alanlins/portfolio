import { describe, it, expect, afterEach } from 'vitest'
import { act, render, fireEvent, cleanup } from '@testing-library/react'
import { useScrollSpy } from './useScrollSpy'

function Probe({ ids }: { ids: string[] }) {
  const active = useScrollSpy(ids, 50)
  return <div data-testid="active">{active}</div>
}

function mockSectionTop(id: string, top: number) {
  const el = document.getElementById(id)
  if (!el) throw new Error(`missing #${id} in test DOM`)
  el.getBoundingClientRect = () =>
    ({ top, bottom: top + 100, left: 0, right: 0, width: 0, height: 100, x: 0, y: top, toJSON() {} }) as DOMRect
}

describe('useScrollSpy', () => {
  afterEach(() => cleanup())

  it('marks the section whose top has scrolled past the offset as active', () => {
    document.body.innerHTML = `
      <div id="home"></div>
      <div id="specialties"></div>
      <div id="contact"></div>
    `
    const ids = ['home', 'specialties', 'contact']
    mockSectionTop('home', -500)
    mockSectionTop('specialties', 200)
    mockSectionTop('contact', 900)

    const { getByTestId } = render(<Probe ids={ids} />)

    act(() => {
      fireEvent.scroll(window)
    })

    expect(getByTestId('active').textContent).toBe('home')
  })

  it('updates the active section as the user scrolls further down', () => {
    document.body.innerHTML = `
      <div id="home"></div>
      <div id="specialties"></div>
      <div id="contact"></div>
    `
    const ids = ['home', 'specialties', 'contact']
    mockSectionTop('home', -900)
    mockSectionTop('specialties', -100)
    mockSectionTop('contact', 300)

    const { getByTestId } = render(<Probe ids={ids} />)

    act(() => {
      fireEvent.scroll(window)
    })

    expect(getByTestId('active').textContent).toBe('specialties')
  })
})
