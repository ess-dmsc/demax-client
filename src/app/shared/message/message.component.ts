import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
	MAT_SNACK_BAR_DATA,
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition
} from "@angular/material";

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styleUrls: [ './message.component.css' ],
})
export class MessageComponent {

	@Input() message = {body: '', type: ''};

	constructor(public snackBar: MatSnackBar) {
	}

	setMessage(body, type, time = 3000) {
		this.message.body = body;
		this.message.type = type;
		this.snackBar.open(body, '', {
				duration: time,
				horizontalPosition: 'center',
				verticalPosition: 'bottom',
				panelClass: [`${type}-snackbar`]
			}
		);
	}


	/*setMessage(body, type, time = 3000) {
		this.message.body = body;
		this.message.type = type;
		this.openSnackBar(body, type, time);
		setTimeout(() => this.message.body = '', time);
	}

	openSnackBar(body: string, type: string, time: number) {
		this.snackBar.openFromComponent(SnackBarMessageComponent, {
			data: body,
			panelClass: 'style-' + type,
			duration: time,
			horizontalPosition: 'left',
			verticalPosition: 'bottom'
		});
	}
	*/
}

@Component({
	selector: 'snack-bar-message-component',
	templateUrl: './snack-bar-message-component.html',
	styleUrls: [ './message.component.css' ]
})
export class SnackBarMessageComponent {
	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
	}
}