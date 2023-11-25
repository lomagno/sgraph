import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionsFormModel } from '@modules/scatter-three-d/models/OptionsFormModel';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent implements AfterViewInit {
  @Input('model') model!: OptionsFormModel;
  @Output('on-changed') onChangedEventEmitter = new EventEmitter<OptionsFormModel>();
  form!: FormGroup;

  // Form controls
  get widthFC() { return this.form.get('width'); }  
  get heightFC() { return this.form.get('height'); }  
  get symbolSizeFC() { return this.form.get('symbolSize'); } 

  constructor(
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        width: [null, [Validators.required]],
        height: [null, [Validators.required]],
        symbolSize: [null, [Validators.required]],
      });      
      this.form.valueChanges.subscribe(() => {
        this.onChangedEventEmitter.emit({
          width: this.widthFC?.value,
          height: this.heightFC?.value,
          symbolSize: this.symbolSizeFC?.value
        });
      });
  }

  ngAfterViewInit(): void {
    this.widthFC?.setValue(this.model.width);
    this.heightFC?.setValue(this.model.height);
    this.symbolSizeFC?.setValue(this.model.symbolSize);
  }
}
