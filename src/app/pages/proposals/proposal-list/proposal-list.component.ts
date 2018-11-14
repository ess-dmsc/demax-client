import { Component, OnInit } from '@angular/core';
import { Proposal } from '../proposal';
import { ProposalService } from '../proposal.service';
import { ProposalDetailsComponent } from '../proposal-details/proposal-details.component';

@Component({
    selector: 'app-proposal-list',
    templateUrl: './proposal-list.component.html',
    styleUrls: [ './proposal-list.component.css' ],
    providers: [ ProposalService ]
})

export class ProposalListComponent implements OnInit {

    proposals: Proposal[]
    selectedProposal: Proposal

    constructor(private proposalService: ProposalService) {
    }

    ngOnInit() {
        this.proposalService
        .getProposals()
        .then((proposals: Proposal[]) => {
            this.proposals = proposals.map((proposal) => {
                /*if (!proposal.phone) {proposal.phone = {mobile: '', work: ''}}*/
                return proposal;
            });
        });
    }

    private getIndexOfProposal = (proposalId: String) => {
        return this.proposals.findIndex((proposal) => {
            return proposal._id === proposalId;
        });
    }

    selectProposal(proposal: Proposal) {
        this.selectedProposal = proposal
    }

    createNewProposal() {
        var proposal: Proposal = {
            experiment_title: '',
            brief_summary: '',
            proposer: {
                role: '',
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                affiliation: {
                    industry: '',
                    employer: '',
                    employer_address: '',
                    employer_zipcode: '',
                    employer_city: '',
                    employer_country: '',
                    employer_phone: ''
                },
            }, need_by_date: {
                motivation: '',
                document: ''
            },
            resources: {
                lab: '',
                instrument: '',
                service: ''
            },
            deuteration_methods: {
                crystallization: false,
                biomass: false,
                protein: false,
                chemical: false
            }
        };
        this.selectProposal(proposal);
    }

    deleteProposal = (proposalId: String) => {
        const idx = this.getIndexOfProposal(proposalId);
        if (idx !== -1) {
            this.proposals.splice(idx, 1);
            this.selectProposal(null);
        }
        return this.proposals;
    }

    addProposal = (proposal: Proposal) => {
        this.proposals.push(proposal);
        this.selectProposal(proposal);
        return this.proposals;
    }

    updateProposal = (proposal: Proposal) => {
        const idx = this.getIndexOfProposal(proposal._id);
        if (idx !== -1) {
            this.proposals[ idx ] = proposal;
            this.selectProposal(proposal);
        }
        return this.proposals;
    }
}
