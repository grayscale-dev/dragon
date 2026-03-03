export type InputMaskPreset = {
  inputMask: string;
  inputMaskConfig?: Record<string, unknown>;
};

export const DUI_INPUT_MASK_PRESETS: Record<string, InputMaskPreset> = {
  'phone-us': { inputMask: '(999) 999-9999' },
  'phone-intl': { inputMask: '99 999 999 9999' },
  ssn: { inputMask: '999-99-9999' },
  ein: { inputMask: '99-9999999' },
  'zip-us': { inputMask: '99999' },
  'zip-plus4-us': { inputMask: '99999-9999' },
  'credit-card': { inputMask: '9999 9999 9999 9999' },
  cvv: { inputMask: '9{3,4}' },
  expiry: { inputMask: '99/99' },
  'date-iso': { inputMask: '9999-99-99' },
  'time-24h': { inputMask: '99:99' },
  'currency-usd': {
    inputMask: 'decimal',
    inputMaskConfig: {
      alias: 'numeric',
      groupSeparator: ',',
      autoGroup: true,
      digits: 2,
      radixPoint: '.',
      prefix: '$ ',
      removeMaskOnSubmit: true
    }
  }
};
