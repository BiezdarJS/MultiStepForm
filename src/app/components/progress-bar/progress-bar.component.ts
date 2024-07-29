import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  QueryList,
  Signal,
  ViewChildren
} from '@angular/core';
import {MultiStepFormService} from "../../services/multi-step-form.service";
import {Subject, take, takeUntil} from "rxjs";

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements AfterViewInit {
  @ViewChildren('bullet') bulletList: QueryList<ElementRef>;
  @ViewChildren('progressText') progressTextList: QueryList<ElementRef>;
  @ViewChildren('progressCheck') progressCheckList: QueryList<ElementRef>;

  @Input() nextButtonTriggered: boolean;

  /** Subject do kontroli subskrypcji. */
  private readonly destroy$: Subject<void> = new Subject<void>();

  multiStepFormService = inject(MultiStepFormService);
  private current: Signal<any> = computed(() => this.multiStepFormService.current());

  ngAfterViewInit(): void {
    this.multiStepFormService.$nextBtnTriggered
      .pipe(takeUntil(this.destroy$))
      .subscribe((data): void => {
        if (data) {
          this.bulletList.toArray()[this.current() - 1].nativeElement.classList.add("active");
          this.progressCheckList.toArray()[this.current() - 1].nativeElement.classList.add("active");
          this.progressTextList.toArray()[this.current() - 1].nativeElement.classList.add("active");
          this.multiStepFormService.setCurrent(this.current() + 1);
          this.multiStepFormService.resetNextBtnSubject();
        }
    });
    this.multiStepFormService.$prevBtnTriggered
      .pipe(takeUntil(this.destroy$))
      .subscribe((data): void => {
        if (data) {
          this.bulletList.toArray()[this.current() - 2].nativeElement.classList.remove("active");
          this.progressCheckList.toArray()[this.current() - 2].nativeElement.classList.remove("active");
          this.progressTextList.toArray()[this.current() - 2].nativeElement.classList.remove("active");
          this.multiStepFormService.setCurrent(this.current() - 1);
          this.multiStepFormService.resetPrevBtnSubject();
        }
      });
  }
}
