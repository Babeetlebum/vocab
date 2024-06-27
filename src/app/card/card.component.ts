import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
})
export class CardComponent implements OnChanges {
  @Input({ required: true }) hanzi!: string;
  @Output() pinyinSubmitted = new EventEmitter<string>();

  formGroup = new FormGroup({
    pinyin: new FormControl(""),
  });

  ngOnChanges({ hanzi }: SimpleChanges): void {
    if (hanzi) {
      this.formGroup.reset();
    }
  }

  onSubmit() {
    this.pinyinSubmitted.emit(
      this.formGroup.controls.pinyin.getRawValue() ?? ""
    );
  }
}
