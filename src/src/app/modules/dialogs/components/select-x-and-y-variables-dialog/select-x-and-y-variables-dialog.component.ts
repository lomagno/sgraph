import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LineChartData } from '@models/LineChartData';
import { MissingValuesService } from '@services/missing-values.service';
import { SwireService } from '@services/swire.service';

@Component({
  selector: 'app-select-x-and-y-variables-dialog',
  templateUrl: './select-x-and-y-variables-dialog.component.html',
  styleUrl: './select-x-and-y-variables-dialog.component.scss'
})
export class SelectXAndYVariablesDialogComponent implements OnInit {
  form!: FormGroup;
  stataVariablesList: string[] = [];
  isLoadingStataVariablesList = true;
  isSwireConnectionError = false;
  
  // Form controls
  get xStataVariableNameFC() { return this.form.get('xStataVariableName'); }
  get yStataVariableNameFC() { return this.form.get('yStataVariableName'); }
  get skipMissingValuesFC() { return this.form.get('skipMissingValues'); }

  constructor(
    public dialogRef: MatDialogRef<SelectXAndYVariablesDialogComponent>,
    private swireService: SwireService,
    private formBuilder: FormBuilder,
    private missingValuesService: MissingValuesService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      xStataVariableName: [null, [Validators.required]],
      yStataVariableName: [null, [Validators.required]],
      skipMissingValues: [true, [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.swireService.getVarNames().subscribe({
      next: (response) => {
        this.isLoadingStataVariablesList = false;
        if (response.status == 'ok') 
          this.stataVariablesList = response.output[0].output;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        this.isLoadingStataVariablesList = false;
        this.isSwireConnectionError = true;
        console.error(error);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  onCancelButtonClicked(): void {
    this.dialogRef.close();
  }

  onOkButtonClicked(): void {
    const stataVarNames: string[] = [
      this.xStataVariableNameFC?.value,
      this.yStataVariableNameFC?.value
    ];
    this.swireService.getNumericVars(stataVarNames).subscribe({
      next: (response) => {
        if (response.status == 'ok') {
          var rawXData = response.output[0].output;
          var rawYData = response.output[1].output;
          if (this.skipMissingValuesFC?.value) {
            var filteredNotMissing = this.missingValuesService
              .filterNotMissing([rawXData, rawYData]);
            var xData = filteredNotMissing[0];
            var yData = filteredNotMissing[1];
          }
          else {
            var xData = rawXData;
            var yData = rawYData;
          }          
          var lineChartData: LineChartData = {
            xData: xData,
            yData: yData
          };
          this.dialogRef.close(lineChartData);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
