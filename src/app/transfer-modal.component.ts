import { Component} from '@angular/core';
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';

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

    onTransfer(payload : TransferFormPayload){
        console.log("hola desde el transfer modal",payload)



    }
   
}