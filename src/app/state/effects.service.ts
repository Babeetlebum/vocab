import { Injectable, inject } from "@angular/core";
import { filter, fromEvent, switchMap, take, tap } from "rxjs";
import { HskRegistry } from "../hsk/hsk-registry";
import { StateService, Step } from "./state.service";

@Injectable({
  providedIn: "root",
})
export class EffectsService {
  private readonly stateService = inject(StateService);
  private readonly hskRegistry = inject(HskRegistry);

  private readonly initPlaySession$ = this.hskRegistry.randomHsk$.pipe(
    take(1),
    tap(({ hanzi, pinyin, translations }) =>
      this.stateService.setPlay({ hanzi, pinyin, translations })
    )
  );

  private readonly listenForSpacebarInResult$ = this.stateService.vm$.pipe(
    filter(({ step }) => step === Step.Result),
    switchMap(() =>
      fromEvent(document, "keydown").pipe(
        filter(isKeyboardEvent),
        filter(({ code }) => code === "Space"),
        switchMap(() => this.hskRegistry.randomHsk$),
        tap(({ hanzi, pinyin, translations }) =>
          this.stateService.setPlay({ hanzi, pinyin, translations })
        ),
        take(1)
      )
    )
  );

  registerEffects() {
    this.initPlaySession$.subscribe();
    this.listenForSpacebarInResult$.subscribe();
  }
}

const isKeyboardEvent = (event: Event): event is KeyboardEvent =>
  (event as KeyboardEvent).code !== undefined;
