import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// rxjs
import { isObservable } from 'rxjs';

// models
import { GoalOption } from '../../models';

// services
import { GoalsService } from '../../services/goals.service';
import { goalOptionsMock, GoalsServiceMock } from '../../services/goals.service.mock';

// components
import { SelectionPageComponent } from './selection-page.component';

describe('SelectionPageComponent', () => {
  let component: SelectionPageComponent;
  let fixture: ComponentFixture<SelectionPageComponent>;
  let goalsService: GoalsService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectionPageComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: GoalsService, useValue: new GoalsServiceMock(null) }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionPageComponent);
    component = fixture.componentInstance;

    goalsService = TestBed.inject(GoalsService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Component Instance
  it('Should have onSimulateClick function', () => {
    const mockOption: GoalOption = { id: 'mockId', name: 'mockTitle', icon: 'mockIcon', startingValue: 100, startingPeriod: 100 };

    const serviceSpy = spyOn(goalsService, 'setActiveGoalOption');
    const routerSpy = spyOn(router, 'navigate');

    component.onSimulateClick(mockOption);

    expect(serviceSpy).toHaveBeenCalledOnceWith(mockOption);
    expect(routerSpy).toHaveBeenCalledOnceWith([`../simulation/${mockOption.id}`], { relativeTo: activatedRoute });
  });

  it('Should call getGoalOptions onInit', () => {
    const serviceSpy = spyOn(goalsService, 'getGoalOptions');

    component.ngOnInit();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('Should have goalOptions$ observable', () => {
    expect(component.goalOptions$).toBeDefined();
    expect(isObservable<GoalOption[]>(component.goalOptions$)).toBe(true);
  });

  // Template 
  it('Should render the options correctly', () => {
    const options = fixture.debugElement.queryAll(By.css('.selection-page__goal-option'));

    expect(options.length).toEqual(goalOptionsMock.length);
  });
});
