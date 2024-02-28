import { Component, inject } from "@angular/core";
import { MatCard } from "@angular/material/card";
import { MatTableModule } from '@angular/material/table'
import { ShyftApiService } from "./shyft-ap.service";
import {  WalletStore } from "@heavy-duty/wallet-adapter";
import { toSignal} from '@angular/core/rxjs-interop'
import { computedAsync } from "ngxtension/computed-async";
import { CommonModule } from "@angular/common";


@Component({
    selector:'duty-work-space-transactions-section',
    imports: [MatTableModule,MatCard, CommonModule],
    standalone: true,
    template: `
    <mat-card class="w-[800px] px-4 py-8">
      <h2 class="text-center text-3xl my-4">Historial de Transacciones</h2>
      <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">



      @if (!transactions()) {
        <p class="text-center">Conecta tu wallet para ver las transacciones.</p>
      } @else if (transactions()?.length === 0) {
        <p class="text-center">No hay transacciones disponibles.</p>
      } @else {
        <table mat-table [dataSource]="transactions() ?? []">
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let element">{{ element.type }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">{{ element.status }}</td>
          </ng-container>

          <ng-container matColumnDef="timestamp">
            <th mat-header-cell *matHeaderCellDef>Timestamp</th>
            <td mat-cell *matCellDef="let element">{{ element.timestamp | date: 'dd/MM/yyyy HH:mm'  }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      }
    </mat-card>
  `,
})

export class TransactionsSectionComponent {

    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);


    readonly displayedColumns = ['type','status','timestamp'];
    readonly transactions = computedAsync(() =>
        this._shyftApiService.getTransanctions(this._publicKey()?.toBase58()),
        { requireSync:false},
    )
}