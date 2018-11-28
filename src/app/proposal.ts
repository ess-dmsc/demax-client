export class Proposal {
	_id?: string;
	experimentTitle: string;
	briefSummary: string;
	mainProposerFirstName: string;
	mainProposerLastName: string;
	mainProposerAffiliation: string;
	mainProposerEmail: string;
	mainProposerPhone: string;
	coProposers: [
		{
			firstName: string;
			lastName: string;
			affiliation: string;
			phone: string;
			email: string;
		}
		];
	needByDate: string;
	lab: string;
	needByDateAttachment: string;
	crystallization: {
		moleculeName: string;
		moleculeIdentifier: string;
		oligomerizationState: string;
		crystalStructureReferencePDF: string;
		crystallizationRequirements: string;
		crystallizationPrecipitantComposition: string;
		previousCrystallizationExperience: string;
		estimatedCrystallizationProductionTime: string;
		typicalCrystalSize: string;
		typicalYieldMgPerLiter: string;
		storageConditions: string;
		stability: string;
		buffer: string;
		levelOfDeuteration: string;
		typicalProteinConcentrationUsed: string;
	};
	biomassDeuteration: {
		organismProvidedByUser: string;
		organismDetails: string;
		organismReferencePDF: string;
		amountNeeded: string;
		stateOfMaterial: string;
		amountOfMaterialMotivation: string;
		deuterationLevelRequired: string;
		deuterationLevelMotivation: string;
	};
	proteinDeuteration: {
		moleculeIdentifier: string;
		weight: string;
		oligomerizationState: string;
		expressionRequirements: string;
		moleculeOrigin: string;
		expressionPlasmidProvidedByUser: string;
		details: string;
		amountNeeded: string;
		amountNeededMotivation: string;
		deuterationLevelRequired: string;
		deuterationLevelMotivation: string;
		needsPurificationSupport: string;
		purificationExperienceReference_PDF: string;
		hasDoneUnlabeledProteinExpression: string;
		hasProteinPurificationExperience: string;
	};
	chemicalDeuteration: {
		moleculeName: string;
		amount: string;
		amountMotivation: string;
		deuterationLocationAndPercentege: string;
		deuterationLevelMotivation: string;
		chemicalStructure: string;
		hasPreviousProductionExperience: string;
	}
}