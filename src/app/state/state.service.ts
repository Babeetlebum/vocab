import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { ToneService } from "../tone/tone.service";

export enum Step {
  Loading = "Loading",
  Play = "Play",
  Result = "Result",
}

interface State {
  step: Step;
  hanzi: string | undefined;
  answer: string | undefined;
  pinyin: string | undefined;
  translations: string[];
}

export interface Vm extends State {
  correctAnswer: string | undefined;
}

const initialState: State = {
  step: Step.Loading,
  hanzi: undefined,
  answer: undefined,
  pinyin: undefined,
  translations: [],
};

@Injectable({
  providedIn: "root",
})
export class StateService {
  private readonly stateSource = new BehaviorSubject<State>(initialState);
  private readonly toneService = inject(ToneService);
  readonly vm$: Observable<Vm> = this.stateSource.asObservable().pipe(
    map((state) => ({
      ...state,
      correctAnswer: this.getCorrectAnswer(state.pinyin),
    }))
  );

  setPlay(state: {
    hanzi: string;
    pinyin: string;
    translations: string[];
  }): void {
    this.stateSource.next({
      ...this.stateSource.value,
      step: Step.Play,
      answer: undefined,
      ...state,
    });
  }

  setResult(state: { answer: string }): void {
    this.stateSource.next({
      ...this.stateSource.value,
      step: Step.Result,
      ...state,
    });
  }

  private getCorrectAnswer(pinyin: string | undefined): string | undefined {
    return pinyin !== undefined ? this.toneService.convert(pinyin) : undefined;
  }
}
