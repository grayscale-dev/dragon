import { useEffect, useRef, useState } from 'react';
import '@grayscale-dev/dragon';

export default function App() {
  const [value, setValue] = useState('');
  const [changed, setChanged] = useState('');
  const inputRef = useRef<HTMLElement & { value: string }>(null);

  const handleInput = (event: React.FormEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement & { value: string };
    setValue(target.value);
  };

  useEffect(() => {
    const node = inputRef.current;
    if (!node) return;
    const onChange = (event: Event) => {
      const target = event.currentTarget as HTMLElement & { value: string };
      setChanged(target.value);
    };
    node.addEventListener('change', onChange);
    return () => {
      node.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <div className="app">
      <dui-input
        id="inp"
        ref={inputRef}
        name="field"
        placeholder="Email"
        value={value}
        onInput={handleInput}
      ></dui-input>
      <div id="out">{value}</div>
      <div id="changed">{changed}</div>
      <button id="set-value" onClick={() => setValue('programmatic')}>
        Set Value
      </button>
    </div>
  );
}
