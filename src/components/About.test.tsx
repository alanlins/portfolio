import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import i18n from '../i18n'
import { About } from './About'

describe('About', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  it('renders the professional summary and all experience companies', () => {
    const { container } = render(<About />)

    expect(container.textContent).toMatch(/Engenheiro de Software Sênior com 15\+ anos/)
    ;['Fundação CERTI', 'Compass.UOL', 'MV S/A', 'Accenture Brasil', 'UFPE'].forEach((company) => {
      expect(container.textContent).toContain(company)
    })
  })

  it('renders the education entries', () => {
    render(<About />)
    expect(screen.getByText('Pós-Graduação em Engenharia de Software')).toBeInTheDocument()
    expect(screen.getByText(/Unibratec · 2015 — 2016/)).toBeInTheDocument()
  })
})
