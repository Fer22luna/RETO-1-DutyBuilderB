import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'

@Component({
    selector: 'duty-work-space-balance-section',
    standalone:true,
    template: `
        <mat-card class="px-4 py-8 h-full flex flex-col relative">
            <header>
                <h2 class="text-3xl text-center">Balance</h2>
            </header>

            <div>
                <button mat-mini-fab >
                    <mat-icon>refresh</mat-icon>
                </button>
            </div>


        </mat-card>

    `,
    
    imports:[MatCardModule, MatIconModule],
})

export class BalanceSectionComponent{}