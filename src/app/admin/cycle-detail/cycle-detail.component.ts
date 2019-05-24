import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Cycle } from "../../models/cycle";
import { APP_CONFIG, AppConfig } from "../../app-config.module";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageComponent } from "../../shared/message/message.component";
import { AdminService } from "../admin.service";

@Component({
	selector: 'app-cycle-detail',
	templateUrl: './cycle-detail.component.html',
	styleUrls: [ './cycle-detail.component.css' ]
})
export class CycleDetailComponent implements OnInit {

	cycle: Cycle;
	cycleForm: FormGroup;

	currentCycleId: string;
	currentCycleObjectId: string;

	isLoading = true;
	isEditing = false;
	isCreating = false;

	constructor(
		@Inject(APP_CONFIG) private appConfig: AppConfig,
		public activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private message: MessageComponent,
		private adminService: AdminService,
		public router: Router
	) {
	}

	ngOnInit() {
		this.cycleForm = this.formBuilder.group({
			cycleId: [ '' ],
			isActive: null,
			submission: this.formBuilder.group({
				startDate: [ '' ],
				endDate: [ '' ]
			}),
			review: this.formBuilder.group({
				startDate: [ '' ],
				endDate: [ '' ]
			}),
			notifyUsers: this.formBuilder.group({
				startDate: [ '' ],
				endDate: [ '' ]
			}),
			runCycle: [ '' ],
			wrapUp: [ '' ],
			other: [ '' ]
		});

		this.currentCycleId = this.activatedRoute.snapshot.params.cycleId;
		console.log(this.currentCycleId)


		if(this.currentCycleId === 'new') {
			this.isCreating = true;
			this.isLoading = false;
		}

		else {
			this.isEditing = true;
			this.adminService.getCycleById(this.currentCycleId)
			.subscribe(
				response => {
					this.cycle = response;
					this.cycleForm.patchValue(this.cycle);
					this.isLoading = false;
				},
				error => {
					console.log(error);
					this.isLoading = false;
				}
			)
		}
	}

	save() {
		console.log(this.cycleForm.value)
		this.cycle = this.cycleForm.value;
		this.adminService.editCycle(this.cycleForm.value).subscribe(
			response => {
				this.message.setMessage('Saved!', 'success');
			},
			error => {
				this.message.setMessage(error.error, 'danger');
			}
		)
	}

	createNewCycle() {
		this.adminService.postCycle(this.cycleForm.value).subscribe(
			response => {
				this.message.setMessage('Successfully created a new proposal cycle', 'success');
				this.isCreating = false;
				this.isEditing = true;
			},
			error => {
				this.message.setMessage(error.error, 'danger');
			}
		)
	}

}
