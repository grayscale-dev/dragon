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

const liveDropdown = document.querySelector('dui-dropdown#live-dropdown') as (HTMLElement & { value?: string; options?: unknown }) | null;
const dropdownValue = document.querySelector('#dropdown-value');

if (liveDropdown && dropdownValue) {
  liveDropdown.options = [
    { value: 'new', label: 'New' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'done', label: 'Done' }
  ];

  dropdownValue.textContent = liveDropdown.value ?? '';
  liveDropdown.addEventListener('input', (event) => {
    const target = event.currentTarget as HTMLElement & { value?: string };
    dropdownValue.textContent = target.value ?? '';
  });
}
