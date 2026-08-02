import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Cloud, Code2, Network, Sparkles, type LucideIcon } from 'lucide-react'
import { specialties } from '../data/profile'

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  network: Network,
  cloud: Cloud,
  sparkles: Sparkles,
}

export function Specialties() {
  const { t } = useTranslation()

  return (
    <section id="specialties" className="section-container py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl dark:text-paper-100">
          {t('specialties.sectionTitle')}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-900/60 dark:text-paper-100/60">
          {t('specialties.sectionSubtitle')}
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {specialties.map((item, index) => {
          const Icon = ICONS[item.icon]
          return (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-ink-600/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg dark:border-paper-100/10 dark:bg-ink-900"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-semibold text-ink-900 dark:text-paper-100">
                {t(item.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-ink-900/60 dark:text-paper-100/60">
                {t(item.descriptionKey)}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-ink-600/5 px-2.5 py-1 text-xs font-medium text-ink-900/70 dark:bg-paper-100/10 dark:text-paper-100/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
