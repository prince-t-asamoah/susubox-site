// Contact form enhancement (SHARED-STANDARDS §6). Without JS the form posts
// straight to Netlify and lands on /contact/thanks/.
const form = document.querySelector<HTMLFormElement>("[data-contact-form]");

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const GHANA_PHONE = /^(\+233|0)[0-9]{9}$/;
const ALERT_ICON =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5M12 16.5v.01"/></svg>';

const normalisePhone = (value: string) => value.replace(/[\s-]/g, "");

if (form) {
  form.noValidate = true; // we show our own inline messages instead of browser bubbles

  const fields = [...form.querySelectorAll<Field>("[data-msg-required], [data-msg-invalid]")];
  const alertBox = form.querySelector<HTMLElement>("[data-form-alert]")!;
  const submit = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
  const label = submit.querySelector<HTMLElement>("[data-submit-label]")!;
  const spinner = submit.querySelector<HTMLElement>(".form__spinner")!;
  const dirty = new WeakSet<Field>();

  const errorFor = (field: Field): string => {
    const value = field.value.trim();
    if (!value) return field.required ? (field.dataset.msgRequired ?? "") : "";
    if (field.name === "phone" && !GHANA_PHONE.test(normalisePhone(value))) return field.dataset.msgInvalid ?? "";
    if (field.type === "email" && field instanceof HTMLInputElement && field.validity.typeMismatch) {
      return field.dataset.msgInvalid ?? "";
    }
    return "";
  };

  const validate = (field: Field): boolean => {
    const message = errorFor(field);
    const box = document.getElementById(`${field.id}-error`);
    if (message) {
      field.setAttribute("aria-invalid", "true");
      if (box) box.innerHTML = `${ALERT_ICON}<span>${message}</span>`;
    } else {
      field.removeAttribute("aria-invalid");
      if (box) box.textContent = "";
    }
    return !message;
  };

  for (const field of fields) {
    field.addEventListener("input", () => {
      dirty.add(field);
      // Once an error is showing, clear it as soon as the value is fixed.
      if (field.hasAttribute("aria-invalid")) validate(field);
    });
    field.addEventListener("change", () => dirty.add(field));
    // Validate on blur, but only after the user has typed, so tabbing past doesn't shout.
    field.addEventListener("blur", () => dirty.has(field) && validate(field));
  }

  const setSending = (sending: boolean) => {
    submit.disabled = sending;
    spinner.hidden = !sending;
    label.textContent = sending ? "Sending…" : "Send message";
    for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")) {
      el.readOnly = sending;
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    alertBox.hidden = true;

    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    phone.value = normalisePhone(phone.value);

    setSending(true);
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      location.href = form.getAttribute("action") ?? "/contact/thanks/";
    } catch {
      setSending(false);
      alertBox.hidden = false; // role="alert" announces it; the values are kept
    }
  });
}
