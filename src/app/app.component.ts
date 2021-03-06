import {
  Component,
  OnDestroy,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatStepperModule } from '@angular/material/stepper';

import { TrialsService } from './trials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'trialsapi.github.io';

  // variables dealing with trials and trials results
  trialsForm!: FormGroup;
  combinedTrials = [];
  combinedTrialsAtAge = [];
  combinedTrialsAtSex = [];
  trials: any;
  trialsString!: string;
  trialsArray!: any;
  displayTrialId: any;

  constructor(private fb: FormBuilder, public trialsService: TrialsService) {}

  ngOnInit(): void {
    // initialize main submit form
    this.trialsForm = this.fb.group({
      name: new FormControl('Serge'),
      country: new FormControl('United States'),
      condition: new FormControl('obesity'),
      location: new FormControl('Chicago'),
      miles: new FormControl(''),
      age: new FormControl('33'),
      sex: new FormControl('male'),
      race: new FormControl(''),
      email: new FormControl(''),
    });

    console.log('heyd: ', this.trialsForm.controls['location'].value);

    this.trialsForm.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.trialsService.firstTrialCall(this.trialsForm).subscribe((trials) => {
      console.log('this is the main return: ', trials);
      this.trials = trials;
      console.log(this.trials['StudyFieldsResponse'].StudyFields);
      this.trialsArray = this.trials['StudyFieldsResponse'].StudyFields;
      console.log(
        'hey, this is the important trialsArray we work with:',
        this.trialsArray
      );
      this.trialsString = JSON.stringify(
        this.trials['StudyFieldsResponse'].StudyFields
      );
    });
  }

  trialsButton(form: any) {
    this.trialsService.firstTrialCall(form).subscribe((trials) => {
      console.log('this is the main return: ', trials);
      this.trials = trials;
      console.log(this.trials['StudyFieldsResponse'].StudyFields);
      this.trialsArray = this.trials['StudyFieldsResponse'].StudyFields;
      console.log(
        'hey, this is the important trialsArray we work with:',
        this.trialsArray
      );
      this.trialsString = JSON.stringify(
        this.trials['StudyFieldsResponse'].StudyFields
      );
    });
  }
}
