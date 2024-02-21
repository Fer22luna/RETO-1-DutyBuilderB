import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-ap.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal} from '@angular/core/rxjs-interop'
import { computedAsync } from 'ngxtension/computed-async';
import {  CommonModule, DecimalPipe} from '@angular/common';
import { MatAnchor } from '@angular/material/button'
import { TransactionsSectionComponent } from './transactions-section.component';
import { MatDialog } from '@angular/material/dialog';
import { TransferModalComponent } from './transfer-modal.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HdWalletMultiButtonComponent,
    DecimalPipe,
    MatAnchor,
    RouterLink, 
    CommonModule,
    TransactionsSectionComponent,
    ],
  selector: 'duty-work-space-root',
  template:`
  <header class="px-16 pt-20 pb-8 relative">
  <h1 class ="text-center text-5xl mb-4">My Account</h1>


   @if (account()) {
    <div class="absolute top-4 left-4 flex items-center gap-2">
    <img [src]="account()?.info?.image" alt="" class="w-8 h-8">
      <p class="text-2xl font-bold">
        {{account()?.balance | number}}  
      </p>
    </div>
  } 

 
  <div class="flex justify-center gap-4">
      <hd-wallet-multi-button> </hd-wallet-multi-button>
  </div>
 
  @if (balance()) {
    <div class="flex justify-center items-center gap-2 ">
      <p class="text-2xl font-bold">
        {{balance()?.balance }}  
      </p>
    </div>
  } 
  

  <nav>
    <ul class="flex justify-center gap-4 py-16">
      <li>
        <a [routerLink]="['']" mat-raised-button>Home</a>
      </li>
      <li>
        <a [routerLink]="['settings']" mat-raised-button>Settings</a>
      </li>
    </ul>
  </nav>

  </header>

<button (click)="onTransfer()">
  transferir
</button>

  <main>
    <router-outlet></router-outlet>
  </main> 

  

  `
})
export class AppComponent {
 

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  private readonly _matDialog = inject(MatDialog);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync:true},
  );

  readonly balance = computedAsync(() => 
    this._shyftApiService.getBalance(this._publicKey()?.toBase58()),
    { requireSync:true},
  );

  // readonly transactions = computedAsync(() =>
  //   this._shyftApiService.getTransanctions(this._publicKey()?.toBase58())
  // )

  onTransfer(){
    console.log("hola mundo!")
    this._matDialog.open(TransferModalComponent);
  }


}
