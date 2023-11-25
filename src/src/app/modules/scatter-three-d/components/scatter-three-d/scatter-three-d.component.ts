import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThreeDScatterData } from '@models/ThreeDScatterData';
import { SelectXYZVariablesDialogComponent } from '@modules/dialogs/components/select-x-y-z-variables-dialog/select-x-y-z-variables-dialog.component';
import { OptionsFormModel } from '@modules/scatter-three-d/models/OptionsFormModel';
import { ECharts, EChartsOption, SeriesOption } from 'echarts';
import 'echarts-gl';

@Component({
  selector: 'app-scatter-three-d',
  templateUrl: './scatter-three-d.component.html',
  styleUrl: './scatter-three-d.component.scss'
})
export class ScatterThreeDComponent {
  readonly initialWidth = 800;
  readonly initialHeight = 400;
  readonly initialSymbolSize = 5;
  eChartInstance!: ECharts;
  chartOption!: EChartsOption;
  optionsFormModel!: OptionsFormModel;
  isDataAvailable = false;

  constructor(
    public dialog: MatDialog) {
      this.optionsFormModel = {
        width: this.initialWidth,
        height: this.initialHeight,
        symbolSize: this.initialSymbolSize
      };
  }

  onChartInit(eChartInstance: ECharts): void {
    this.eChartInstance = eChartInstance;
    this.eChartInstance.resize({
      width: this.initialWidth,
      height: this.initialHeight
    });
  }

  onSelectDataButtonClicked(): void {
    const dialogRef = this.dialog.open(SelectXYZVariablesDialogComponent);

    dialogRef.afterClosed().subscribe((threeDScatterData: ThreeDScatterData) => {
      if (threeDScatterData == null)
        return;

      var points: number[][] = [];
      for (var i = 0; i<threeDScatterData.xData.length; ++i) {
        points.push([
          threeDScatterData.xData[i],
          threeDScatterData.yData[i],
          threeDScatterData.zData[i]
        ])
      }

      this.isDataAvailable = true;
      this.chartOption = {
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        tooltip: {
          show: true,
          formatter: (params: any) => {
            const precision = 3;
            const data = params.data;
            const formattedX = data[0].toFixed(precision);
            const formattedY = data[1].toFixed(precision);
            const formattedZ = data[2].toFixed(precision);
            return `${formattedX}; ${formattedY}; ${formattedZ}`;
          }
        },
        series: [{
          type: 'scatter3D' as 'scatter',
          symbolSize: this.initialSymbolSize,
          data: points,
          itemStyle: {
            opacity: 1
          }
        }],
        toolbox: {
          feature: {
            saveAsImage: {
              name: '3D scatter'
            }
          }
        }
      };
    });
  }

  onOptionsChanged(optionsFormModel: OptionsFormModel): void {
    (this.chartOption.series as any[])[0].symbolSize = optionsFormModel.symbolSize;
    this.eChartInstance.setOption(this.chartOption);
    this.eChartInstance.resize({
      width: optionsFormModel.width,
      height: optionsFormModel.height
    });
  }
}
