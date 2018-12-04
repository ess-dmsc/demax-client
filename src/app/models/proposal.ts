export class Proposal{
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
			coProposerAffiliation?: string
		}
		];
	needByDate?: string;
	needByDateMotivation?: string;
	needByDateAttachment?: string;
	lab?: string;
	dateCreated?: string;
	crystallization?: {
		moleculeName?: string;
		moleculeIdentifier?: string;
		molecularWeight?: string;
		oligomerizationState?: string;
		pbdId?: string;
		doi?: string;
		referenceAttachment?: string;
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
		typicalProteinConcentrationUsed?: string
	};
	biomassDeuteration?: {
		organismProvidedByUser?: string;
		organismDetails?: string;
		organismReferenceAttachment?: string;
		amountNeeded?: string;
		amountNeededMotivation?: string;
		deuterationLevelRequired?: string;
		deuterationLevelMotivation?: string
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
		needsPurificationSupportAttachment?: string;
		hasDoneUnlabeledProteinExpression?: string;
		hasDonePurification?: string;
		hasProteinPurificationExperience?: string;
		proteinDeuterationResults?: string
	};
	bioSafety?: {
		bioSafetyContainmentLevel?: string;
		organismRisk?: string;
		organismRiskDetails?: string
	};
	chemicalDeuteration?: {
		moleculeName?: string;
		amount?: string;
		amountMotivation?: string;
		deuterationLocationAndPercentege?: string;
		deuterationLevelMotivation?: string;
		chemicalStructureAttachment?: string;
		hasPreparedMolecule?: string;
		hasPreparedMoleculeProtocol?: string
	};
	proposalTemplate?:string
};