import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/index';

@Injectable({
  providedIn: 'root',
})
export class TrialsService {
  constructor(private http: HttpClient) {}

  firstTrialCall() {
    return this.http.get(
      `https://clinicaltrials.gov/api/query/study_fields?expr=obesity
    +AND+(AREA[Gender]All+OR+AREA[Gender]
      male)+AND+AREA[MinimumAge]RANGE[MIN,
      33+year]+AND+AREA[MaximumAge]RANGE[
      33+year,MAX]+AND+
  SEARCH[Location]
  (AREA[LocationCountry]United+States
  +AND+
  AREA[LocationStatus]Recruiting
  +AND+
  (
  AREA[LocationCity]Chicago)
)&fields=NCTId,Condition,OrgFullName,BriefTitle,BriefSummary,MinimumAge,MaximumAge,LocationZip,
    LocationCity,LocationCountry,Gender,GenderDescription,GenderBased,HealthyVolunteers,CentralContactName,CentralContactEMail,
    CentralContactPhone,CentralContactPhoneExt,CentralContactRole,EligibilityCriteria&min_rnk=1&max_rnk=1000&fmt=json`
    );
  }
}
