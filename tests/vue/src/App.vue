<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
const changed = ref('');

function handleInput(event: Event) {
  const target = event.currentTarget as HTMLElement & { value: string };
  value.value = target.value;
}

function handleChange(event: Event) {
  const target = event.currentTarget as HTMLElement & { value: string };
  changed.value = target.value;
}

function setProgrammatic() {
  value.value = 'programmatic';
}
</script>

<template>
  <div class="app">
    <dui-input
      id="inp"
      name="field"
      placeholder="Email"
      :value="value"
      @input="handleInput"
      @change="handleChange"
    ></dui-input>
    <div id="out">{{ value }}</div>
    <div id="changed">{{ changed }}</div>
    <button id="set-value" type="button" @click="setProgrammatic">
      Set Value
    </button>
  </div>
</template>
