import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ArrowLeftOutline } from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';

const icons = [ArrowLeftOutline];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), importProvidersFrom(NzIconModule.forRoot(icons))]
};
