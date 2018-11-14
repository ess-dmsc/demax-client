export class Proposal {
    _id?: string;
    experiment_title?: string;
    brief_summary?: string;
    proposer?: {
        role?: string;
        firstname?: string;
        lastname?: string;
        email?: string;
        phone?: string;
        affiliation?: {
            industry?: string;
            employer?: string;
            employer_address?: string;
            employer_zipcode?: string;
            employer_city?: string;
            employer_country?: string;
            employer_phone?: string;
        }
    };
    need_by_date?: {
        motivation?: string;
        document?: string;
    };
    resources?: {
        lab?: string;
        instrument?: string;
        service?: string;
    };
    deuteration_methods?: {
        crystallization?: boolean;
        biomass?: boolean;
        protein?: boolean;
        chemical?: boolean;
    };
}
