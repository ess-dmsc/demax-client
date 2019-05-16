import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalRoundComponent } from './proposal-round.component';

describe('ProposalRoundComponent', () => {
  let component: ProposalRoundComponent;
  let fixture: ComponentFixture<ProposalRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
