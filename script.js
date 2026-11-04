const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
document.getElementById('year').textContent = new Date().getFullYear();

(() => {
  // Forminit form: inputs are named fi-{type}-{name}. Rules: https://forminit.com/setup.md
  const FORM_ID = 'e20cx0opi34';
  const FIELD_ERRORS = {
    'sender.fullName': 'Please use only letters, spaces, hyphens, apostrophes and periods in your name.',
    'sender.email': 'Please enter a valid email address.',
    'sender.phone': 'Please enter a valid phone number with the country code, such as +64.',
  };
  function errorText(error) {
    const field = error?.fieldName ?? /['"]([^'"]+)['"]/.exec(error?.message ?? '')?.[1];
    if (field && FIELD_ERRORS[field]) return FIELD_ERRORS[field];
    if (error?.error === 'TOO_MANY_REQUESTS') return 'Please wait a few seconds and try again.';
    return 'Your message could not be sent. Please try again, or call Rowan on 021 106 8461.';
  }
  const form = document.getElementById('contact-form');
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[data-form-status]');
  let forminit;
  let sending = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    const fd = new FormData(form);
    for (const key of ['fi-sender-fullName', 'fi-sender-firstName', 'fi-sender-lastName']) {
      const value = fd.get(key);
      if (typeof value === 'string') fd.set(key, value.replace(/[\u2018\u2019]/g, "'"));
    }
    status.textContent = 'Sending your message…';
    sending = true;
    button.disabled = true;
    try {
      if (!forminit) forminit = new Forminit();
      const { data, error } = await forminit.submit(FORM_ID, fd);
      if (error || typeof data?.hashId !== 'string') {
        console.error('Forminit:', error ?? data);
        status.textContent = errorText(error);
        return;
      }
      status.textContent = 'Thank you — your message has been sent. Rowan will be in touch.';
      form.reset();
    } catch (error) {
      console.error('Forminit:', error);
      status.textContent = errorText(error);
    } finally {
      sending = false;
      button.disabled = false;
    }
  });
})();
