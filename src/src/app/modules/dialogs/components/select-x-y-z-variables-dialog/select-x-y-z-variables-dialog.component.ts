import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ThreeDScatterData } from '@models/ThreeDScatterData';
import { MissingValuesService } from '@services/missing-values.service';
import { SwireService } from '@services/swire.service';

declare var swire: any;

@Component({
  selector: 'app-select-x-y-z-variables-dialog',
  templateUrl: './select-x-y-z-variables-dialog.component.html',
  styleUrl: './select-x-y-z-variables-dialog.component.scss'
})
export class SelectXYZVariablesDialogComponent implements OnInit {
  form!: FormGroup;
  stataVariablesList: string[] = [];
  isLoadingStataVariablesList = true;
  isSwireConnectionError = false;
  
  // Form controls
  get xStataVariableNameFC() { return this.form.get('xStataVariableName'); }
  get yStataVariableNameFC() { return this.form.get('yStataVariableName'); }
  get zStataVariableNameFC() { return this.form.get('zStataVariableName'); }
  get skipMissingValuesFC() { return this.form.get('skipMissingValues'); }

  constructor(
    public dialogRef: MatDialogRef<SelectXYZVariablesDialogComponent>,
    private swireService: SwireService,
    private missingValuesService: MissingValuesService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      xStataVariableName: [null, [Validators.required]],
      yStataVariableName: [null, [Validators.required]],
      zStataVariableName: [null, [Validators.required]],
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
      this.yStataVariableNameFC?.value,
      this.zStataVariableNameFC?.value
    ];
    this.swireService.getNumericVars(stataVarNames).subscribe({
      next: (response) => {
        if (response.status == 'ok') {
          var rawXData = response.output[0].output;
          var rawYData = response.output[1].output;
          var rawZData = response.output[2].output;
          if (this.skipMissingValuesFC?.value) {
            var filteredNotMissing = this.missingValuesService
              .filterNotMissing([rawXData, rawYData, rawZData]);
            var xData = filteredNotMissing[0];
            var yData = filteredNotMissing[1];
            var zData = filteredNotMissing[2];
          }
          else {
            var xData = rawXData;
            var yData = rawYData;
            var zData = rawZData;
          }
          var lineChartData: ThreeDScatterData = {
            xData: xData,
            yData: yData,
            zData: zData,
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
