import { Component } from "@angular/core";
import { BalancePageComponent } from "./balance-page.component";

@Component({
    selector:'duty-work-space-settings',
    imports : [ BalancePageComponent ],
    standalone:true,
    template:`
        <section class="px-16 py-24 bg-white bg-opacity-5 ">
            <h2 class="text-center text-3xl"> Settings Page </h2>
            <p class="text-center"> Welcome to the settings page!</p>
        </section>
        <!-- <duty-work-space-balance-page></duty-work-space-balance-page> -->
    `,
})

export class SettingsPageComponent {}