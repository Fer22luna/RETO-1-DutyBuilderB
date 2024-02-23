import { Component,  OnInit,  inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-ap.service';
import { WalletStore , ConnectionStore} from '@heavy-duty/wallet-adapter';
import { toSignal} from '@angular/core/rxjs-interop'
import { computedAsync } from 'ngxtension/computed-async';
import {  CommonModule, DecimalPipe} from '@angular/common';
import { MatAnchor } from '@angular/material/button'
import { TransactionsSectionComponent } from './transactions-section.component';
import { BalancePageComponent } from './balance-page.component';


@Component({
  standalone: true,
  imports: [
    RouterModule,
    HdWalletMultiButtonComponent,
    DecimalPipe,
    MatAnchor,
    // RouterLink, 
    CommonModule,
    // TransactionsSectionComponent,
    BalancePageComponent
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
  
<duty-work-space-balance-page></duty-work-space-balance-page>
  <!-- <nav>
    <ul class="flex justify-center gap-4 py-16">
      <li>
        <a [routerLink]="['']" mat-raised-button>Home</a>
      </li>
      <li>
        <a [routerLink]="['settings']" mat-raised-button>Settings</a>
      </li>
    </ul>
  </nav> -->

  </header>


  <!-- <main>
    <router-outlet></router-outlet>
  </main>  -->

  

  `
})
export class AppComponent implements OnInit{
 

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  private readonly _connectionStore = inject(ConnectionStore);
  

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync:true},
  );

  readonly balance = computedAsync(() => 
    this._shyftApiService.getBalance(this._publicKey()?.toBase58()),
    { requireSync:true},
  );

  ngOnInit() {
    this._connectionStore.setEndpoint(this._shyftApiService.getEnpoint());
  }


}
