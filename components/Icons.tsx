import { Briefcase, FileCheck2, GraduationCap, Plane, Users, Wallet } from "lucide-react";
import type { Service } from "@/lib/content";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.44 9.44m8.04-17.48A11.3 11.3 0 0 0 12.04.7C5.77.7.67 5.79.67 12.06c0 2 .52 3.96 1.52 5.68L.57 23.62l6.02-1.58a11.3 11.3 0 0 0 5.45 1.39h.01c6.26 0 11.36-5.1 11.37-11.37a11.3 11.3 0 0 0-3.33-8.04" />
    </svg>
  );
}

const map = { users: Users, file: FileCheck2, wallet: Wallet, plane: Plane, graduation: GraduationCap, briefcase: Briefcase };

export function ServiceIcon({ name, className = "h-6 w-6" }: { name: Service["icon"]; className?: string }) {
  const I = map[name];
  return <I className={className} strokeWidth={1.75} />;
}
