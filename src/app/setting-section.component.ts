import { Component } from "@angular/core";
import { TransactionsSectionComponent } from "./transactions-section.component";

@Component({
    selector:'duty-work-space-settings',
    imports : [ TransactionsSectionComponent ],
    standalone:true,
    template:`
        <section class="px-16 py-24 bg-white bg-opacity-5 ">
            <h2 class="text-center text-3xl"> Settings Page </h2>
            <p class="text-center"> Welcome to the settings page!</p>
        </section>
        <duty-work-space-transactions-section></duty-work-space-transactions-section>
    `,
})

export class SettingsPageComponent {}