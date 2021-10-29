import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';

// models
import { GoalOption } from '../../models/goal-option.interface';

// services
import { GoalsService } from '../../services/goals.service';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss']
})
export class SelectionPageComponent implements OnInit {

  public readonly goalOptions$: Observable<GoalOption[]>;

  constructor(private goalsService: GoalsService, private router: Router, private route: ActivatedRoute) {
    /* Getting the observable which will be used to updated
    the interface. */
    this.goalOptions$ = this.goalsService.goalOptions$;
  }

  ngOnInit(): void {
    this.goalsService.getGoalOptions();
  }

  public onSimulateClick(option: GoalOption): void {
    this.goalsService.setActiveGoalOption(option);
    this.router.navigate([`../simulation/${option.id}`], { relativeTo: this.route });
  }
}
