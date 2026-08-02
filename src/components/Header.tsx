import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { supportedLanguages, type SupportedLanguage } from '../i18n'

const NAV_ITEMS = [
  { id: 'home', key: 'nav.home' },
  { id: 'specialties', key: 'nav.specialties' },
  { id: 'about', key: 'nav.about' },
  { id: 'portfolio', key: 'nav.portfolio' },
  { id: 'contact', key: 'nav.contact' },
] as const

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  'pt-BR': 'PT',
  'en-US': 'EN',
  'es-ES': 'ES',
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Header() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(NAV_ITEMS.map((item) => item.id))

  function handleNavClick(id: string) {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-600/10 bg-paper-50/80 backdrop-blur-md dark:border-paper-100/10 dark:bg-ink-950/80">
      <div className="section-container flex h-16 items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="text-lg font-bold tracking-tight text-ink-900 dark:text-paper-100"
          aria-label={t('nav.home')}
        >
          Alan<span className="text-accent">.</span>Lins
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors ${
                activeId === item.id
                  ? 'text-accent'
                  : 'text-ink-900/70 hover:text-accent dark:text-paper-100/70'
              }`}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              {t(item.key)}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1 rounded-full border border-ink-600/20 p-1 dark:border-paper-100/15">
            {supportedLanguages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => i18n.changeLanguage(lang)}
                aria-pressed={i18n.resolvedLanguage === lang}
                className={`rounded-full px-2 py-1 text-xs font-semibold transition ${
                  i18n.resolvedLanguage === lang
                    ? 'bg-accent text-white'
                    : 'text-ink-900/60 hover:text-accent dark:text-paper-100/60'
                }`}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-soft transition hover:brightness-110"
          >
            {t('nav.hireMe')}
          </button>
        </div>

        <button
          type="button"
          className="text-ink-900 md:hidden dark:text-paper-100"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink-600/10 bg-paper-50 md:hidden dark:border-paper-100/10 dark:bg-ink-950"
          >
            <nav className="section-container flex flex-col gap-4 py-4" aria-label="Mobile">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm font-medium ${
                    activeId === item.id ? 'text-accent' : 'text-ink-900/70 dark:text-paper-100/70'
                  }`}
                >
                  {t(item.key)}
                </button>
              ))}

              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1 rounded-full border border-ink-600/20 p-1 dark:border-paper-100/15">
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => i18n.changeLanguage(lang)}
                      aria-pressed={i18n.resolvedLanguage === lang}
                      className={`rounded-full px-2 py-1 text-xs font-semibold transition ${
                        i18n.resolvedLanguage === lang
                          ? 'bg-accent text-white'
                          : 'text-ink-900/60 dark:text-paper-100/60'
                      }`}
                    >
                      {LANGUAGE_LABELS[lang]}
                    </button>
                  ))}
                </div>
                <ThemeToggle />
              </div>

              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2 text-sm font-semibold text-white"
              >
                {t('nav.hireMe')}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
