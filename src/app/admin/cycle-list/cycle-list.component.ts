import { Component, Inject, OnInit } from "@angular/core";
import { APP_CONFIG, AppConfig } from "../../app-config.module";
import { AuthService } from "../../user/auth.service";
import { Router } from "@angular/router";
import { MessageComponent } from "../../shared/message/message.component";
import { Cycle } from "../../models/cycle";
import { AdminService } from "../admin.service";

@Component({
	selector: 'app-cycle-list',
	templateUrl: './cycle-list.component.html',
	styleUrls: [ './cycle-list.component.css' ]
})
export class CycleListComponent implements OnInit {
	url = this.appConfig.demaxBaseUrl;

	displayedColumns: string[] = [ 'cycleId', 'active', 'submission', 'review', 'notifyUsers', 'edit', 'delete' ];

	cycle = new Cycle();
	cycles: Cycle[] = [];
	isLoading = true;

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		private adminService: AdminService,
		public auth: AuthService,
		public router: Router,
		public message: MessageComponent
	) {
	}

	ngOnInit() {
		window.scrollTo(0, 0)
		this.getCycles();
	}

	getCycles() {
		this.isLoading = true;
		window.scrollTo(0, 0)
		this.adminService.getCycles().subscribe(
			data => {
				this.cycles = data;
				this.isLoading = false;
			},
			error => {
				console.log(error);
				this.message.setMessage(error.message, 'danger');
			}
		);

	}

	deleteCycle(cycle: Cycle) {
		this.isLoading = true;
		this.cycle = cycle;
		window.scrollTo(0, 0)
		if(window.confirm('Are you sure you want to permanently delete this proposal?')) {
			this.adminService.deleteCycle(cycle).subscribe(
				() => {
					this.getCycles();
					this.message.setMessage('Deleted proposal ' + this.cycle.cycleId, 'danger')

				},
				error => {
					console.log(error);
					this.message.setMessage(error.message, 'danger')
				}
			);
		}
	}

}
