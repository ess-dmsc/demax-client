import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDetailsComponent } from './proposal-details.component';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadModule } from '../../../upload/upload.module';
import { HttpModule } from '@angular/http';
import { ProposalService } from '../proposal.service';

describe('ProposalDetailsComponent', () => {
    let component: ProposalDetailsComponent;
    let fixture: ComponentFixture<ProposalDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProposalDetailsComponent ],
            imports: [ MaterialModule, FormsModule, ReactiveFormsModule, UploadModule, HttpModule ],
            providers: [ProposalService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProposalDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
