import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import profilePhoto from "../assets/profile.jpg";
import { contact, cvFiles, stats } from "../data/profile";
import type { SupportedLanguage } from "../i18n";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons/BrandIcons";

const SOCIAL_LINKS = [
  { icon: LinkedinIcon, href: contact.linkedin, label: "LinkedIn" },
  { icon: WhatsAppIcon, href: contact.whatsapp, label: "WhatsApp" },
  { icon: Mail, href: `mailto:${contact.email}`, label: "Email" },
  { icon: GithubIcon, href: contact.github, label: "GitHub" },
] as const;

export function Hero() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "pt-BR") as SupportedLanguage;
  const cvHref = cvFiles[lang] ?? cvFiles["pt-BR"];

  return (
    <section
      id="home"
      className="section-container flex min-h-screen flex-col-reverse items-center gap-12 pt-32 pb-16 md:flex-row md:pt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center md:text-left"
      >
        <p className="text-sm font-medium text-accent">{t("hero.greeting")}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-paper-100">
          {t("hero.name")}
        </h1>
        <p className="mt-4 text-lg font-medium text-ink-900/70 sm:text-xl dark:text-paper-100/70">
          {t("hero.title")}
        </p>
        <p className="mt-4 max-w-xl text-base text-ink-900/60 dark:text-paper-100/60">
          {t("hero.summaryShort")}
        </p>

        <div className="mt-6 flex justify-center gap-4 md:justify-start">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-600/20 text-ink-900/70 transition hover:border-accent hover:text-accent dark:border-paper-100/15 dark:text-paper-100/70"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-soft transition hover:brightness-110"
          >
            {t("hero.ctaHireMe")}
          </a>
          <a
            href={cvHref}
            download
            className="rounded-full border border-ink-600/25 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-accent hover:text-accent dark:border-paper-100/20 dark:text-paper-100"
          >
            {t("hero.ctaDownloadCv")}
          </a>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink-600/10 pt-6 dark:border-paper-100/10">
          {stats.map((stat) => (
            <div key={stat.labelKey}>
              <dt className="sr-only">{t(stat.labelKey)}</dt>
              <dd className="text-2xl font-bold text-accent sm:text-3xl">
                {stat.value}
              </dd>
              <p className="mt-1 text-xs text-ink-900/60 sm:text-sm dark:text-paper-100/60">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </dl>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative flex flex-1 items-center justify-center"
      >
        <div className="glow-accent absolute h-64 w-64 rounded-full opacity-30 blur-3xl sm:h-80 sm:w-80" />
        <img
          src={profilePhoto}
          alt={t("hero.photoAlt")}
          className="relative aspect-square w-64 rounded-full border-4 border-ink-600/10 object-cover grayscale transition duration-500 hover:grayscale-0 sm:w-80 dark:border-paper-100/10"
        />
      </motion.div>
    </section>
  );
}
