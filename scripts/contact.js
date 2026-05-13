(function () {
  'use strict';

  const ACCESS_KEY = '59a3c4bf-384d-4cd7-95b9-cbdabfb6d731';
  const ENDPOINT = 'https://api.web3forms.com/submit';

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const status = form.querySelector('.contact-status');
    const submit = form.querySelector('.contact-submit');
    const label = form.querySelector('.contact-submit-label');
    const originalLabel = label ? label.textContent : 'Send message';

    function setStatus(text, kind) {
      if (!status) return;
      status.textContent = text;
      status.classList.remove('is-success', 'is-error');
      if (kind) status.classList.add('is-' + kind);
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (form.botcheck && form.botcheck.value) return;

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        setStatus('Please fill every field.', 'error');
        return;
      }

      submit.disabled = true;
      if (label) label.textContent = 'Sending…';
      setStatus('', null);

      const payload = {
        access_key: ACCESS_KEY,
        subject: 'Vide Kami — new message from ' + name,
        from_name: name,
        email: email,
        message: message,
        botcheck: ''
      };

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(function () { return {}; });

        if (res.ok && data.success) {
          form.reset();
          setStatus('Message sent. Thank you.', 'success');
        } else {
          setStatus(data.message || 'Something went wrong. Please try again.', 'error');
        }
      } catch (err) {
        setStatus('Network error. Please try again.', 'error');
      } finally {
        submit.disabled = false;
        if (label) label.textContent = originalLabel;
      }
    });
  });
})();
