import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { EffectsService } from "./state/effects.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  private readonly effectsService = inject(EffectsService);

  constructor() {
    this.effectsService.registerEffects();
  }
}
