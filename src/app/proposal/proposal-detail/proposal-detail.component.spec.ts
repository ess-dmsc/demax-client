import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDetailComponent } from './proposal-detail.component';
import { SharedModule } from "../../shared/shared.module";
import { FileModule } from "../../file/file.module";
import { APP_CONFIG, APP_DI_CONFIG, AppConfigModule } from "../../app-config.module";
import { MessageComponent } from "../../shared/message/message.component";

describe('ProposalDetailComponent', () => {
  let component: ProposalDetailComponent;
  let fixture: ComponentFixture<ProposalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	    imports: [AppConfigModule,
	              FileModule,
	              SharedModule
	    ],
      declarations: [ ProposalDetailComponent ],
	    providers: [
		    { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
		    { provide: MessageComponent }
	    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	/*it('should create', () => {
		expect(component).toBeTruthy();
	});*/
});
