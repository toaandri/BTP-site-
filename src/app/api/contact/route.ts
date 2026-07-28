import { NextResponse } from "next/server";

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 3;
const ipMap = new Map<string, { count: number; resetAt: number }>();

type Body = {
  name: string;
  email: string;
  phone?: string;
  need?: string;
  message: string;
  _hp?: string;
};

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const record = ipMap.get(ip);
    if (record && now < record.resetAt) {
      if (record.count >= RATE_LIMIT_MAX) {
        return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 });
      }
      record.count++;
    } else {
      ipMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    }

    const body: Body = await request.json();
    const { name, email, phone, need, message, _hp } = body;

    if (_hp) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nom, email et message sont requis." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "contact@exemple-btp.fr",
            to: "contact@exemple-btp.fr",
            subject: `Nouveau message de ${name}`,
            html: `<p><strong>Nom :</strong> ${name}</p>
                   <p><strong>Email :</strong> ${email}</p>
                   ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
                   ${need ? `<p><strong>Besoin :</strong> ${need}</p>` : ""}
                   <p><strong>Message :</strong></p>
                   <p>${message}</p>`,
          }),
        });
      } catch {
        console.log("Resend non configuré, email non envoyé");
      }
    }

    console.log("Contact form submission:", { name, email, phone, need, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
