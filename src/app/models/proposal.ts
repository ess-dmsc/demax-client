export class Proposal {
	proposalId: string;
	experimentTitle?: string;
	briefSummary?: string;
	mainProposer: {
		firstName?: string;
		lastName?: string;
		email?: string;
		phone?: string;
		employer?: string;
		sector?: string;
		title?: string;
	};
	coProposers: [
		{
			firstName?: string;
			lastName?: string;
			affiliation?: string;
		}
		];
	needByDate?: string;
	needByDateMotivation?: string;
	needByDateAttachment?: string;
	lab?: string;
	linksWithIndustry?: string;
	coProposerStudents?: string;
	workTowardsStudentsDegree?: string;
	wantsCrystallization?: string;
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
		hasPreparedMoleculeProtocol?: string
		other?: string;
	};
	submitted?: boolean;
	proposalTemplate?: string;
	generatedProposal?: string;
	mergedProposal?: string;
	pbdIdReferenceAttachment?: string;
	organismReferenceAttachment?: string;
	needsPurificationSupportAttachment?: string;
	chemicalStructureAttachment?: string;
	moleculePreparationReferenceArticle?: string;
};
