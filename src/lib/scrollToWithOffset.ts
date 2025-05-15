export function scrollToWithOffset(id: string, offset = 80) {
  const el = document.getElementById(id.replace('#', ''));
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
} 