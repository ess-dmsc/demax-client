import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalArchiveComponent } from './proposal-archive.component';

describe('ProposalArchiveComponent', () => {
  let component: ProposalArchiveComponent;
  let fixture: ComponentFixture<ProposalArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
