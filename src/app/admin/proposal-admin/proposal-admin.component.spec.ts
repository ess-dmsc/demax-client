import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalAdminComponent } from './proposal-admin.component';

describe('ProposalAdminComponent', () => {
  let component: ProposalAdminComponent;
  let fixture: ComponentFixture<ProposalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
