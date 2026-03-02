import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import '@grayscale-dev/dragon';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
