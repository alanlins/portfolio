import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { contact } from "../data/profile";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons/BrandIcons";

export function Contact() {
  const { t } = useTranslation();

  const links = [
    {
      icon: Mail,
      label: t("contact.emailLabel"),
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: WhatsAppIcon,
      label: t("contact.whatsappLabel"),
      value: contact.phone,
      href: contact.whatsapp,
    },
    {
      icon: LinkedinIcon,
      label: t("contact.linkedinLabel"),
      value: "linkedin.com/in/alan-v-lins",
      href: contact.linkedin,
    },
    {
      icon: GithubIcon,
      label: t("contact.githubLabel"),
      value: "github.com/alanlins",
      href: contact.github,
    },
  ];

  return (
    <section id="contact" className="section-container py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl rounded-3xl border border-ink-600/10 bg-white p-10 text-center shadow-sm dark:border-paper-100/10 dark:bg-ink-900"
      >
        <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl dark:text-paper-100">
          {t("contact.sectionTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink-900/60 dark:text-paper-100/60">
          {t("contact.sectionSubtitle")}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {links.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 rounded-2xl border border-ink-600/10 p-5 text-center transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-md dark:border-paper-100/10"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon size={18} />
              </span>
              <span className="text-xs font-semibold text-ink-900/50 dark:text-paper-100/50">
                {label}
              </span>
              <span className="text-sm font-medium break-all text-ink-900 dark:text-paper-100">
                {value}
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-900/50 dark:text-paper-100/50">
          <MapPin size={16} className="text-accent" />
          {contact.location}
        </p>
      </motion.div>
    </section>
  );
}
