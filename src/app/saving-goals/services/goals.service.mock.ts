// rxjs
import { BehaviorSubject } from "rxjs";

// models
import { GoalOption } from "../models";

export const goalOptionsMock =
    [
        { id: 'build-an-emergency-fund', icon: 'build-an-emergency-fund', name: 'Build an emergency fund', startingValue: 1000, startingPeriod: 12 },
        { id: 'buy-a-car', icon: 'buy-a-car', name: 'Buy a car', startingValue: 0, startingPeriod: 0 },
    ];

export class GoalsServiceMock {
    public goalOptions$: BehaviorSubject<GoalOption[]>;
    public activeGoalOption$: BehaviorSubject<GoalOption>;

    constructor(private mockActiveGoal?: GoalOption) {
        this.goalOptions$ = new BehaviorSubject<GoalOption[]>([]);
        this.activeGoalOption$ = new BehaviorSubject<GoalOption>(mockActiveGoal ?? null);
    }

    public getGoalOptions(): void {
        this.goalOptions$.next(goalOptionsMock);
    }

    public setActiveGoalOption(option: GoalOption): void {
        this.activeGoalOption$.next(option);
    }
}