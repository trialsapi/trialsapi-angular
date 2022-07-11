import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/index';

@Injectable({
  providedIn: 'root',
})
export class TrialsService {
  trialUrl!: string;

  constructor(private http: HttpClient) {}

  firstTrialCall(form: any) {
    console.log(form.value.condition);
    this.trialUrl = `https://clinicaltrials.gov/api/query/study_fields?expr=${form.value.condition}
    +AND+(AREA[Gender]All+OR+AREA[Gender]
      ${form.value.sex})+AND+AREA[MinimumAge]RANGE[MIN,
        ${form.value.age}+year]+AND+AREA[MaximumAge]RANGE[
          ${form.value.age}+year,MAX]+AND+
  SEARCH[Location]
  (AREA[LocationCountry]United+States
  +AND+
  AREA[LocationStatus]Recruiting
  +AND+
  (
  AREA[LocationCity]${form.value.location})
)&fields=NCTId,Condition,OrgFullName,BriefTitle,BriefSummary,MinimumAge,MaximumAge,LocationZip,
    LocationCity,LocationCountry,Gender,GenderDescription,GenderBased,HealthyVolunteers,CentralContactName,CentralContactEMail,
    CentralContactPhone,CentralContactPhoneExt,CentralContactRole,EligibilityCriteria&min_rnk=1&max_rnk=1000&fmt=json`;

    return this.http.get(this.trialUrl);
  }
}
