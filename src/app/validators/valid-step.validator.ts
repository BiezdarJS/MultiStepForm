import { FormGroup, ValidationErrors } from "@angular/forms";


export function validStepValidator(): ValidationErrors {
  return (cc: FormGroup): ValidationErrors | null => {
    if(cc.valid) {
      return null;
    } else {
      return {something: 'someError'};
    }
  };
 }
