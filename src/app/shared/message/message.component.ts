import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [ './message.component.css']
})
export class MessageComponent {

	@Input() message = { body: '', type: '' };

	setMessage(body, type, time = 3000) {
		this.message.body = body;
		this.message.type = type;
		setTimeout(() => this.message.body = '', time);
	}
}