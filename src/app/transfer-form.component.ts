import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input'


export interface TransferFormModel {
    memo: string | null;
    amount : number | null;
    receiverAddress : string | null;

}

export interface TransferFormPayload {
    memo : string;
    amount : number;
    receiverAddress : string;
}

@Component({
    selector: 'duty-work-space-transfer-form',
    standalone:true,
    imports:[FormsModule, MatFormFieldModule, MatInput, MatIcon, MatButton],
    template: `
    <form #form = "ngForm" class="w-[400px]" (ngSubmit)="onSubmitForm(form)">
        
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
            [(ngModel)] = "model.receiverAddress"
            required
            #receiverAddressControl = "ngModel" 
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

    <footer class="flex justify-center">
        <button type="submit" mat-raised-button color="primary">Enviar</button>
    </footer>

    </form>
    `
})

export class TransferFormComponent  {

    readonly model : TransferFormModel = {
        memo : null,
        amount : null,
        receiverAddress : null
    };

    @Output() readonly submitForm = new EventEmitter<TransferFormPayload>();



    onSubmitForm(form : NgForm){
        if(form.invalid || this.model.amount === null
            || this.model.memo === null
            || this.model.receiverAddress  === null
            ){
        console.log("el formulario es invalido.")
        } else {
            this.submitForm.emit({
                amount: this.model.amount,
                memo: this.model.memo,
                receiverAddress : this.model.receiverAddress
            })
        }
    }


}