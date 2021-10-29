import { formatCurrency } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'

// models
import { GoalOption } from '../../models';

// services
import { GoalsService } from '../../services/goals.service';

@Component({
  selector: 'app-simulation-page',
  templateUrl: './simulation-page.component.html',
  styleUrls: ['./simulation-page.component.scss']
})
export class SimulationPageComponent implements OnInit {

  public readonly activeGoalOption$: Observable<GoalOption | null>;

  public minDate: string;
  public monthlyAmount: string;
  public periodDuration: number;
  public amount: string;
  public reachDateMonth: string;
  public reachDateYear: string;

  public form: FormGroup;

  constructor(private goalsService: GoalsService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.activeGoalOption$ = goalsService.activeGoalOption$;

    this.form = this.formBuilder.group({
      amount: [0, Validators.compose([Validators.required])],
      reachDate: ['', Validators.required]
    });

    this.monthlyAmount = '';
  }

  ngOnInit(): void {
    /* Bind to update everything when something in the form changes */
    this.form.valueChanges.subscribe((value: { amount: number, reachDate: string }) => {
      this.amount = this.formatAmount(value.amount);
      this.monthlyAmount = this.calculateMonthlyAmount(value.amount, value.reachDate);
    })


    /* Check if there's an active option set, if not, returns 
    to selection page.

    Also sets the initial form values based on the option parameters. 
     */
    this.activeGoalOption$.pipe(take(1)).subscribe(option => {
      if (!option) {
        this.return();

        return;
      }

      this.form.get('amount').setValue(option.startingValue);

      this.minDate = this.calculateMinDate(option.startingPeriod);
      this.form.get('reachDate').setValue(this.minDate);
    });
  }

  public keyboardHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case ('ArrowLeft'):
        /* Left Arrow */
        event.preventDefault();
        this.onMonthNavigation(-1);
        break;
      case ('ArrowRight'):
        /* Right Arrow*/
        event.preventDefault();
        this.onMonthNavigation(1);
        break
    }
  }

  public onMonthNavigation(value: number): void {
    const today = new Date();
    const reachDate = new Date(this.form.get("reachDate").value);
    const nextMonth = reachDate.getMonth() + value;
    reachDate.setMonth(reachDate.getMonth() + value);

    if (reachDate.getMonth() <= today.getMonth() && reachDate.getFullYear() <= today.getFullYear()) {
      return;
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.reachDateMonth = `${monthNames[reachDate.getMonth()]}`;
    this.reachDateYear = ` ${reachDate.getFullYear()}`;
    
    this.form.get("reachDate").setValue(`${reachDate.getFullYear()}-${reachDate.getMonth() + 1 < 10 ? 0 : ''}${reachDate.getMonth() + 1}-${reachDate.getDate() < 10 ? 0 : ''}${reachDate.getDate()}`);
  }

  private calculateMonthlyAmount(amount: number, reachDate: string): string {
    const periodDuration = this.getPeriodDuration(reachDate);

    const result = amount / periodDuration;

    return this.formatAmount(result);
  }

  private formatAmount(amount: number): string {
    return formatCurrency(amount, 'en-US', '$ ');
  }

  private getPeriodDuration(date: string): number {
    const reachDate = new Date(date);
    const today = new Date();

    let months: number;
    months = (reachDate.getFullYear() - today.getFullYear()) * 12;
    months -= today.getMonth();
    months += reachDate.getMonth();

    const result = months <= 0 ? 0 : months;

    this.periodDuration = result;

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.reachDateMonth = `${monthNames[reachDate.getMonth()]}`;
    this.reachDateYear = `${reachDate.getFullYear()}`;


    return result;
  }

  private calculateMinDate(months: number): string {
    const startingreachDate = new Date();
    startingreachDate.setMonth(startingreachDate.getMonth() + months);

    const result = `${startingreachDate.getFullYear()}-${startingreachDate.getUTCMonth() + 1 < 10 ? 0 : ''}${startingreachDate.getUTCMonth() + 1}-${startingreachDate.getDate() < 10 ? 0 : ''}${startingreachDate.getDate()}`;

    return result;
  }

  private return(): void {
    this.router.navigate([`../`], { relativeTo: this.route });
  }
}