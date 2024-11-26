import { ElementRef } from "@angular/core";
import { DisplayMessage, GenericValidator, ValidationMessages } from "./form-validation/generic.validator";
import { FormGroup } from "@angular/forms";
import { fromEvent, merge, Observable } from "rxjs";

export abstract class FormBaseComponent {

    displayMessage: DisplayMessage = {};
    genericValidator!: GenericValidator;
    validationMessages!: ValidationMessages;

    mudancasNaoSalvas!: boolean;

    protected messageSettingsValidatorBase(validationMessages: ValidationMessages) {
        this.genericValidator = new GenericValidator(validationMessages);
    }

    protected validationSettingsFormBase(formInputElements: ElementRef[],formGroup: FormGroup) {

        let controlBlurs: Observable<any>[] = formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(() => {
            this.formValidation(formGroup)
        });
    }

    protected formValidation(formGroup: FormGroup) {
        this.displayMessage = this.genericValidator.processMesages(formGroup);
        this.mudancasNaoSalvas = true;
    }
}