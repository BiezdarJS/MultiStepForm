import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BehaviorSubject, Observable} from "rxjs";
import { IMultiStepForm } from '../interfaces/multistep-form.interface';
import { validStepValidator } from '../validators/valid-step.validator';


@Injectable({
  providedIn: 'root'
})
export class MultiStepFormService {

  private _allowNextBtnClick: WritableSignal<boolean> = signal(false);
  public allowNextBtnClick: Signal<boolean> = computed(() => this._allowNextBtnClick());

  private $nextBtnTriggeredSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public $nextBtnTriggered: Observable<any> = this.$nextBtnTriggeredSubject.asObservable();

  private $prevBtnTriggeredSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public $prevBtnTriggered: Observable<any> = this.$prevBtnTriggeredSubject.asObservable();

  private _current: WritableSignal<number> = signal(1);
  public current: Signal<number> = computed(() => this._current());

  public multiStepForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.initializeForm();
    this.initailizeListener();
  }

  private initializeForm(): void {
    this.multiStepForm = this.fb.group({
      nameGroup: this.fb.group({
        first_name: [null, Validators.required],
        last_name: [null, Validators.required],
      }, { validators: validStepValidator() }),
      contactGroup: this.fb.group({
        email: [null, Validators.required],
        phone: [null, Validators.required],
      }),
      birthGroup: this.fb.group({
        date: [null, Validators.required],
        gender: [null, Validators.required],
      }),
      loginInfoGroup: this.fb.group({
        username: [null, Validators.required],
        password: [null, Validators.required],
      })
    })
  }

  private setAllowNextBtnClick(value: boolean): void {
    this._allowNextBtnClick.set(value);
  }

  private initailizeListener(): void {
    this.multiStepForm.controls['nameGroup'].statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.setAllowNextBtnClick(true);
      } else {
        this.setAllowNextBtnClick(false);
      }
    })
  }

  public setCurrent(value: number): void {
    this._current.set(value);
  }

  public notifyOnNextButtonClick(): void {
    this.$nextBtnTriggeredSubject.next(true);
  }
  public notifyOnPrevButtonClick(): void {
    this.$prevBtnTriggeredSubject.next(true);
  }

  public resetNextBtnSubject(): void {
    this.$nextBtnTriggeredSubject.next(false);
  }
  public resetPrevBtnSubject(): void {
    this.$prevBtnTriggeredSubject.next(false);
  }
}
