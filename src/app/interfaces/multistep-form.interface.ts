import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface IMultiStepForm {
  nameGroup: FormGroup<MyNameGroup>;
  contactGroup: FormGroup<MyContactGroup>;
  birthGroup: FormGroup<MyBirthGroup>;
  loginInfoGroup: FormGroup<MyLoginInfoGroup>;
}


export interface MyNameGroup {
  first_name: FormControl<string | null>;
  last_name: FormControl<string | null>;
}
export interface MyContactGroup {
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}
export interface MyBirthGroup {
  date: FormControl<Date | null>;
  gender: FormControl<string | null>;
}
export interface MyLoginInfoGroup {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}
