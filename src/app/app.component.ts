import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-ap.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal} from '@angular/core/rxjs-interop'
import { computedAsync } from 'ngxtension/computed-async';

@Component({
  standalone: true,
  imports: [ RouterModule, HdWalletMultiButtonComponent ],
  selector: 'duty-work-space-root',
  template:`
  <header>
  <h1>hola</h1>
  </header>
  <div>

  </div>
  <hd-wallet-multi-button>
 </hd-wallet-multi-button>

  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync:true},
  )
}
