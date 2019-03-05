import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APP_CONFIG, APP_DI_CONFIG } from '../../app-config.module';
import { SharedModule } from "../../shared/shared.module";
import { AuthService } from "../../user/auth.service";
import { FileAdminComponent } from "../file-admin/file-admin.component";
import { ProposalAdminComponent } from "../proposal-admin/proposal-admin.component";
import { UserAdminComponent } from "../user-admin/user-admin.component";

describe('AdminComponent', () => {
	let component: AdminComponent;
	let fixture: ComponentFixture<AdminComponent>;
	let authService: AuthService;
	let authServiceStub: {
		loggedIn: boolean,
		isAdmin: boolean,
		currentUser: any
	};


	beforeEach(async(() => {
		authServiceStub = {
		loggedIn: false,
		isAdmin: false,
		currentUser: { username: 'Tester' }
	};


    TestBed.configureTestingModule({
      declarations: [AdminComponent, FileAdminComponent, ProposalAdminComponent, UserAdminComponent],
      imports: [SharedModule],
      providers: [
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        { provide: HttpClient }, { provide: Router }, { provide: JwtHelperService }]
    })
    .compileComponents().then(() => {
	    fixture = TestBed.createComponent(AdminComponent);
	    component = fixture.componentInstance;
	    authService = fixture.debugElement.injector.get(AuthService);
	    fixture.detectChanges();
    });
  }));

	/*it('should create the component', async()=>{
		expect(component).toBeTruthy();
	})*/

});
