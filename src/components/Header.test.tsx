import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import i18n from '../i18n'
import { renderWithProviders } from '../test/test-utils'
import { Header } from './Header'

describe('Header', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  afterEach(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  it('renders the nav items from prompt_inicial.md in order', () => {
    renderWithProviders(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    const labels = ['Home', 'Especialidades', 'Sobre mim', 'Portfolio', 'Contato']
    labels.forEach((label) => {
      expect(nav).toHaveTextContent(label)
    })
  })

  it('switches nav language when a language button is clicked', async () => {
    renderWithProviders(<Header />)

    fireEvent.click(screen.getByRole('button', { name: 'EN' }))

    const nav = await screen.findByRole('navigation', { name: 'Primary' })
    expect(nav).toHaveTextContent('Specialties')
    expect(nav).toHaveTextContent('About me')
    expect(nav).toHaveTextContent('Contact me')
  })

  it('opens and closes the mobile menu', () => {
    renderWithProviders(<Header />)

    const toggleButton = screen.getByRole('button', { name: 'Abrir menu' })
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggleButton)
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Fechar menu' }))
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})
