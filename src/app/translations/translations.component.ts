import { Component, Input } from "@angular/core";

@Component({
  selector: "app-translations",
  standalone: true,
  imports: [],
  templateUrl: "./translations.component.html",
  styleUrl: "./translations.component.scss",
})
export class TranslationsComponent {
  @Input({ required: true }) translations!: string[];
}
