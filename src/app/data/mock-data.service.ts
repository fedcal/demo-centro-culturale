import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type { InfoAttivita, EventiData, CorsiData, TeamData, FaqData } from './types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache stream con shareReplay per evitare richieste duplicate
  readonly info$: Observable<InfoAttivita> = this.http
    .get<InfoAttivita>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly eventi$: Observable<EventiData> = this.http
    .get<EventiData>('/assets/mock/eventi.json')
    .pipe(shareReplay(1));

  readonly corsi$: Observable<CorsiData> = this.http
    .get<CorsiData>('/assets/mock/corsi.json')
    .pipe(shareReplay(1));

  readonly team$: Observable<TeamData> = this.http
    .get<TeamData>('/assets/mock/team.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<FaqData> = this.http
    .get<FaqData>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
