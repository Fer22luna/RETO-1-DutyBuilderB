import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { TransactionsSectionComponent } from './transactions-section.component';

@Component({
    selector: 'duty-work-space-balance-page',
    template: `
        <div class="flex justify-center gap-4">
        <duty-work-space-balance-section></duty-work-space-balance-section>
        <duty-work-space-transactions-section></duty-work-space-transactions-section>
        </div>
    
    `,
    standalone:true,
    imports: [BalanceSectionComponent, TransactionsSectionComponent]
})

export class BalancePageComponent {}