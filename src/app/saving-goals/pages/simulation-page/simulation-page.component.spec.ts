import { CommonModule, formatCurrency } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// ng-mocks
import { ngMocks } from 'ng-mocks';

// modules
import { CurrencyMaskDirective } from 'ngx-currency';

// models
import { GoalOption } from '../../models';

// services
import { GoalsService } from '../../services/goals.service';
import { GoalsServiceMock } from '../../services/goals.service.mock';

// components
import { SimulationPageComponent } from './simulation-page.component';

describe('SimulationPageComponent', () => {
  let component: SimulationPageComponent;
  let fixture: ComponentFixture<SimulationPageComponent>;

  const mockActiveOption: GoalOption = { id: 'mockId', name: 'mockTitle', icon: 'mockIcon', startingValue: 1000, startingPeriod: 12 };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  describe('With valid activeGoalOption', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [SimulationPageComponent, CurrencyMaskDirective],
        imports: [CommonModule, RouterTestingModule, ReactiveFormsModule],
        providers: [{ provide: GoalsService, useValue: new GoalsServiceMock(mockActiveOption) }]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(SimulationPageComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    /* Initial values and update validation */
    it('Should set initial amount', () => {
      const amountInput = ngMocks.find('.simulation-page__calculator-input-group--input');
      const expectedValue = formatCurrency(mockActiveOption.startingValue, 'en-US', '');

      expect(amountInput.nativeElement.value).toBe(expectedValue)
    });

    it('Should update amount correctly', () => {
      const newValue = Math.random() * 100;
      component.form.get('amount').setValue(newValue);
      fixture.detectChanges();

      const amountInput = ngMocks.find('.simulation-page__calculator-input-group--input');
      const expectedValue = formatCurrency(newValue, 'en-US', '');

      expect(amountInput.nativeElement.value).toBe(expectedValue)
    });

    it('Should set initial reach date', () => {
      const initialReachDateMonth = ngMocks.find('.simulation-page__custom-date-input--paragraph-month').nativeElement.textContent.trim();
      const initialReachDateYear = ngMocks.find('.simulation-page__custom-date-input--paragraph-year').nativeElement.textContent.trim();

      const expectedReachDate = new Date();
      expectedReachDate.setMonth(expectedReachDate.getMonth() + mockActiveOption.startingPeriod);

      const expectedReachDateMonth = `${monthNames[expectedReachDate.getMonth()]}`;
      const expectedReachDateYear = `${expectedReachDate.getFullYear()}`;

      expect(initialReachDateMonth).toBe(expectedReachDateMonth);
      expect(initialReachDateYear).toBe(expectedReachDateYear);
    });

    it('Should update reachDate correctly', () => {
      const expectedReachDate = new Date();
      expectedReachDate.setMonth(expectedReachDate.getMonth() + 4);

      const expectedReachDateMonth = `${monthNames[expectedReachDate.getMonth()]}`;
      const expectedReachDateYear = `${expectedReachDate.getFullYear()}`;

      const newDateValue = `${expectedReachDate.getFullYear()}-${expectedReachDate.getUTCMonth() + 1 < 10 ? 0 : ''}${expectedReachDate.getUTCMonth() + 1}-${expectedReachDate.getDate() < 10 ? 0 : ''}${expectedReachDate.getDate()}`;
      component.form.get('periodEnd').setValue(newDateValue);

      fixture.detectChanges();

      const reachDateMonth = ngMocks.find('.simulation-page__custom-date-input--paragraph-month').nativeElement.textContent.trim();
      const reachDateYear = ngMocks.find('.simulation-page__custom-date-input--paragraph-year').nativeElement.textContent.trim();

      expect(reachDateMonth).toEqual(expectedReachDateMonth);
      expect(reachDateYear).toEqual(expectedReachDateYear);
    });

    it('Should not update reachDate if is less than a month away', () => {
      const closestDate = new Date();
      closestDate.setMonth(closestDate.getMonth() + 1);

      const expectedReachDateMonth = `${monthNames[closestDate.getMonth()]}`;
      const expectedReachDateYear = `${closestDate.getFullYear()}`;

      const newDateValue = `${closestDate.getFullYear()}-${closestDate.getUTCMonth() + 1 < 10 ? 0 : ''}${closestDate.getUTCMonth() + 1}-${closestDate.getDate() < 10 ? 0 : ''}${closestDate.getDate()}`;
      component.form.get('periodEnd').setValue(closestDate);
      component.onMonthNavigation(-1);
      fixture.detectChanges();

      const reachDateMonth = ngMocks.find('.simulation-page__custom-date-input--paragraph-month').nativeElement.textContent.trim();
      const reachDateYear = ngMocks.find('.simulation-page__custom-date-input--paragraph-year').nativeElement.textContent.trim();

      expect(reachDateMonth).toEqual(expectedReachDateMonth);
      expect(reachDateYear).toEqual(expectedReachDateYear);
    });

    /* Custom date input validation */
    it("Should update reach date keyboard events (increase)", () => {
      const dateCustomInput = ngMocks.find('.simulation-page__custom-date-input');

      const expectedReachDate = new Date();
      expectedReachDate.setMonth(expectedReachDate.getMonth() + 1);

      const expectedReachDateMonth = monthNames[expectedReachDate.getMonth()];

      const event = new KeyboardEvent("keydown", {
        "key": "ArrowRight"
      });

      dateCustomInput.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      const reachDateMonth = ngMocks.find('.simulation-page__custom-date-input--paragraph-month').nativeElement.textContent.trim();

      expect(reachDateMonth).toBe(expectedReachDateMonth);
    });

    it("Should update reach date keyboard events (decrease)", () => {
      const dateCustomInput = ngMocks.find('.simulation-page__custom-date-input');

      const expectedReachDate = new Date();
      expectedReachDate.setMonth(expectedReachDate.getMonth() - 1);

      const expectedReachDateMonth = monthNames[expectedReachDate.getMonth()];

      const event = new KeyboardEvent("keydown", {
        "key": "ArrowLeft"
      });

      dateCustomInput.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      const reachDateMonth = ngMocks.find('.simulation-page__custom-date-input--paragraph-month').nativeElement.textContent.trim();

      expect(reachDateMonth).toBe(expectedReachDateMonth);
    });

    /* Result validation */
    it("Should set initial monthly amount accordingly", () => {
      const expectedAmount = formatCurrency(mockActiveOption.startingValue / mockActiveOption.startingPeriod, 'en-US', '$ ');

      const initialAmount = ngMocks.find('.simulation-page__calculator-result-amount--heading').nativeElement.textContent.trim();

      expect(initialAmount).toBe(expectedAmount);
    });

    /* Caption validation */
    it('Should initialize the caption correctly', () => {
      const caption = ngMocks.find('.simulation-page__calculator-result-caption').nativeElement.textContent.trim();


      const expectedCaption = `You're planning ${component.periodDuration + ' monthly deposits'} to reach your ${component.amount} goal by ${component.reachDateMonth + ' ' + component.reachDateYear}.`

      expect(caption).toEqual(expectedCaption);
    });

    it('Should keep caption updated after month update (increase / keyboard)', () => {
      const event = new KeyboardEvent("keyup", {
        "key": "ArrowRight"
      });

      window.dispatchEvent(event);
      fixture.detectChanges();

      const caption = ngMocks.find('.simulation-page__calculator-result-caption').nativeElement.textContent.trim();

      const expectedCaption = `You're planning ${component.periodDuration + ' monthly deposits'} to reach your ${component.amount} goal by ${component.reachDateMonth + ' ' + component.reachDateYear}.`

      expect(caption).toEqual(expectedCaption);
    });

    it('Should keep caption updated after month update (decrease / keyboard)', () => {
      const event = new KeyboardEvent("keyup", {
        "key": "ArrowLeft"
      });

      window.dispatchEvent(event);
      fixture.detectChanges();

      const caption = ngMocks.find('.simulation-page__calculator-result-caption').nativeElement.textContent.trim();

      const expectedCaption = `You're planning ${component.periodDuration + ' monthly deposits'} to reach your ${component.amount} goal by ${component.reachDateMonth + ' ' + component.reachDateYear}.`

      expect(caption).toEqual(expectedCaption);
    });

    it('Should keep caption updated after month update (increase / button)', () => {
      const increaseButton = ngMocks.find('.simulation-page__custom-date-input--arrow-right');
      increaseButton.nativeElement.click();
      fixture.detectChanges();

      const caption = ngMocks.find('.simulation-page__calculator-result-caption').nativeElement.textContent.trim();

      const expectedCaption = `You're planning ${component.periodDuration + ' monthly deposits'} to reach your ${component.amount} goal by ${component.reachDateMonth + ' ' + component.reachDateYear}.`

      expect(caption).toEqual(expectedCaption);
    });

    it('Should keep caption updated after month update (decrease / button)', () => {
      const increaseButton = ngMocks.find('.simulation-page__custom-date-input--arrow-left');
      increaseButton.nativeElement.click();
      fixture.detectChanges();

      const caption = ngMocks.find('.simulation-page__calculator-result-caption').nativeElement.textContent.trim();

      const expectedCaption = `You're planning ${component.periodDuration + ' monthly deposits'} to reach your ${component.amount} goal by ${component.reachDateMonth + ' ' + component.reachDateYear}.`

      expect(caption).toEqual(expectedCaption);
    });
  });

  describe('Without valid activeGoalOption', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [SimulationPageComponent, CurrencyMaskDirective],
        imports: [CommonModule, RouterTestingModule, ReactiveFormsModule],
        providers: [{ provide: GoalsService, useValue: new GoalsServiceMock(null) }]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(SimulationPageComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {

      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should navigate back on init', () => {
      const router = TestBed.inject(Router);
      const activatedRoute = TestBed.inject(ActivatedRoute);
      
      const routerSpy = spyOn(router, 'navigate');

      fixture.detectChanges();
      expect(routerSpy).toHaveBeenCalledOnceWith([`../`], { relativeTo: activatedRoute })

    });
  })

});
