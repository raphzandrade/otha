import { TestBed } from '@angular/core/testing';
import { isObservable } from 'rxjs';
import { GoalOption } from '../models';

import { GoalsService } from './goals.service';

describe('GoalsService', () => {
  let service: GoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalsService]
    });
    service = TestBed.inject(GoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have goalOptions$ observable', () => {
    expect(service.activeGoalOption$).toBeDefined();
    expect(isObservable<GoalOption[]>(service.goalOptions$)).toBe(true);
  });

  it('should have activeGoalOption$ observable', () => {
    expect(service.activeGoalOption$).toBeDefined();
    expect(isObservable<GoalOption>(service.activeGoalOption$)).toBe(true);
  });

  it('Should have setActiveGoalOption function', () => {
    /* No point in developing this test further since 
    it's only a placeholder for now. */
    const nextSpy = spyOn(service.goalOptions$, 'next');
    
    service.getGoalOptions();

    expect(nextSpy).toHaveBeenCalledTimes(1);
  });

  it('Should have setActiveGoalOption function', () => {
    const mockOption: GoalOption = { id: 'mockId', name: 'mockTitle', icon: 'mockIcon', startingValue: 100, startingPeriod: 100 };

    const nextSpy = spyOn(service.activeGoalOption$, 'next');
    
    service.setActiveGoalOption(mockOption);

    expect(nextSpy).toHaveBeenCalledOnceWith(mockOption);
  });
});
