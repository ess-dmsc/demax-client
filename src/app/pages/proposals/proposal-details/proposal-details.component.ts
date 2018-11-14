import { Component, Input } from '@angular/core';
import { Proposal } from '../proposal';
import { ProposalService } from '../proposal.service';

@Component({
    selector: 'app-proposal-details',
    templateUrl: './proposal-details.component.html',
    styleUrls: [ './proposal-details.component.css' ]
})

export class ProposalDetailsComponent {
    @Input()
    proposal: Proposal;

    @Input()
    createHandler: Function;
    @Input()
    updateHandler: Function;
    @Input()
    deleteHandler: Function;

    constructor(private proposalService: ProposalService) {
    }

    createProposal(proposal: Proposal) {
        this.proposalService.createProposal(proposal).then((newProposal: Proposal) => {
            this.createHandler(newProposal);
        });
    }

    updateProposal(proposal: Proposal): void {
        this.proposalService.updateProposal(proposal).then((updatedProposal: Proposal) => {
            this.updateHandler(updatedProposal);
        });
    }

    deleteProposal(proposalId: String): void {
        this.proposalService.deleteProposal(proposalId).then((deletedProposalId: String) => {
            this.deleteHandler(deletedProposalId);
        });
    }
}
