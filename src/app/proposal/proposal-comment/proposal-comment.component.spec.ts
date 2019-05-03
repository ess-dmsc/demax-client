import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalCommentComponent } from './proposal-comment.component';

describe('ProposalCommentComponent', () => {
  let component: ProposalCommentComponent;
  let fixture: ComponentFixture<ProposalCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
});
