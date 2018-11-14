import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalListComponent } from './proposal-list.component';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadModule } from '../../../upload/upload.module';
import { HttpModule } from '@angular/http';
import { ProposalDetailsComponent } from '../proposal-details/proposal-details.component';

describe('ProposalListComponent', () => {
    let component: ProposalListComponent;
    let fixture: ComponentFixture<ProposalListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProposalListComponent, ProposalDetailsComponent ],
            imports: [ MaterialModule, FormsModule, ReactiveFormsModule, UploadModule, HttpModule ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProposalListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
