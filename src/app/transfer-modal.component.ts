import { Component} from '@angular/core';
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';
import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from "@heavy-duty/spl-utils"
import { config } from './config';

@Component({
    selector: 'duty-work-space-traansfer-modal',
    standalone: true,
    imports : [TransferFormComponent],
    template:`
    <div class="px-8 pt-16 pb-8">
        <h2 class="text-3xl text-center mb-8"> transfer modal</h2>

        <duty-work-space-transfer-form (submitForm)="onTransfer($event)"></duty-work-space-transfer-form>


    </div>
    ` 
})

export class TransferModalComponent  {

    private readonly _transactionSender = injectTransactionSender();


    onTransfer(payload : TransferFormPayload){
        console.log("hola desde el transfer modal",payload)
        

    this._transactionSender.send(({publicKey}) => createTransferInstructions({
        amount:payload.amount,
        mintAddress: config.mint,
        receiverAddress: payload.receiverAddress,
        senderAddress: publicKey.toBase58(),
        fundReceiver: true, // para crearte el associated token account por si no lo tiene el que recibe la transferencia 
        memo: payload.memo
    }))


        .subscribe({
            next:(signature) => console.log(`Firma : ${signature}`),  // esta es la firma que representa a esta transaccion en la blockchain
            error: error =>console.error(error),
            complete: () => console.log('transaccion lista')
        });
    }
   
}