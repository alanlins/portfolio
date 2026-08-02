import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education, experiences } from '../data/profile'

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="section-container py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl dark:text-paper-100">
          {t('about.sectionTitle')}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-ink-900/70 dark:text-paper-100/70">
          {t('about.summary')}
        </p>
      </motion.div>

      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="mb-8 text-xl font-semibold text-ink-900 dark:text-paper-100">
            {t('about.timelineTitle')}
          </h3>
          <ol className="relative space-y-10 border-s border-ink-600/15 ps-6 dark:border-paper-100/15">
            {experiences.map((exp, index) => (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="relative"
              >
                <span className="absolute -start-[29px] top-1 h-3 w-3 rounded-full bg-accent" />
                <p className="text-xs font-medium tracking-wide text-accent uppercase">
                  {exp.period}
                </p>
                <h4 className="mt-1 text-base font-semibold text-ink-900 dark:text-paper-100">
                  {t(exp.roleKey)} · {exp.company}
                </h4>
                <p className="text-xs text-ink-900/50 dark:text-paper-100/50">{exp.location}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-900/70 dark:text-paper-100/70">
                  {exp.bulletKeys.map((key) => (
                    <li key={key} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-600/40 dark:bg-paper-100/40" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="mb-8 text-xl font-semibold text-ink-900 dark:text-paper-100">
            {t('about.educationTitle')}
          </h3>
          <ul className="space-y-6">
            {education.map((edu) => (
              <li key={`${edu.institution}-${edu.period}`} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <GraduationCap size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900 dark:text-paper-100">
                    {t(edu.degreeKey)}
                  </p>
                  <p className="text-xs text-ink-900/50 dark:text-paper-100/50">
                    {edu.institution} · {edu.period}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
