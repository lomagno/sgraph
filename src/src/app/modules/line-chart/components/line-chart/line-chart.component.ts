import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectXAndYVariablesDialogComponent } from '@modules/dialogs/components/select-x-and-y-variables-dialog/select-x-and-y-variables-dialog.component';
import { LineChartData } from '@models/LineChartData';
import { ECharts, EChartsOption } from 'echarts';
import { OptionsFormModel } from '@modules/line-chart/models/OptionsFormModel';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent  {
  readonly initialWidth = 800;
  readonly initialHeight = 400;
  readonly initialSymbolSize = 5; 
  readonly initialShowAxisPointer = false;
  eChartInstance!: ECharts;
  chartOption!: EChartsOption;
  optionsFormModel!: OptionsFormModel;
  isLineChartDataAvailable = false;

  constructor(
    public dialog: MatDialog
  ) {
    this.optionsFormModel = {
      width: this.initialWidth,
      height: this.initialHeight,
      symbolSize: this.initialSymbolSize,
      showAxisPointer: this.initialShowAxisPointer
    };    
  }

  onChartInit(eChartInstance: ECharts): void {
    this.eChartInstance = eChartInstance;
    this.eChartInstance.resize({
      width: this.initialWidth,
      height: this.initialHeight
    });
  }  

  onSelectDataButtonClicked() {
    const dialogRef = this.dialog.open(SelectXAndYVariablesDialogComponent);

    dialogRef.afterClosed().subscribe((lineChartData: LineChartData) => {
      if (lineChartData != null) {
        this.isLineChartDataAvailable = true;
        this.chartOption = {
          xAxis: {
            type: 'category',
            data: lineChartData.xData,
            name: 'x',
            nameLocation: 'middle',
            nameTextStyle: {
              fontSize: '1rem'
            }
          },
          yAxis: {
            type: 'value',
            name: 'y',
            nameLocation: 'middle'
          },
          tooltip: {
            show: true,
            formatter: (x: any) => { return `${x.name}; ${x.data.toFixed(3)}`;},
            axisPointer: {
              type: 'cross'
            }
          },
          series: [
            {
              data: lineChartData.yData,
              type: 'line'
            }
          ],
          toolbox: {
            feature: {
              saveAsImage: {
                name: 'Line chart'
              }
            }
          },      
          axisPointer: {
            show: this.initialShowAxisPointer,
            label: {
              backgroundColor: '#777'
            }
          },
          dataZoom: [
              // {
              //   type: 'inside',
              //   start: 0,
              //   end: 10
              // },
              {
                start: 0,
                end: 100,
                yAxisIndex: 0
              },
              {
                  start: 0,
                  end: 100,
              }            
            ],        
        };        
      }
    });
  }

  onOptionsChanged(optionsFormModel: OptionsFormModel): void {
    (this.chartOption.series as any[])[0].symbolSize = optionsFormModel.symbolSize;
    (this.chartOption.axisPointer as any).show = optionsFormModel.showAxisPointer;
    this.eChartInstance.setOption(this.chartOption);
    this.eChartInstance.resize({
      width: optionsFormModel.width,
      height: optionsFormModel.height
    });
  }  
}
