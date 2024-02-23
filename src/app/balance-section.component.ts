import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { ShyftApiService } from './shyft-ap.service';
import { computedAsync } from 'ngxtension/computed-async';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { TransferModalComponent } from './transfer-modal.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'duty-work-space-balance-section',
    standalone:true,
    template: `
    <mat-card class="w-[400px] px-4 py-8">
      <h2 class="text-center text-3xl mb-4">Balance</h2>

      @if (!account()) {
        <p class="text-center">Conecta tu wallet para ver tu balance.</p>
      } @else {
        <div class="flex justify-center items-center gap-2">
          <img [src]="account()?.info?.image" class="w-16 h-16" />
          <p class="text-5xl font-bold">{{ account()?.balance }}</p>
        </div>

        <footer class="flex justify-center items-center gap-2 mb-4 mt-8">
        <button mat-raised-button color="primary" (click)="onTransfer()">
          Transferir
        </button>
      </footer>
      }

      
    </mat-card>
  `
    ,
    imports:[MatCardModule, MatIconModule, MatButtonModule],
})

export class BalanceSectionComponent{

    private readonly _shyftApiService = inject(ShyftApiService);
    // private readonly _publicKey = injectPublicKey();
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    private readonly _matDialog = inject(MatDialog);
  
    readonly account = computedAsync(() =>
      this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
      { requireSync:true},
    );
  

    onTransfer(){
      console.log("hola mundo!")
      this._matDialog.open(TransferModalComponent);
    }

}