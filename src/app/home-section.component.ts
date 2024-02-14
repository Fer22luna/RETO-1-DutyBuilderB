import { FeaturesPageComponent } from './features-section.component';
import { HeroSectionComponent } from './hero-section.component';
import { Component } from "@angular/core";

@Component({
    selector:'duty-work-space-home',
    standalone:true,
    template:`
        <duty-work-space-hero></duty-work-space-hero>
        <duty-work-space-features></duty-work-space-features>
    `,
    imports:[HeroSectionComponent,FeaturesPageComponent],
})

export class HomePageComponent {}