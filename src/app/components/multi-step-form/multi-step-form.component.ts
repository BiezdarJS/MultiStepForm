import {Component, computed, ElementRef, inject, QueryList, signal, Signal, ViewChild, ViewChildren, WritableSignal} from '@angular/core';
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";
import {MultiStepFormService} from "../../services/multi-step-form.service";
import {NextSlideAmoutEnumEnum} from "../../enums/nextSlideAmoutEnum.enum";
import {PrevSlideAmoutEnumEnum} from "../../enums/prevSlideAmoutEnum.enum";
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [ProgressBarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss'
})
export class MultiStepFormComponent {
  @ViewChild('slidePage') slidePage: ElementRef;
  protected readonly NextSlideAmoutEnumEnum = NextSlideAmoutEnumEnum;
  protected readonly PrevSlideAmoutEnumEnum = PrevSlideAmoutEnumEnum;

  public allowNextBtnClick: Signal<boolean> = computed(() => this.multiStepFormService.allowNextBtnClick());

  public showValidationMessage: WritableSignal<boolean> = signal(false);

  multiStepFormService: MultiStepFormService = inject(MultiStepFormService);

  public handleNextBtnClick(slideAmount: NextSlideAmoutEnumEnum): void {
    if (!this.allowNextBtnClick()) {
      this.showValidationMessage.set(true);
      return;
    }
    this.slidePage.nativeElement.style.marginLeft = "-" + slideAmount;
    this.multiStepFormService.notifyOnNextButtonClick();
  }

  public handlePrevBtnClick(slideAmount: PrevSlideAmoutEnumEnum): void {
    this.slidePage.nativeElement.style.marginLeft = "-" + slideAmount;
    this.multiStepFormService.notifyOnPrevButtonClick();
  }

  public onSubmit() {
    console.log(this.multiStepFormService.multiStepForm);
  }

  protected get nameGroup() {
    return this.multiStepFormService.multiStepForm.controls['nameGroup'] as FormGroup;
  }

  protected get contactGroup() {
    return this.multiStepFormService.multiStepForm.controls['contactGroup'] as FormGroup;
  }

  protected get birthGroup() {
    return this.multiStepFormService.multiStepForm.controls['birthGroup'] as FormGroup;
  }

  protected get loginInfoGroup() {
    return this.multiStepFormService.multiStepForm.controls['loginInfoGroup'] as FormGroup;
  }
}
