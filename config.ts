/** Update this to your real WhatsApp number (country code, no + or spaces). */
export const WHATSAPP_NUMBER = '919000000000';

export const WHATSAPP_BOOK_MESSAGE =
  'Hello DrRehab at Home, I would like to book a home assessment for pre/post knee replacement physiotherapy in Bengaluru.';

export function getWhatsAppBookUrl(extra?: string): string {
  const text = extra ? `${WHATSAPP_BOOK_MESSAGE} ${extra}` : WHATSAPP_BOOK_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function openWhatsAppBooking(extra?: string): void {
  window.open(getWhatsAppBookUrl(extra), '_blank', 'noopener,noreferrer');
}
