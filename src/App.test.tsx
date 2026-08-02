import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import i18n from './i18n'
import App from './App'

describe('App', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  afterEach(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  it('renders every main section with a matching id for anchor navigation', () => {
    const { container } = render(<App />)

    ;['home', 'specialties', 'about', 'portfolio', 'contact'].forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull()
    })
  })

  it('renders the hero heading and nav in Portuguese by default', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Alan Lins' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary' })).toHaveTextContent('Sobre mim')
  })
})
