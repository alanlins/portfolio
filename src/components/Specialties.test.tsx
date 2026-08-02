import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import i18n from '../i18n'
import { Specialties } from './Specialties'

describe('Specialties', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  it('renders all four specialty cards with their tags', () => {
    render(<Specialties />)

    expect(screen.getByText('Desenvolvimento Fullstack')).toBeInTheDocument()
    expect(screen.getByText('Arquitetura de Software')).toBeInTheDocument()
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument()
    expect(screen.getByText('IA Aplicada')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })
})
