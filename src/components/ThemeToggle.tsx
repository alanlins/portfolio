import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      title={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-600/20 text-ink-900 transition hover:border-accent hover:text-accent dark:border-paper-100/15 dark:text-paper-100"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
