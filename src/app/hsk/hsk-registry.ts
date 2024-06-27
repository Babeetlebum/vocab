import { Injectable, inject } from "@angular/core";
import { map } from "rxjs";
import { HskResource } from "./hsk.resource";

@Injectable({
  providedIn: "root",
})
export class HskRegistry {
  private readonly hsks$ = inject(HskResource).get();
  readonly randomHsk$ = this.hsks$.pipe(
    map((hsks) => hsks[Math.floor(Math.random() * hsks.length)])
  );
}
