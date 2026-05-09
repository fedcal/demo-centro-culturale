import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti e tessera socio</h1>
        <p>Scrivici, chiamaci, o iscriviti subito come socio di Casa Mediterranea.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <section class="info-block">
          <h2>Dove siamo</h2>
          <p>
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.indirizzo.regione }}
          </p>

          <h2>Contatti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Orari di apertura</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ info.orari.domenica }}</span></li>
          </ul>

          <section class="tessera-box">
            <h2>Tessera soci</h2>
            <p class="tessera-price">
              {{ info.tessera.prezzo | currency: 'EUR' }}/{{ info.tessera.valida }}
            </p>
            <ul class="tessera-benefici">
              <li *ngFor="let b of info.tessera.benefici">{{ b }}</li>
            </ul>
          </section>
        </section>

        <section class="form-block">
          <h2>Iscriviti come socio</h2>
          <p class="form-intro">
            Compila il modulo per ricevere informazioni sull'iscrizione alla tessera soci (€30/anno) o per qualsiasi altra richiesta.
          </p>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome *</label>
              <input id="nome" type="text" formControlName="nome" required autocomplete="name" />
              <span class="field-error" *ngIf="showError('nome')">Nome obbligatorio (min 2 caratteri)</span>
            </div>
            <div class="field">
              <label for="email">Email *</label>
              <input id="email" type="email" formControlName="email" required autocomplete="email" />
              <span class="field-error" *ngIf="showError('email')">Email non valida</span>
            </div>
            <div class="field">
              <label for="telefono">Telefono</label>
              <input id="telefono" type="tel" formControlName="telefono" autocomplete="tel" />
            </div>
            <div class="field">
              <label for="interesse">Interesse principale</label>
              <select id="interesse" formControlName="interesse">
                <option value="">-- Seleziona --</option>
                <option value="tessera">Tessera soci €30/anno</option>
                <option value="corsi">Iscrizione a un corso</option>
                <option value="eventi">Informazioni sugli eventi</option>
                <option value="spazi">Prenotazione spazi</option>
                <option value="altro">Altro</option>
              </select>
            </div>
            <div class="field">
              <label for="messaggio">Messaggio</label>
              <textarea id="messaggio" formControlName="messaggio" rows="4" placeholder="Scrivici la tua richiesta..."></textarea>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la privacy policy e il trattamento dei dati personali (GDPR).
              </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia richiesta</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato è realmente inviato. Per contattarci usa il numero o l'email sopra.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou-icon" aria-hidden="true">🎭</span>
              <h3>Grazie {{ form.value['nome'] }}!</h3>
              <p>
                La tua richiesta è stata ricevuta. Ti contatteremo a breve all'indirizzo
                <strong>{{ form.value['email'] }}</strong>.
              </p>
              <p>In un sito reale riceveresti un'email di conferma con tutti i dettagli sull'iscrizione.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
      </div>
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
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.75rem 0 0.75rem;
        font-size: 1.15rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .info-block p {
        color: var(--color-fg-muted);
        line-height: 1.65;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .tessera-box {
        margin-top: 1.5rem;
        padding: 1.25rem;
        background: #f5f3ff;
        border: 1px solid #ddd6fe;
        border-radius: var(--radius-md);
      }
      .tessera-box h2 {
        margin-top: 0;
        color: var(--color-accent);
      }
      .tessera-price {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-accent);
        margin: 0 0 1rem;
      }
      .tessera-benefici {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
      .tessera-benefici li {
        font-size: 0.88rem;
        color: var(--color-fg-muted);
        padding-left: 1rem;
        position: relative;
      }
      .tessera-benefici li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--color-accent);
        font-weight: 700;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
      }
      .form-block h2 {
        margin: 0 0 0.5rem;
      }
      .form-intro {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field textarea,
      .field select {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field-error {
        font-size: 0.78rem;
        color: var(--color-danger);
        margin-top: 0.2rem;
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox input {
        margin-top: 2px;
        flex-shrink: 0;
        width: 16px;
        height: 16px;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
        width: 100%;
        text-align: center;
      }
      .btn-primary:hover:not(:disabled) {
        background: #6d28d9;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
        text-align: center;
      }
      .thankyou {
        text-align: center;
        padding: 2rem 0;
      }
      .thankyou-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h3 {
        color: var(--color-accent);
        margin: 0 0 1rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin-bottom: 0.75rem;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    interesse: [''],
    messaggio: [''],
    privacy: [false, Validators.requiredTrue]
  });

  showError(field: string): boolean {
    const ctrl = this.form.get(field);
    return ctrl !== null && ctrl.invalid && ctrl.touched;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false });
    this.submitted.set(false);
  }
}
