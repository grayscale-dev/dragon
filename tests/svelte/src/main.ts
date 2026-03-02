import App from './App.svelte';
import '@grayscale-dev/dragon';
import './style.css';

const app = new App({
  target: document.getElementById('app') as HTMLElement
});

export default app;
