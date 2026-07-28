import Link from "next/link";
import { brand } from "@/data/content";

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 text-[var(--mist)]">
      <Link href="/" className="text-sm text-[var(--accent)] hover:text-[var(--sand)]">
        ← Retour
      </Link>
      <h1 className="mt-6 font-display text-4xl text-[var(--sand)]">Mentions légales</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed">
        <p>
          Site édité par <strong className="text-[var(--sand)]">{brand.name}</strong> — activité de
          conception de plans BTP / offshore.
        </p>
        <p>
          Contact : remplacer les coordonnées dans <code>src/data/content.ts</code> (e-mail, LinkedIn,
          Facebook).
        </p>
        <p>
          Hébergeur : à compléter selon le déploiement (ex. Vercel). Aucune donnée personnelle n&apos;est
          collectée hors des canaux de contact que vous utilisez volontairement.
        </p>
        <p>Ce contenu est fourni à titre indicatif et doit être finalisé avec vos informations légales.</p>
      </div>
    </main>
  );
}
