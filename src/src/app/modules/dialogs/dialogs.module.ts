import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from '@modules/common-components/common-components.module';

// Components
import { SelectXAndYVariablesDialogComponent } from './components/select-x-and-y-variables-dialog/select-x-and-y-variables-dialog.component';
import { SelectXYZVariablesDialogComponent } from './components/select-x-y-z-variables-dialog/select-x-y-z-variables-dialog.component';
import { NoStataVariablesComponent } from './components/no-stata-variables/no-stata-variables.component';
import { SwireConnectionErrorComponent } from './components/swire-connection-error/swire-connection-error.component';

// Angular Material
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    SelectXAndYVariablesDialogComponent,
    SelectXYZVariablesDialogComponent,
    NoStataVariablesComponent,
    SwireConnectionErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonComponentsModule,

    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    SelectXAndYVariablesDialogComponent,
    SelectXYZVariablesDialogComponent
  ]
})
export class DialogsModule { }
