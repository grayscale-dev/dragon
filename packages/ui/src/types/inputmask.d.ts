declare module 'inputmask/dist/inputmask.es6.js' {
  interface InputmaskOptions {
    mask: string;
    jitMasking?: boolean;
  }

  interface InputmaskStatic {
    format(value: string, options: InputmaskOptions): string;
    unmask(value: string, options: InputmaskOptions): string;
  }

  const Inputmask: InputmaskStatic;
  export default Inputmask;
}
