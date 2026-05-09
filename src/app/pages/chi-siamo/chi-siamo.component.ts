import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { combineLatest, map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Una casa per la cultura mediterranea, aperta a Trieste dal 1978.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>La nostra storia</h2>
        <p>
          Casa della Cultura Mediterranea nasce nel 1978 per iniziativa di un gruppo di intellettuali triestini che
          volevano creare uno spazio di dialogo tra le culture del Mediterraneo: italiana, slava, greca, araba e
          nordafricana. Trieste, città di frontiera per eccellenza, era il luogo ideale.
        </p>
        <p>
          Nel corso degli anni il centro ha ospitato centinaia di mostre, concerti, convegni internazionali e
          laboratori didattici. Oggi, con oltre 340 soci attivi, è uno dei punti di riferimento culturali più
          vivaci del Friuli-Venezia Giulia, con una biblioteca di 5.000 volumi specializzata in culture
          mediterranee e un programma annuale di 12 corsi e più di 50 eventi.
        </p>
      </section>

      <section class="valori">
        <h2>I nostri valori</h2>
        <ul class="valori-grid">
          <li>
            <h3>Apertura</h3>
            <p>Uno spazio accessibile a tutti, dove le differenze culturali sono una risorsa, non un ostacolo.</p>
          </li>
          <li>
            <h3>Qualità</h3>
            <p>Docenti professionisti, relatori di levatura nazionale e internazionale, contenuti curati con rigore.</p>
          </li>
          <li>
            <h3>Comunità</h3>
            <p>340 soci attivi che partecipano, propongono idee, co-creano il programma e si incontrano ogni settimana.</p>
          </li>
          <li>
            <h3>Territorio</h3>
            <p>Radicati a Trieste, con uno sguardo aperto all'Adriatico e al Mediterraneo intero.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="view$ | async as view">
        <h2>Il nostro team</h2>
        <p class="team-subtitle">{{ view.sociAttivi }} soci attivi + {{ view.team.length }} professionisti del team</p>
        <ul class="team-grid">
          <li *ngFor="let m of view.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="spazi" *ngIf="spazi$ | async as spazi">
        <h2>I nostri spazi</h2>
        <ul class="spazi-list">
          <li *ngFor="let spazio of spazi" class="spazio-row">
            <div>
              <h3>{{ spazio.nome }}</h3>
              <p>{{ spazio.descrizione }}</p>
            </div>
            <div class="spazio-meta">
              <span class="spazio-cap">{{ spazio.capienza }} posti</span>
              <span *ngIf="spazio.prenotabile" class="badge-prenotabile">Prenotabile</span>
            </div>
          </li>
        </ul>
      </section>

      <section class="faq" *ngIf="faq$ | async as faqData">
        <h2>Domande frequenti</h2>
        <dl class="faq-list">
          <ng-container *ngFor="let item of faqData.faq">
            <dt>{{ item.domanda }}</dt>
            <dd>{{ item.risposta }}</dd>
          </ng-container>
        </dl>
      </section>
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
      .content {
        padding: 3rem 1rem;
      }
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .valori {
        margin-bottom: 4rem;
      }
      .valori h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .valori-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .valori-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .valori-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
      }
      .valori-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 0.25rem;
      }
      .team-subtitle {
        text-align: center;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
        font-size: 1rem;
      }
      .team-card__role {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.85rem;
      }
      .team-card__bio {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.55;
      }
      .team-card__exp {
        font-size: 0.78rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: var(--color-fg-muted);
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.68rem;
        background: #f5f3ff;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-accent);
        font-weight: 500;
      }
      .spazi {
        margin-bottom: 4rem;
      }
      .spazi h2 {
        margin-bottom: 1.5rem;
      }
      .spazi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .spazio-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1.5rem;
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .spazio-row h3 {
        margin: 0 0 0.25rem;
        color: var(--color-accent);
      }
      .spazio-row p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .spazio-meta {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
        flex-shrink: 0;
      }
      .spazio-cap {
        font-weight: 700;
        font-size: 0.85rem;
        white-space: nowrap;
      }
      .badge-prenotabile {
        font-size: 0.72rem;
        padding: 0.2rem 0.6rem;
        background: #d1fae5;
        color: #065f46;
        border-radius: 9999px;
        font-weight: 600;
      }
      .faq {
        margin-bottom: 2rem;
      }
      .faq h2 {
        margin-bottom: 1.5rem;
      }
      .faq-list {
        margin: 0;
      }
      .faq-list dt {
        font-weight: 700;
        margin-bottom: 0.4rem;
        color: var(--color-fg-default);
      }
      .faq-list dd {
        margin: 0 0 1.5rem;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        line-height: 1.65;
        border-left: 3px solid var(--color-accent);
        padding-left: 1rem;
      }
      @media (max-width: 580px) {
        .spazio-row {
          flex-direction: column;
        }
        .spazio-meta {
          align-items: flex-start;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.team$;
  readonly spazi$ = this.mockData.info$.pipe(map((info) => info.spazi));
  readonly faq$ = this.mockData.faq$;
}
