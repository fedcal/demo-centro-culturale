import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { CategoriaCorso } from '../../data/types';

const ETICHETTE_CATEGORIE: Record<CategoriaCorso | 'tutti', string> = {
  tutti: 'Tutti i corsi',
  arte: 'Arte e Pittura',
  scrittura: 'Scrittura',
  lingue: 'Lingue',
  musica: 'Musica',
  ceramica: 'Ceramica'
};

@Component({
  selector: 'app-corsi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Corsi e laboratori</h1>
        <p>12 corsi annuali di pittura, acquerello, ceramica, scrittura, lingue e musica. Soci: sconto 20%.</p>
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

    <article class="demo-container" *ngIf="corsiFiltrati$ | async as corsi">
      <ul class="corsi-grid">
        <li *ngFor="let corso of corsi" class="corso-card">
          <div class="corso-card__header">
            <span class="corso-cat" [class]="'cat--' + corso.categoria">
              {{ etichette[corso.categoria] }}
            </span>
            <span class="corso-materiale" *ngIf="corso.materialeIncluso">Materiale incluso</span>
          </div>
          <h2>{{ corso.titolo }}</h2>
          <p class="corso-desc">{{ corso.descrizione }}</p>
          <dl class="corso-meta">
            <dt>Docente</dt><dd>{{ corso.docente }}</dd>
            <dt>Livello</dt><dd>{{ corso.livello }}</dd>
            <dt>Orario</dt><dd>{{ corso.giorno }}, {{ corso.ora }}</dd>
            <dt>Durata</dt><dd>{{ corso.durata }}</dd>
            <dt>Posti</dt><dd>Max {{ corso.maxPartecipanti }} partecipanti</dd>
          </dl>
          <div class="corso-prezzi">
            <div class="prezzo-block">
              <span class="prezzo-label">Prezzo mensile</span>
              <span class="prezzo-value">{{ corso.prezzoMensile | currency: 'EUR' }}</span>
            </div>
            <div class="prezzo-block prezzo-socio">
              <span class="prezzo-label">Soci (–20%)</span>
              <span class="prezzo-value">{{ corso.prezzoSocio | currency: 'EUR' }}</span>
            </div>
          </div>
          <a routerLink="/contatti" class="btn-iscriviti">Iscriviti a questo corso</a>
        </li>
      </ul>
    </article>

    <section class="tessera-cta">
      <div class="demo-container">
        <h2>Risparmia con la tessera soci</h2>
        <p>La tessera soci a €30/anno ti garantisce il 20% di sconto su tutti i corsi. Con 2 mesi di corsi l'hai già ammortizzata.</p>
        <a routerLink="/contatti" class="btn btn-primary">Diventa socio — €30/anno</a>
      </div>
    </section>
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
      .corsi-grid {
        list-style: none;
        margin: 2rem 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.25rem;
      }
      .corso-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .corso-card__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .corso-cat {
        font-size: 0.72rem;
        padding: 0.2rem 0.55rem;
        border-radius: 9999px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .cat--arte { background: #dbeafe; color: #1e40af; }
      .cat--scrittura { background: #fce7f3; color: #9d174d; }
      .cat--lingue { background: #d1fae5; color: #065f46; }
      .cat--musica { background: #fef3c7; color: #92400e; }
      .cat--ceramica { background: #ede9fe; color: #6d28d9; }
      .corso-materiale {
        font-size: 0.72rem;
        padding: 0.2rem 0.55rem;
        background: #d1fae5;
        color: #065f46;
        border-radius: 9999px;
        font-weight: 600;
      }
      .corso-card h2 {
        margin: 0;
        font-size: 1.05rem;
        line-height: 1.4;
      }
      .corso-desc {
        color: var(--color-fg-muted);
        font-size: 0.88rem;
        margin: 0;
        line-height: 1.6;
      }
      .corso-meta {
        margin: 0;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.3rem 0.75rem;
        font-size: 0.85rem;
      }
      .corso-meta dt {
        color: var(--color-fg-muted);
        font-weight: 600;
      }
      .corso-meta dd {
        margin: 0;
      }
      .corso-prezzi {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        padding: 0.75rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-sm);
        margin-top: auto;
      }
      .prezzo-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0.15rem;
      }
      .prezzo-label {
        font-size: 0.72rem;
        color: var(--color-fg-muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .prezzo-value {
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--color-fg-default);
      }
      .prezzo-socio .prezzo-value {
        color: var(--color-accent);
      }
      .btn-iscriviti {
        display: block;
        text-align: center;
        padding: 0.6rem 1rem;
        background: var(--color-accent);
        color: #ffffff;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        transition: background 0.15s;
      }
      .btn-iscriviti:hover {
        background: #6d28d9;
        text-decoration: none;
      }
      .tessera-cta {
        padding: 4rem 1rem;
        background: #f5f3ff;
        border-top: 1px solid #ddd6fe;
        text-align: center;
      }
      .tessera-cta h2 {
        margin: 0 0 0.75rem;
      }
      .tessera-cta p {
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #6d28d9;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorsiComponent {
  private readonly mockData = inject(MockDataService);

  readonly filtroAttivo = signal<CategoriaCorso | 'tutti'>('tutti');

  readonly categorie: (CategoriaCorso | 'tutti')[] = [
    'tutti', 'arte', 'scrittura', 'lingue', 'musica', 'ceramica'
  ];

  readonly etichette = ETICHETTE_CATEGORIE;

  readonly corsiFiltrati$ = this.mockData.corsi$.pipe(
    map((data) => {
      const filtro = this.filtroAttivo();
      return filtro === 'tutti'
        ? data.corsi
        : data.corsi.filter((c) => c.categoria === filtro);
    })
  );

  setFiltro(cat: CategoriaCorso | 'tutti'): void {
    this.filtroAttivo.set(cat);
  }
}
