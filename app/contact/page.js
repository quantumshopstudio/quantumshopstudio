import { ContactForm } from "../../components/ContactForm";

export const metadata = { title: "Contact • Quantum Shop Studio" };

export default function ContactPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 text-slate-300">
        Tell me what you’re building. I’ll respond with next steps and a clear plan.
      </p>
      <ContactForm />
    </div>
  );
}

