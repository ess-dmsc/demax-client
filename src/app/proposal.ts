export class Proposal {
	proposalId?: string;
	dateCreated?: string;
	experimentTitle?: string;
	briefSummary?: string;
	mainProposerFirstName?: string;
	mainProposerLastName?: string;
	mainProposerAffiliation?: string;
	mainProposerEmail?: string;
	mainProposerPhone?: string;
	coProposers?: [
		{
			coProposerFirstName?: string;
			coProposerLastName?: string;
			coProposerEmail?: string;
			coProposerPhone?: string;
			coProposerAffiliation?: string;
		}
		];
	needByDate?: string;
	needByDateMotivation?: string;
	lab?: string;
	wantsCrystallization?: boolean;
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
	};
	biomassDeuteration?: {
		organismProvidedByUser?: string;
		organismDetails?: string;
		amountNeeded?: string;
		amountNeededMotivation?: string;
		deuterationLevelRequired?: string;
		deuterationLevelMotivation?: string;
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
		proteinDeuterationResults?: string;
	};
	bioSafety?: {
		bioSafetyContainmentLevel?: string;
		organismRisk?: string;
		organismRiskDetails?: string;
	};
	chemicalDeuteration?: {
		moleculeName?: string;
		amount?: string;
		amountMotivation?: string;
		deuterationLocationAndPercentege?: string;
		deuterationLevelMotivation?: string;
		hasPreparedMolecule?: string;
		hasPreparedMoleculeProtocol?: string;
	};
	needByDateAttachment?: string;
	pbdIdReferenceAttachment?: string;
	organismReferenceAttachment?: string;
	needsPurificationSupportAttachment?: string;
	chemicalStructureAttachment?: string;
	proposalTemplate?: string;
	generatedProposal?: string;
};
