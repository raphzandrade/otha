import { Injectable } from '@angular/core';

// rxjs
import { BehaviorSubject } from 'rxjs';

// models
import { GoalOption } from '../models';

@Injectable()
export class GoalsService {

  /* Mocking the service so the base structure of the rest of the application
  can be mostly the same after refactoring to access a real API in the future. */

  private readonly mockedGoalOptions: GoalOption[];

  /* I will be using a push based architecure to take advantage of the RXJS 
  and async pipe, one of the strenghts of Angular. */

  public goalOptions$: BehaviorSubject<GoalOption[]>;
  public activeGoalOption$: BehaviorSubject<GoalOption>;

  constructor() {
    /* Initializing the mocks */

    this.mockedGoalOptions = [
      { id: 'build-an-emergency-fund', icon: 'build-an-emergency-fund', name: 'Build an emergency fund', startingValue: 10000, startingPeriod: 24 },
      { id: 'buy-a-car', icon: 'buy-a-car', name: 'Buy a car', startingValue: 10000, startingPeriod: 12 },
      { id: 'buy-a-house', icon: 'buy-a-house', name: 'Buy a house', startingValue: 200000, startingPeriod: 48 },
      { id: 'go-to-college', icon: 'go-to-college', name: 'Go to college', startingValue: 75000, startingPeriod: 12 },
      { id: 'have-a-baby', icon: 'have-a-baby', name: 'Have a baby', startingValue: 20000, startingPeriod: 12 },
      { id: 'take-a-vacation', icon: 'take-a-vacation', name: 'Take a vacation', startingValue: 5000, startingPeriod: 6 },
      { id: 'throw-a-wedding-party', icon: 'throw-a-wedding-party', name: 'Throw a wedding party', startingValue: 5000, startingPeriod: 6 },
    ];

    /* Initialing the behavior subjects which will be used
    to deliver the data to the components. */

    this.goalOptions$ = new BehaviorSubject<GoalOption[]>([]);
    this.activeGoalOption$ = new BehaviorSubject<GoalOption>(null);
  }

  public getGoalOptions(): void {
    this.goalOptions$.next(this.mockedGoalOptions);
  }

  public setActiveGoalOption(option: GoalOption): void {
    this.activeGoalOption$.next(option);
  }
}
