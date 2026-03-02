import '../src/index.ts';

const liveInput = document.querySelector('dui-input#live-input');
const liveValue = document.querySelector('#live-value');
const form = document.querySelector('#demo-form') as HTMLFormElement | null;
const formOutput = document.querySelector('#form-output');

if (liveInput && liveValue) {
  liveValue.textContent = (liveInput as HTMLElement & { value?: string }).value ?? '';
  liveInput.addEventListener('input', (event) => {
    const target = event.currentTarget as HTMLElement & { value?: string };
    liveValue.textContent = target.value ?? '';
  });
}

if (form && formOutput) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const entries = Array.from(data.entries()).map(([key, value]) => {
      return `${key}=${value.toString()}`;
    });
    formOutput.textContent = entries.length ? entries.join('\n') : '(no form values)';
  });
}
