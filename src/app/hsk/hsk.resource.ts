import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

export interface HskDto {
  id: number;
  pinyin: string;
  hanzi: string;
  translations: string[];
}

@Injectable({
  providedIn: "root",
})
export class HskResource {
  private readonly http = inject(HttpClient);

  get(): Observable<HskDto[]> {
    return this.http.get<HskDto[]>("/hsk-level-1.json");
  }
}
