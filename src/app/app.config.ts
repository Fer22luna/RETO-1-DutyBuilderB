import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),
  provideWalletAdapter(),
  provideHttpClient(),
  ],
};
