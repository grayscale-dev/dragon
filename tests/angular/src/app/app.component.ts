import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="app">
      <dui-input
        id="inp"
        name="field"
        placeholder="Email"
        [attr.value]="value"
        (input)="onInput($event)"
        (change)="onChange($event)"
      ></dui-input>
      <div id="out">{{ value }}</div>
      <div id="changed">{{ changed }}</div>
      <button id="set-value" type="button" (click)="setProgrammatic()">
        Set Value
      </button>
    </div>
  `
})
export class AppComponent {
  value = '';
  changed = '';

  onInput(event: Event): void {
    const target = event.currentTarget as HTMLElement & { value: string };
    this.value = target.value;
  }

  onChange(event: Event): void {
    const target = event.currentTarget as HTMLElement & { value: string };
    this.changed = target.value;
  }

  setProgrammatic(): void {
    this.value = 'programmatic';
  }
}
