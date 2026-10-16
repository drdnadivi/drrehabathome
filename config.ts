/** Business contact & compliance constants — update registration number when available. */
export const WHATSAPP_NUMBER = '917373638970';
export const DISPLAY_PHONE = '+91 73736 38970';
export const CARE_EMAIL = 'n.adharshan@gmail.com';
export const SERVICE_CITY = 'Bengaluru';

/** RMP disclosure (NMC electronic media) — replace placeholder with real SMR/NMR number */
export const RMP_NAME = 'Dr. Dharshan N A';
export const RMP_QUALIFICATION = 'MD (Physical Medicine & Rehabilitation)';
export const RMP_REGISTRATION = 'KMC 180734';

/** Neutral enquiry text — informational, not hard solicitation */
export const WHATSAPP_BOOK_MESSAGE =
  'Hello DrRehab@Home, I would like to enquire about guided home rehab protocols in Bengaluru with weekly review.';

export function getWhatsAppBookUrl(extra?: string): string {
  const text = extra ? `${WHATSAPP_BOOK_MESSAGE} ${extra}` : WHATSAPP_BOOK_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function openWhatsAppBooking(extra?: string): void {
  window.open(getWhatsAppBookUrl(extra), '_blank', 'noopener,noreferrer');
}

export function getTelHref(): string {
  return `tel:+${WHATSAPP_NUMBER}`;
}

export function getMailHref(): string {
  return `mailto:${CARE_EMAIL}`;
}
