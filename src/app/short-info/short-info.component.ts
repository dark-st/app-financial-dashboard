import { Component, OnInit  } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Observable } from 'rxjs';
import { Credit } from '../credit';
import { map } from 'rxjs/operators';
import { StatisticsItem } from './statistics-item';



@Component({
  selector: 'app-short-info',
  templateUrl: './short-info.component.html',
  styleUrls: ['./short-info.component.scss']
})
export class ShortInfoComponent implements OnInit{
  credits$: Observable<Credit[]> = this.getDataService.getCredits()
  statisticsData$!: Observable<StatisticsItem[]>;

  constructor(private getDataService: GetDataService) {
    
  }
  ngOnInit(): void {
    this.statisticsData$ = this.credits$.pipe(
      map(credits => {
        return this.calculateStatistics(credits);
      })
    );
  }

  toDate (str: string) {
    return new Date(str)
  }

  calculateStatistics(credits: Credit[]): StatisticsItem[] { 
    const statistics: StatisticsItem[] = [];
    
    const groupedByMonth = new Map<string, {totalCredits: number, totalAmount: number, totalPercent: number, totalReturned: number}>();
    
    for (const credit of credits) {
      const monthYearKey = `${this.toDate(credit.issuance_date).getFullYear()}-${this.toDate(credit.issuance_date).getMonth()}`;
      const creditAmount = credit.body;
      const creditPercent = credit.percent;
      let returned
      if (credit.actual_return_date !== null) {returned = 1} else {returned = 0}
      if (!groupedByMonth.has(monthYearKey)) {
        groupedByMonth.set(monthYearKey, {totalCredits: 1, totalAmount: creditAmount, totalPercent: creditPercent, totalReturned: returned});
      } else {
        const existingData = groupedByMonth.get(monthYearKey);
        existingData!.totalCredits += 1;
        existingData!.totalAmount += creditAmount;
        existingData!.totalReturned += returned
        // groupedByMonth.get(monthYearKey)!.push(credit.id);
      }
    }
    

    groupedByMonth.forEach((data, monthYearKey) => {
      const [year, month] = monthYearKey.split('-');
      const averageAmount = data.totalAmount / data.totalCredits
      statistics.push({
        month: `${+month + 1}/${year}`,
        totalCredits: data.totalCredits,
        averageAmount: averageAmount,
        totalAmount: data.totalAmount,
        totalPercent: data.totalPercent,
        totalReturned: data.totalReturned,
      });
    });
    console.log(statistics);
    return statistics;
  }
}


