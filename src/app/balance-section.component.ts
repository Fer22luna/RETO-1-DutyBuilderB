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
    <mat-card class="w-[800px] px-4 py-4 bg-current">
      <h2 class="text-center text-2xl mt-2">Balance Account</h2>
      <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">


      @if (!account()) {
        <p class="text-center">Conecta tu wallet para ver tu balance.</p>
      } @else {
        <div class="flex justify-between items-center pe-4">
          <img [src]="account()?.info?.image" class="w-[160px] h-[160px] ps-4 pb-4" />
          <div class="flex justify-between items-center ">
            <div class="flex flex-col items-center justify-center me-4">
              <p class="text-5xl font-bold ">{{ account()?.balance }}</p>
              <p class="text-xs font-light">Your account balance</p>
            </div>
            
            <button mat-raised-button color="primary" (click)="onTransfer()">
              Transferir
            </button>
          </div>
        </div>

    
      }

  
    </mat-card>
  `
    ,
    imports:[MatCardModule, MatIconModule, MatButtonModule],
})

export class BalanceSectionComponent{

    private readonly _shyftApiService = inject(ShyftApiService);
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