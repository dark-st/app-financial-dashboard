import { Injectable } from '@angular/core';
import { GetDataService } from './get-data.service';
import { map } from 'rxjs/operators';
import { Credit } from 'src/app/credit';
import { Observable } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class SortingService {

  originalData$ = this.getDataService.getCredits()

  filteredCredits$: Observable<Credit[]> | null = this.originalData$;

  constructor(private getDataService: GetDataService, ) { }

  issuanceFilter(f: NgbDate | null, t: NgbDate | null) {

    const startDate: Date= new Date (f!.year, f!.month - 1, f!.day)
    const endDate: Date = new Date (t!.year, t!.month - 1, t!.day)
    
    this.filteredCredits$ = this.originalData$.pipe(
      map((credits: Credit[]) => {
        return credits.filter(credit => {
          const issuanceDate = new Date(credit.issuance_date);
          return issuanceDate >= startDate && issuanceDate <= endDate;
          }
          );
        })
        );
        
        this.filteredCredits$.subscribe((filteredCredits: Credit[]) => {
          console.log(filteredCredits);
        });
}

returnFilter(f: NgbDate | null, t: NgbDate | null) {

  const startDate: Date= new Date (f!.year, f!.month - 1, f!.day)
  const endDate: Date = new Date (t!.year, t!.month - 1, t!.day)

  this.filteredCredits$ = this.originalData$.pipe(
  map((credits: Credit[]) => {
    return credits.filter(credit => {
      const actualReturnDate = new Date(credit.actual_return_date);
      return actualReturnDate >= startDate && actualReturnDate <= endDate;
      }
      );
    })
    );
    
    this.originalData$.subscribe((filteredCredits: Credit[]) => {
      console.log(filteredCredits);
    });
}

overdueFilter() {

  this.filteredCredits$ = this.originalData$.pipe(
  map((credits: Credit[]) => {
    return credits.filter(credit => {
      const returnDate = new Date(credit.return_date)
      const actualReturnDate = new Date(credit.actual_return_date);
      const todayDate = new Date();

      const isOverdueByActualReturn = actualReturnDate > returnDate;
      const isOverdueByReturnDate = returnDate < todayDate && !actualReturnDate;

      return isOverdueByActualReturn || isOverdueByReturnDate
      }
      );
    })
    );
    
    this.originalData$.subscribe((filteredCredits: Credit[]) => {
      console.log(filteredCredits);
    });
}

showRes (i: boolean, r: boolean, f: NgbDate | null = null, t: NgbDate | null = null) {
  console.log(i, r);
  if (i) {
    this.issuanceFilter(f, t)
  }
  if (r) {
    this.returnFilter(f, t)
  }
  if (!i && !r){
    this.overdueFilter()
  }
}

clearFilter() {
  this.filteredCredits$ = this.originalData$;
}

}
