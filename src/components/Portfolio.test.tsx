import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import i18n from '../i18n'
import { Portfolio } from './Portfolio'

describe('Portfolio', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  it('renders three placeholder project cards', () => {
    render(<Portfolio />)
    expect(screen.getAllByText('Projeto em breve')).toHaveLength(3)
  })
})
