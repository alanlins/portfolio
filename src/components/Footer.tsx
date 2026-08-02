import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-600/10 py-8 dark:border-paper-100/10">
      <div className="section-container flex flex-col items-center justify-between gap-2 text-center text-xs text-ink-900/50 sm:flex-row sm:text-left dark:text-paper-100/50">
        <p>
          Alan D'Almeida Lins · &copy; {year}. {t('footer.rights')}
        </p>
        <p>{t('footer.builtWith')}</p>
      </div>
    </footer>
  )
}
