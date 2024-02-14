import { Component } from "@angular/core";

@Component({
    selector:'duty-work-space-features',
    standalone:true,
    template:`
        <section class="px-16 py-24">
            <ul class="flex justify-center gap-16">
                <li class="text-xl font-bold">Rapido</li>
                <li class="text-xl font-bold">Seguro</li>
                <li class="text-xl font-bold">Eficiente</li>
            </ul>
        </section>
    `,
})

export class FeaturesPageComponent {}