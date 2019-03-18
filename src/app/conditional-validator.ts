import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
	selector: '[requiredIf]',
	providers: [
		{provide: NG_VALIDATORS, useExisting: ConditionalValidator, multi: true}
	]
})
export class ConditionalValidator implements Validator {
	@Input("requiredIf")
	requiredIf: boolean;

	validate(abstractControl: AbstractControl) {

		let value = abstractControl.value;
		if((value == null || value == undefined || value == "") && this.requiredIf) {
			return {
				requiredIf: {condition: this.requiredIf}
			};
		}
		return null;
	}

}