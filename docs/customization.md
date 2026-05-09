# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Centro Culturale'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `centro-culturale` con nome cliente (`acme-pizzeria`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account

---

## Possibili sviluppi customizzabili

Il template Centro Culturale supporta estensioni per library management e digital culture:

### Biblioteca Digitale e Contenuti
1. **Biblioteca digitale full PDF + audio reading** — OCR scan + TTS automatico (Tier Avanzato)
2. **E-learning platform video on-demand** — lezioni registrate, quiz, certificati (Tier Avanzato)
3. **Archivio tesi universitarie** — repository searchable, collegamento con facoltà (Tier Avanzato+)
4. **Blog articoli saggistici** — curatori scrivono approfondimenti, newsletter mensile (Tier Intermedio+)

### Prenotazioni e Logistica
5. **Prenotazione sale matrimoni/eventi privati** — catering builder integrato (Tier Avanzato)
6. **Gestione catering integrata** — menu builder, fornitore quote, invoice automatica (Tier Avanzato+)
7. **Equipment rental tracking** — proiettori, sedie, tavoli; booking + inventory (custom)

### Community e Engagement
8. **Community forum tematico** — lettori, studenti, appassionati (Tier Avanzato)
9. **Reading group online** — libro del mese, discussione moderata, voting (Tier Avanzato+)
10. **Author meet-and-greet virtual** — live streaming + Q&A chat (Tier Avanzato+)

### Experience e Immersiva
11. **Virtual tour 360° spazi** — immersive experience, hotspot interattivi, mobile VR-ready (Tier Avanzato)
12. **Mostra virtuale 3D** — gallery immersiva, scultura/quadro explorable, artist bio (custom)
13. **Mappa interattiva storica** — centro culturale nel tempo (fotos d'epoca, timeline) (custom)

### Partnership e Integrazioni
14. **Partnership universitarie** — seminari co-branded, tesi archive, internship matching (Tier Avanzato+)
15. **Museo/Galleria feed integration** — aggrega mostre esterne + calendar (custom)

**Nota**: Contatta Federico per valutazione costi e timeline di ogni feature custom.
