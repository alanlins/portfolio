import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { portfolioProjects } from "../data/profile";

export function Portfolio() {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="section-container py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl dark:text-paper-100">
          {t("portfolio.sectionTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-900/60 dark:text-paper-100/60">
          {t("portfolio.sectionSubtitle")}
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="flex aspect-4/3 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-600/25 bg-ink-600/[0.03] p-6 text-center dark:border-paper-100/20 dark:bg-paper-100/[0.03]"
          >
            <Sparkles className="text-accent" size={22} />
            <h3 className="text-base font-semibold text-ink-900 dark:text-paper-100">
              {t(project.titleKey)}
            </h3>
            <p className="text-sm text-ink-900/55 dark:text-paper-100/55">
              {t(project.descriptionKey)}
            </p>
            <p className="text-sm text-ink-900/55 dark:text-paper-100/55">
              {t("portfolio.publicAccess")}:{" "}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {project.link}
              </a>
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
