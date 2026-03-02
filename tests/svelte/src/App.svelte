<script>
  let value = '';
  let changed = '';

  function handleInput(event) {
    const target = event.currentTarget;
    value = target.value;
  }

  function handleChange(event) {
    const target = event.currentTarget;
    changed = target.value;
  }

  function setProgrammatic() {
    value = 'programmatic';
  }
</script>

<div class="app">
  <dui-input
    id="inp"
    name="field"
    placeholder="Email"
    {value}
    on:input={handleInput}
    on:change={handleChange}
  ></dui-input>
  <div id="out">{value}</div>
  <div id="changed">{changed}</div>
  <button id="set-value" type="button" on:click={setProgrammatic}>
    Set Value
  </button>
</div>
