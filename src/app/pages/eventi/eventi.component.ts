import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { CategoriaEvento } from '../../data/types';

const ETICHETTE_CATEGORIE: Record<CategoriaEvento | 'tutti', string> = {
  tutti: 'Tutti',
  mostra: 'Mostre',
  concerto: 'Concerti',
  conferenza: 'Conferenze',
  presentazione: 'Presentazioni',
  workshop: 'Workshop'
};

@Component({
  selector: 'app-eventi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Prossimi eventi</h1>
        <p>Mostre, concerti, conferenze, presentazioni di libri e workshop — 15 eventi in programma</p>
      </div>
    </section>

    <div class="demo-container">
      <div class="filtri" role="group" aria-label="Filtra per categoria">
        <button
          *ngFor="let cat of categorie"
          class="filtro-btn"
          [class.is-active]="filtroAttivo() === cat"
          (click)="setFiltro(cat)"
          type="button"
        >
          {{ etichette[cat] }}
        </button>
      </div>
    </div>

    <article class="demo-container" *ngIf="eventiFiltrati$ | async as eventi">
      <ul class="eventi-list" *ngIf="eventi.length > 0; else nessunEvento">
        <li *ngFor="let evento of eventi" class="evento-item">
          <div class="evento-item__aside">
            <div class="evento-item__data">
              <span class="data-giorno">{{ getGiorno(evento.dataInizio) }}</span>
              <span class="data-mese">{{ getMese(evento.dataInizio) }}</span>
              <span class="data-anno">{{ getAnno(evento.dataInizio) }}</span>
            </div>
            <span class="evento-item__tipo" [class]="'tipo--' + evento.categoria">
              {{ etichette[evento.categoria] }}
            </span>
          </div>
          <div class="evento-item__body">
            <h2>{{ evento.titolo }}</h2>
            <p class="evento-item__desc">{{ evento.descrizione }}</p>
            <div class="evento-item__footer">
              <span class="evento-item__orario">ore {{ evento.oraInizio }}</span>
              <span class="evento-item__luogo">{{ evento.luogo }}</span>
              <span
                class="evento-item__prezzo"
                [class.gratuito]="evento.prezzo === 0"
              >
                {{ evento.prezzo === 0 ? 'Ingresso gratuito' : (evento.prezzo | currency: 'EUR') }}
              </span>
            </div>
            <p class="evento-item__date-range" *ngIf="evento.dataFine !== evento.dataInizio">
              Dal {{ formatData(evento.dataInizio) }} al {{ formatData(evento.dataFine) }}
            </p>
          </div>
        </li>
      </ul>
      <ng-template #nessunEvento>
        <p class="nessun-risultato">Nessun evento in questa categoria al momento.</p>
      </ng-template>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .filtri {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        padding: 1.5rem 0 0;
      }
      .filtro-btn {
        padding: 0.4rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: 9999px;
        background: #ffffff;
        font-size: 0.85rem;
        cursor: pointer;
        color: var(--color-fg-muted);
        transition: all 0.15s;
      }
      .filtro-btn:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }
      .filtro-btn.is-active {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: #ffffff;
        font-weight: 600;
      }
      .eventi-list {
        list-style: none;
        margin: 2rem 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .evento-item {
        display: flex;
        gap: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        background: #ffffff;
        align-items: flex-start;
      }
      .evento-item__aside {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
        min-width: 60px;
      }
      .evento-item__data {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--color-accent);
        color: #ffffff;
        border-radius: var(--radius-sm);
        padding: 0.5rem;
        min-width: 52px;
        text-align: center;
      }
      .data-giorno {
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
      }
      .data-mese {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .data-anno {
        font-size: 0.7rem;
        opacity: 0.85;
      }
      .evento-item__tipo {
        font-size: 0.68rem;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        white-space: nowrap;
      }
      .tipo--concerto { background: #fef3c7; color: #92400e; }
      .tipo--mostra { background: #dbeafe; color: #1e40af; }
      .tipo--conferenza { background: #d1fae5; color: #065f46; }
      .tipo--presentazione { background: #fce7f3; color: #9d174d; }
      .tipo--workshop { background: #ede9fe; color: #6d28d9; }
      .evento-item__body {
        flex: 1;
        min-width: 0;
      }
      .evento-item__body h2 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
        line-height: 1.4;
      }
      .evento-item__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 1rem;
        line-height: 1.6;
      }
      .evento-item__footer {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
        font-size: 0.85rem;
      }
      .evento-item__orario {
        color: var(--color-fg-muted);
      }
      .evento-item__luogo {
        color: var(--color-fg-muted);
        font-style: italic;
      }
      .evento-item__prezzo {
        font-weight: 700;
        color: var(--color-accent);
      }
      .evento-item__prezzo.gratuito {
        color: var(--color-success);
      }
      .evento-item__date-range {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        margin: 0.5rem 0 0;
        font-style: italic;
      }
      .nessun-risultato {
        text-align: center;
        color: var(--color-fg-muted);
        padding: 3rem 0;
      }
      @media (max-width: 580px) {
        .evento-item {
          flex-direction: column;
          gap: 1rem;
        }
        .evento-item__aside {
          flex-direction: row;
          min-width: auto;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventiComponent {
  private readonly mockData = inject(MockDataService);

  readonly filtroAttivo = signal<CategoriaEvento | 'tutti'>('tutti');

  readonly categorie: (CategoriaEvento | 'tutti')[] = [
    'tutti', 'mostra', 'concerto', 'conferenza', 'presentazione', 'workshop'
  ];

  readonly etichette = ETICHETTE_CATEGORIE;

  readonly eventiFiltrati$ = this.mockData.eventi$.pipe(
    map((data) => {
      const filtro = this.filtroAttivo();
      return filtro === 'tutti'
        ? data.eventi
        : data.eventi.filter((e) => e.categoria === filtro);
    })
  );

  setFiltro(cat: CategoriaEvento | 'tutti'): void {
    this.filtroAttivo.set(cat);
  }

  getGiorno(isoDate: string): string {
    return isoDate.split('-')[2] ?? '';
  }

  getMese(isoDate: string): string {
    const months = [
      'gen', 'feb', 'mar', 'apr', 'mag', 'giu',
      'lug', 'ago', 'set', 'ott', 'nov', 'dic'
    ];
    const idx = parseInt(isoDate.split('-')[1] ?? '1', 10) - 1;
    return months[idx] ?? '';
  }

  getAnno(isoDate: string): string {
    return isoDate.split('-')[0] ?? '';
  }

  formatData(isoDate: string): string {
    const [year, month, day] = isoDate.split('-');
    const months = [
      'gen', 'feb', 'mar', 'apr', 'mag', 'giu',
      'lug', 'ago', 'set', 'ott', 'nov', 'dic'
    ];
    return `${day} ${months[parseInt(month ?? '1', 10) - 1]} ${year}`;
  }
}
