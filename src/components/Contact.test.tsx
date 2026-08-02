import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import i18n from '../i18n'
import { Contact } from './Contact'
import { contact } from '../data/profile'

describe('Contact', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  it('renders direct contact links with the correct hrefs (no form)', () => {
    render(<Contact />)

    expect(screen.getByRole('link', { name: /alan\.v\.lins@gmail\.com/ })).toHaveAttribute(
      'href',
      `mailto:${contact.email}`,
    )
    expect(screen.getByRole('link', { name: /\+55 81 99750-7405/ })).toHaveAttribute(
      'href',
      contact.whatsapp,
    )
    expect(screen.getByRole('link', { name: /linkedin\.com\/in\/alan-v-lins/ })).toHaveAttribute(
      'href',
      contact.linkedin,
    )
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })
})
