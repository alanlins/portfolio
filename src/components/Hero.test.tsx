import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import i18n from '../i18n'
import { Hero } from './Hero'
import { contact } from '../data/profile'

describe('Hero', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  afterEach(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  it('renders name, title and stats', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { name: 'Alan Lins' })).toBeInTheDocument()
    expect(screen.getByText(/Software Engineer Sênior/)).toBeInTheDocument()
    expect(screen.getByText('15+')).toBeInTheDocument()
  })

  it('points the CV download link at the Portuguese PDF by default', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Baixar Currículo' })).toHaveAttribute(
      'href',
      '/cv/cv-pt-BR.pdf',
    )
  })

  it('points the CV download link at the English PDF after switching language', async () => {
    await i18n.changeLanguage('en-US')
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute(
      'href',
      '/cv/cv-en-US.pdf',
    )
  })

  it('links social icons to the real contact info', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      contact.linkedin,
    )
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      `mailto:${contact.email}`,
    )
  })
})
