/** Business contact — update only here; site pulls from these. */
export const WHATSAPP_NUMBER = '917373638970';
export const DISPLAY_PHONE = '+91 73736 38970';
export const CARE_EMAIL = 'n.adharshan@gmail.com';
export const SERVICE_CITY = 'Bengaluru';

export const WHATSAPP_BOOK_MESSAGE =
  'Hello DrRehab at Home, I would like to book a home assessment / physiotherapy visit in Bengaluru.';

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
