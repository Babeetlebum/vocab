import { Component, Input } from "@angular/core";

@Component({
  selector: "app-result",
  standalone: true,
  imports: [],
  templateUrl: "./result.component.html",
  styleUrl: "./result.component.scss",
})
export class ResultComponent {
  @Input({ required: true }) answer!: string | undefined;
  @Input({ required: true }) correctAnswer!: string | undefined;
  @Input({ required: true }) pinyin!: string | undefined;
}
