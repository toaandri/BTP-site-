import Link from "next/link";
import { faq } from "@/data/content";

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/" className="text-sm text-[var(--accent)] hover:text-[var(--sand)]">
        ← Retour
      </Link>
      <h1 className="mt-6 font-display text-4xl text-[var(--sand)]">FAQ</h1>
      <p className="mt-3 text-[var(--mist)]">Questions fréquentes sur mes services de plans BTP.</p>
      <dl className="mt-10 space-y-6">
        {faq.map((item, i) => (
          <div key={i} className="border-t border-white/10 pt-6">
            <dt className="font-display text-lg text-[var(--sand)]">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-[var(--mist)]">{item.a}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
