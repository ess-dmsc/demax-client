export class Proposal {
	proposalId: string;
	dateCreated?: string;
	submitted?: boolean;
	experimentTitle?: string;
	briefSummary?: string;
	mainProposer: {
		firstName?: string;
		lastName?: string;
		email?: string;
		phone?: string;
		employer?: string;
		industry?: string;
		jobTitle?: string;
	};
	coProposers: [
		{
			firstName?: string;
			lastName?: string;
			email?: string;
			affiliation?: string;
		}
		];
	needByDate?: string;
	needByDateMotivation?: string;
	lab?: string;
	linksWithIndustry?: string;
	linksWithIndustryDetails?: string;
	coProposerStudents?: string;
	workTowardsStudentsDegree?: string;
	wantsCrystallization?: boolean;
	wantsBiologicalDeuteration?: boolean;
	wantsBiomassDeuteration?: boolean;
	wantsProteinDeuteration?: boolean;
	wantsOtherDeuteration?: boolean;
	wantsChemicalDeuteration?: boolean;
	crystallization?: {
		moleculeName?: string;
		moleculeIdentifier?: string;
		molecularWeight?: string;
		oligomerizationState?: string;
		pbdId?: string;
		doi?: string;
		crystallizationRequirements?: string;
		crystallizationPrecipitantComposition?: string;
		previousCrystallizationExperience?: string;
		estimatedCrystallizationProductionTime?: string;
		typicalCrystalSize?: string;
		typicalYieldMgPerLiter?: string;
		storageConditions?: string;
		stability?: string;
		buffer?: string;
		levelOfDeuteration?: string;
		typicalProteinConcentrationUsed?: string;
		other?: string;
	};
	biomassDeuteration?: {
		organismProvidedByUser?: string;
		organismDetails?: string;
		amountNeeded?: string;
		stateOfMaterial?: string;
		amountNeededMotivation?: string;
		deuterationLevelRequired?: string;
		deuterationLevelMotivation?: string
		other?: string;
	};
	proteinDeuteration?: {
		moleculeName?: string;
		moleculeIdentifier?: string;
		molecularWeight?: string;

		oligomerizationState?: string;
		expressionRequirements?: string;
		moleculeOrigin?: string;

		expressionPlasmidProvidedByUser?: string;
		expressionPlasmidProvidedByUserDetails?: string;

		amountNeeded?: string;
		amountNeededMotivation?: string;

		deuterationLevelRequired?: string;
		deuterationLevelMotivation?: string;

		needsPurificationSupport?: string;
		hasDoneUnlabeledProteinExpression?: string;
		typicalYield: string;
		hasDonePurification?: string;
		hasProteinPurificationExperience?: string;
		proteinDeuterationResults?: string
		other?: string;
	};
	bioSafety?: {
		bioSafetyContainmentLevel?: string;
		organismRisk?: string;
		organismRiskDetails?: string
		other?: string;
	};
	chemicalDeuteration?: {
		moleculeName?: string;
		amount?: string;
		amountMotivation?: string;
		deuterationLocationAndPercentege?: string;
		deuterationLevelMotivation?: string;
		hasPreparedMolecule?: string;
		other?: string;
	};
    proposalTemplate: {
        name?: string;
        path?: string;
        uploaded?: boolean;
    };
    generatedProposal: {
        name?: string;
        path?: string;
        generated?: boolean;
    };
    needByDateAttachment: {
        name?: string;
	    path?: string;
        uploaded?: boolean;
    };
    mergedProposal: {
        name?: string;
        path?: string;
	    merged?: boolean;
    };
    pbdIdReferenceAttachment: {
        name?: string;
	    path?: string;
        uploaded?: boolean;
    };
    organismReferenceAttachment: {
        name?: string;
	    path?: string;
        uploaded?: boolean;
    };
    needsPurificationSupportAttachment: {
        name?: string;
	    path?: string;
        uploaded?: boolean;
    };
    chemicalStructureAttachment: {
        name?: string;
	    path?: string;
        uploaded?: boolean;
    };
    moleculePreparationReferenceArticle: {
        name?: string;
	    path?: string;
        uploaded?: boolean;
    };
}
