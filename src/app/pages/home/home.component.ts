import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Cultura, arte e comunità a Trieste</h1>
        <p class="hero-tagline">
          Eventi, biblioteca, corsi di pittura, scrittura, lingue, musica e ceramica.<br />
          Casa della Cultura Mediterranea — nel cuore di Trieste dal 1978.
        </p>
        <div class="hero-actions">
          <a routerLink="/eventi" class="btn btn-primary">Prossimi eventi</a>
          <a routerLink="/corsi" class="btn btn-secondary">Scopri i corsi</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Cosa offriamo</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🎨</span>
          <h3>Corsi e laboratori</h3>
          <p>12 corsi annuali di pittura, ceramica, scrittura, musica e lingue con docenti professionisti.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🎵</span>
          <h3>Concerti ed eventi</h3>
          <p>Mostre, concerti, conferenze e presentazioni di libri ogni mese. Ingresso spesso gratuito.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📚</span>
          <h3>Biblioteca 5.000 volumi</h3>
          <p>Fondo specializzato in culture mediterranee, storia locale e letteratura contemporanea. Prestito gratuito per i soci.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🤝</span>
          <h3>Tessera soci €30/anno</h3>
          <p>Sconti del 20% sui corsi, biglietti eventi ridotti, accesso biblioteca e newsletter mensile.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="eventiInEvidenza$ | async as eventi">
      <div class="section-header">
        <h2>Prossimi eventi in evidenza</h2>
        <a routerLink="/eventi" class="link-more">Tutti gli eventi →</a>
      </div>
      <ul class="event-grid">
        <li *ngFor="let evento of eventi" class="event-card">
          <div class="event-card__meta">
            <span class="event-card__tipo" [class]="'tipo--' + evento.categoria">{{ evento.tipo }}</span>
            <span class="event-card__data">{{ formatData(evento.dataInizio) }}</span>
          </div>
          <h3>{{ evento.titolo }}</h3>
          <p class="event-card__desc">{{ evento.descrizione }}</p>
          <div class="event-card__footer">
            <span class="event-card__luogo">{{ evento.luogo }}</span>
            <span class="event-card__prezzo">
              {{ evento.prezzo === 0 ? 'Ingresso gratuito' : (evento.prezzo | currency: 'EUR') }}
            </span>
          </div>
        </li>
      </ul>
    </section>

    <section class="spazi-band demo-container" *ngIf="spazi$ | async as spazi">
      <h2>I nostri spazi</h2>
      <ul class="spazi-grid">
        <li *ngFor="let spazio of spazi" class="spazio-card">
          <h3>{{ spazio.nome }}</h3>
          <p class="spazio-card__cap">Capienza: {{ spazio.capienza }} persone</p>
          <p class="spazio-card__desc">{{ spazio.descrizione }}</p>
          <span *ngIf="spazio.prenotabile" class="badge-prenotabile">Prenotabile</span>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Diventa socio — €30/anno</h2>
        <p>Accedi a sconti su corsi ed eventi, prestito libri in biblioteca e molto altro. Più di 340 soci attivi.</p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Iscriviti ora</a>
          <a routerLink="/eventi" class="btn btn-secondary">Vedi gli eventi</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #f5f3ff 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        line-height: 1.7;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #6d28d9;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .featured {
        padding: 4rem 1rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .event-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.25rem;
      }
      .event-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .event-card__meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
      }
      .event-card__tipo {
        font-size: 0.72rem;
        padding: 0.2rem 0.55rem;
        border-radius: 9999px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        background: #ede9fe;
        color: var(--color-accent);
      }
      .tipo--concerto { background: #fef3c7; color: #92400e; }
      .tipo--mostra { background: #dbeafe; color: #1e40af; }
      .tipo--conferenza { background: #d1fae5; color: #065f46; }
      .tipo--presentazione { background: #fce7f3; color: #9d174d; }
      .tipo--workshop { background: #ede9fe; color: #6d28d9; }
      .event-card__data {
        font-size: 0.82rem;
        color: var(--color-fg-muted);
      }
      .event-card h3 {
        margin: 0;
        font-size: 1.05rem;
        line-height: 1.4;
      }
      .event-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.88rem;
        margin: 0;
        flex: 1;
      }
      .event-card__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        padding-top: 0.75rem;
        border-top: 1px solid var(--color-border);
        font-size: 0.82rem;
      }
      .event-card__luogo {
        color: var(--color-fg-muted);
      }
      .event-card__prezzo {
        font-weight: 700;
        color: var(--color-accent);
      }
      .spazi-band {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }
      .spazi-band h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .spazi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.25rem;
      }
      .spazio-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
      }
      .spazio-card h3 {
        margin: 0 0 0.25rem;
        color: var(--color-accent);
      }
      .spazio-card__cap {
        font-size: 0.82rem;
        font-weight: 600;
        margin: 0 0 0.75rem;
        color: var(--color-fg-muted);
      }
      .spazio-card__desc {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
      }
      .badge-prenotabile {
        font-size: 0.72rem;
        padding: 0.2rem 0.6rem;
        background: #d1fae5;
        color: #065f46;
        border-radius: 9999px;
        font-weight: 600;
      }
      .cta-band {
        padding: 5rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly eventiInEvidenza$ = this.mockData.eventi$.pipe(
    map((data) => data.eventi.filter((e) => e.featured).slice(0, 3))
  );

  readonly spazi$ = this.mockData.info$.pipe(
    map((info) => info.spazi)
  );

  formatData(isoDate: string): string {
    const [year, month, day] = isoDate.split('-');
    const months = [
      'gen', 'feb', 'mar', 'apr', 'mag', 'giu',
      'lug', 'ago', 'set', 'ott', 'nov', 'dic'
    ];
    return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
  }
}
