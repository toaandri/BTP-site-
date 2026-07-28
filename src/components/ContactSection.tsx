"use client";

import { useState } from "react";
import { brand, contacts, projects } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toast } from "@/components/ui/Toast";

type FormState = {
  name: string;
  email: string;
  phone: string;
  need: string;
  message: string;
  _hp: string;
};

const NEEDS = [
  "",
  "Plans de permis de construire",
  "Plans d'exécution",
  "Relevé existant",
  "Plans offshore",
  "Réhabilitation / rénovation",
  "Autre",
];

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    need: "",
    message: "",
    _hp: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Requis";
    if (!form.email.trim()) e.email = "Requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.message.trim()) e.message = "Requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setToast({ message: "Message envoyé ! Je vous répondrai rapidement.", type: "success" });
        setForm({ name: "", email: "", phone: "", need: "", message: "", _hp: "" });
      } else {
        setToast({ message: data.error || "Erreur lors de l'envoi.", type: "error" });
      }
    } catch {
      setToast({ message: "Erreur réseau. Réessayez.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section
      id="contact"
      className="relative z-20 min-h-[100svh] bg-[var(--ink)] px-5 py-24 md:px-10"
    >
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">Contact</p>
          <h2 className="mt-3 font-display text-5xl text-[var(--sand)] md:text-7xl">
            Parlons de votre projet
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--mist)]">
            Basé sur une expérience longue en entreprise et en freelance, je collabore avec des
            clients et partenaires — notamment en France. Écrivez-moi ou rejoignez-moi sur les
            réseaux.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 max-w-lg">
            <input
              type="text"
              name="_hp"
              value={form._hp}
              onChange={(e) => update("_hp", e.target.value)}
              className="absolute -left-[9999px]"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Nom *"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                error={errors.name}
              />
              <Input
                label="Email *"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                error={errors.email}
              />
            </div>
            <Input
              label="Téléphone (optionnel)"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.15em] text-[var(--mist)]">
                Type de besoin
              </label>
              <select
                value={form.need}
                onChange={(e) => update("need", e.target.value)}
                className="w-full border border-white/20 bg-transparent px-3 py-2.5 text-sm text-[var(--sand)] transition focus:border-[var(--accent)] focus:outline-none"
              >
                {NEEDS.map((n) => (
                  <option key={n} value={n} className="bg-[var(--ink)]">
                    {n || "Sélectionnez..."}
                  </option>
                ))}
              </select>
            </div>
            <Textarea
              label="Message *"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              error={errors.message}
              rows={5}
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? "Envoi..." : "Envoyer le message"}
            </Button>
          </form>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${contacts.email}`}
              className="border border-[var(--steel)] bg-[var(--steel)] px-5 py-3 text-sm font-medium text-[var(--sand)] transition hover:bg-[var(--steel-bright)]"
            >
              {contacts.email}
            </a>
            <a
              href={contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-5 py-3 text-sm text-[var(--sand)] transition hover:border-[var(--accent)]"
            >
              LinkedIn
            </a>
            <a
              href={contacts.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-5 py-3 text-sm text-[var(--sand)] transition hover:border-[var(--accent)]"
            >
              Facebook
            </a>
          </div>
        </div>

        <div id="projets">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">Portfolio</p>
          <h3 className="mt-3 font-display text-3xl text-[var(--sand)]">Tous les projets</h3>
          <ul className="mt-6 space-y-4">
            {projects.map((p) => (
              <li key={p.id} className="border-t border-white/10 pt-4">
                <p className="text-[10px] uppercase tracking-wider text-[var(--accent)]">
                  {p.type} · {p.year}
                </p>
                <p className="mt-1 text-[var(--sand)]">{p.title}</p>
                <p className="mt-1 text-sm text-[var(--mist)]">{p.summary}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button as="a" href="/projets" variant="outline" size="md">
              Voir tous les projets →
            </Button>
          </div>
          <div className="mt-4">
            <Button as="a" href="/brochure.pdf" variant="ghost" size="sm">
              Télécharger la plaquette
            </Button>
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-20 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-8 text-sm text-[var(--mist)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {brand.name}</p>
        <div className="flex gap-4">
          <a href="/faq" className="hover:text-[var(--sand)]">FAQ</a>
          <a href="/mentions-legales" className="hover:text-[var(--sand)]">Mentions légales</a>
        </div>
      </footer>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
