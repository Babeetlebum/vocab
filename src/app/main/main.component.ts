import { AsyncPipe, JsonPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { ResultComponent } from "../result/result.component";
import { StateService } from "../state/state.service";
import { TranslationsComponent } from "../translations/translations.component";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    ResultComponent,
    TranslationsComponent,
    JsonPipe,
  ],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent {
  private readonly stateService = inject(StateService);
  readonly vm$ = this.stateService.vm$;

  onPinyinSubmission(answer: string) {
    this.stateService.setResult({ answer });
  }
}
