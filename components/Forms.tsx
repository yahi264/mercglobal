"use client";

import { useState } from "react";
import { CheckCircle2, Mail, AlertCircle } from "lucide-react";
import { WhatsAppIcon } from "./Icons";

// The site is hosted without a server, so forms don't post anywhere: they prepare a ready-to-send
// message in WhatsApp or in the visitor's email app, addressed to Merç Global.

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  full?: boolean;
  autoComplete?: string;
};

type Props = {
  fields: Field[];
  subject: string;
  email: string;
  whatsapp: string;
  labels: { whatsapp: string; email: string; required: string; badEmail: string; opened: string; select: string };
  note?: string;
  emailFirst?: boolean;
};

export function ContactForm({ fields, subject, email, whatsapp, labels, note, emailFirst }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState(false);

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const validate = () => {
    setTouched(true);
    if (fields.some((f) => f.required && !values[f.name]?.trim())) return labels.required;
    const em = fields.find((f) => f.type === "email");
    if (em && values[em.name] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[em.name])) return labels.badEmail;
    return null;
  };

  const body = () =>
    [
      subject,
      "",
      ...fields.filter((f) => values[f.name]?.trim()).map((f) => `${f.label}: ${values[f.name].trim()}`),
    ].join("\n");

  const send = (via: "wa" | "mail") => {
    const err = validate();
    setError(err);
    if (err) return;
    const text = body();
    if (via === "wa") {
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    setDone(true);
  };

  const invalid = (f: Field) => touched && f.required && !values[f.name]?.trim();

  const waBtn = (
    <button key="wa" type="button" onClick={() => send("wa")} className="btn-wa flex-1">
      <WhatsAppIcon className="h-5 w-5" /> {labels.whatsapp}
    </button>
  );
  const mailBtn = (
    <button key="mail" type="button" onClick={() => send("mail")} className={`${emailFirst ? "btn-brand" : "btn-outline"} flex-1`}>
      <Mail className="h-4 w-4" /> {labels.email}
    </button>
  );

  return (
    <form className="grid gap-4 sm:grid-cols-2" noValidate onSubmit={(e) => (e.preventDefault(), send(emailFirst ? "mail" : "wa"))}>
      {fields.map((f) => {
        const id = `f-${f.name}`;
        const common = {
          id,
          name: f.name,
          value: values[f.name] ?? "",
          required: f.required,
          "aria-invalid": invalid(f) || undefined,
          placeholder: f.placeholder,
          autoComplete: f.autoComplete,
          className: `field ${invalid(f) ? "!border-brand" : ""}`,
        };
        return (
          <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-fg">
              {f.label} {f.required && <span className="text-brand">*</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea {...common} rows={4} onChange={(e) => set(f.name, e.target.value)} />
            ) : f.type === "select" ? (
              <select {...common} onChange={(e) => set(f.name, e.target.value)}>
                <option value="">{labels.select}</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input {...common} type={f.type ?? "text"} onChange={(e) => set(f.name, e.target.value)} />
            )}
          </div>
        );
      })}

      {note && <p className="text-sm text-muted sm:col-span-2">{note}</p>}

      {error && (
        <p role="alert" className="flex items-center gap-2 rounded-xl bg-brand-soft px-4 py-3 text-sm font-medium text-brand sm:col-span-2">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </p>
      )}
      {done && !error && (
        <p role="status" className="flex items-center gap-2 rounded-xl bg-whatsapp/10 px-4 py-3 text-sm font-medium text-[#128c7e] dark:text-whatsapp sm:col-span-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> {labels.opened}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">{emailFirst ? [mailBtn, waBtn] : [waBtn, mailBtn]}</div>
    </form>
  );
}
