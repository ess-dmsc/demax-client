import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadService } from './upload.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
    declarations: [
        DialogComponent, UploadComponent
    ],
    imports: [
        CommonModule, MatButtonModule, MatDialogModule,
        MatListModule, FlexLayoutModule, HttpClientModule, BrowserAnimationsModule,
        MatProgressBarModule
    ],
    exports: [ UploadComponent ],
    entryComponents: [ DialogComponent ], // Add the DialogComponent as entry component
    providers: [ UploadService ]
})
export class UploadModule {
}
