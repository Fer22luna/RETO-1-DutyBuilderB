import { Component, Output, EventEmitter, inject, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input'
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface TransferFormModel {
    memo: string | null;
    receiver: string | null;
    amount: number | null;
    token: {
      address: string;
      balance: number;
      info: { name: string; symbol: string; image: string };
    } | null;
  }
  
  export interface TransferFormPayload {
    memo: string;
    receiver: string;
    amount: number;
    mintAddress: string;
  }

@Component({
    selector: 'duty-work-space-transfer-form',
    standalone:true,
    imports:[FormsModule, MatFormFieldModule, MatInput, MatIcon, MatButton, MatSelect,MatOption],
    template: `
    <form #form = "ngForm" class="w-[400px]" (ngSubmit)="onSubmit(form)">
        
    <mat-form-field class="w-full mb-4" >
        <mat-label>Moneda</mat-label>
        <mat-select
            [(ngModel)] = "model.token"
            name = "token"
            required 
            [disabled] = "disabled()"
            #tokenControl = "ngModel"     
        >
            @for (token of tokens(); track token) {
            
                <mat-option [value] = "token">
                    <div class="flex items-center gap-2">
                        <img [src]="token.info.image" class="rounded-full w-8 h-8"/>
                        <span> {{token.info.symbol}} </span>
                    </div>
                </mat-option>
            }
        </mat-select>

        @if (form.submitted && tokenControl.errors){
            <mat-error>
                @if(tokenControl.errors['required']){
                    El moneda es obligatorio  
                }       
            </mat-error>
                }@else {
                    <mat-hint> La moneda que deseas transferir </mat-hint>
                }
    </mat-form-field>


    <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Concepto(memo)</mat-label>
        <input 
            name = "memo"
            type = "text"
            matInput 
            placeholder="Ejemplo : Pagar recibo"
            [(ngModel)] = "model.memo"
            required
            #memoControl = "ngModel" 
            [disabled]="disabled()"
            >
        <mat-icon matSuffix>description</mat-icon>

        @if (form.submitted && memoControl.errors) {
            <mat-error>
                @if(memoControl.errors['required']){
                    El motivo es obligatorio  
                }       
            </mat-error>
                }@else {
                    <mat-hint> Debe ser el motivo de la transferencia</mat-hint>
                }

    </mat-form-field>

    <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Monto(amount)</mat-label>
        <input 
            name = "amount"
            type = "number"
            matInput 
            min="0"
            placeholder="Ingresa el monto acá."
            [(ngModel)] = "model.amount"
            required
            #amountControl = "ngModel" 
            [disabled]="disabled()"
            [max]="tokenControl.value?.balance ?? undefined"
            >
        <mat-icon matSuffix>attach_money</mat-icon>

        @if (form.submitted && amountControl.errors) {
            <mat-error>
                @if(amountControl.errors['required']){
                    El monto es obligatorio  
                } @else if (amountControl.errors['min']) {
                    El monto debe ser mayor que cero
                }     
            </mat-error>
                }@else {
                    <mat-hint> Debe ser el monto de la transferencia</mat-hint>
                }
            
    </mat-form-field>

    <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Destinatario(receiverAddress)</mat-label>
        <input 
            name = "receiverAddress"
            type = "text"
            matInput 
            placeholder="Ingresa la Public key de la wallet del destinatario."
            [(ngModel)] = "model.receiver"
            required
            #receiverAddressControl = "ngModel" 
            [disabled]="disabled()"
            >
        <mat-icon matSuffix>key</mat-icon>

        @if (form.submitted && receiverAddressControl.errors) {
            <mat-error>
                @if(receiverAddressControl.errors['required']){
                    El destinatario es obligatorio  
                }
            </mat-error>
                }@else {
                    <mat-hint> Debe ser una wallet de solana</mat-hint>
                }

    </mat-form-field>    

        <footer class="flex justify-center gap-4">
            <button 
                type="submit"   
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 w-24 rounded"
                [disabled]="disabled()"
                > Send 
            </button>
            <button 
                type="button"   
        
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 w-24 rounded"
                [disabled]="disabled()"
                (click) = "onCancel()"
                >Cancel
            </button>

        </footer>
    </form>
    `
})

export class TransferFormComponent  {

    private readonly _matSnackBar = inject(MatSnackBar)


    readonly tokens = input <
        {
        address: string,
        balance : number
        info : { name : string; symbol: string; image: string };
        }[]
    >([]);

    readonly disabled = input<boolean>(false);

    @Output() readonly sendTransfer = new EventEmitter<TransferFormPayload>();
    @Output() readonly cancelTransfer = new EventEmitter();


    readonly model : TransferFormModel = {
        memo : null,
        receiver : null,
        amount : null,
        token : null,
    };


    onSubmit(form : NgForm){
        if(form.invalid 
            || this.model.amount === null
            || this.model.memo === null
            || this.model.receiver  === null
            || this.model.token === null
            ){
                this._matSnackBar.open('El formulario es invalido.', 'Cerrar', {
                duration:4000,
                horizontalPosition:'end',
                });
        } else {
            this.sendTransfer.emit({
                amount: this.model.amount,
                memo: this.model.memo,
                receiver : this.model.receiver,
                mintAddress : this.model.token.address,
            });
        }
    }


    onCancel(){
    this.cancelTransfer.emit();
    }
}