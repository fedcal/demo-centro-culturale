# Piano Tariffario e Tier di Funzionalità

## Panorama Tier

Il template **Centro Culturale / Biblioteca Privata** è disponibile in 3 livelli di funzionalità, progettati per digitalizzare offerta culturale:

| Tier | Prezzo | Ore sviluppo | Pubblico ideale |
|------|--------|-------------|-----------------|
| **Base** | €500–800 | 80h | Piccoli centri, visibilità calendario eventi |
| **Intermedio** | €1.500–2.200 | 250h | Centri medi, prenotazioni + biglietteria online |
| **Avanzato** | €4.000–6.000 | 500h | Centri grandi, biblioteca digitale + virtual tour + e-learning |

---

## Tier Base — €500–800 (80h)

**Obiettivo**: Sito vetrina informativo, calendario eventi, SEO locale.

### Funzionalità incluse

- **Hero section** con missione centro culturale, foto spazi
- **Attività offerti** — corsi (lingue, arte, musica), conferenze, mostre, esposizioni
- **Gallery sala e biblioteca** — foto spazi, allestimenti, atmosfera
- **Team curatori** — nomi, foto, specializzazione culturale
- **Calendario eventi** — corsi mensili, conferenze, mostre, orario apertura
- **Contatti + Orari** — form contatti, telefono, email, orari reception
- **Blog culturale** — articoli su artisti, tendenze, recensioni mostre
- **Schema.org LocalBusiness + Event + CreativeWork** — JSON-LD SEO
- **Design system** — CSS tokens light theme (GitHub Primer)
- **Prerender statico** — fast, 99.9% uptime
- **Responsive mobile** — Lighthouse target ≥90 SEO

### Cosa NON è incluso

- Login soci/tessera
- Prenotazioni corsi
- Biglietteria
- Prenotazione sale
- Catalogo libri
- Biblioteca digitale
- Virtual tour 360°

---

## Tier Intermedio — €1.500–2.200 (250h)

**Obiettivo**: Portale interattivo, prenotazioni corsi, biglietteria, catalogo libri.

### Funzionalità incluse (Tier Base +)

- **Login soci tessera digitale** — area riservata, cronologia corsi frequentati
  - Emissione tessera virtuale (PDF scaricabile, QR code scannable)
  - Sconto automatico su prenotazioni corsi/biglietti
  - Storico corsi e certificati download

- **Prenotazione corsi online** — iscrizione, pagamento, lista d'attesa
  - Catalogo corsi con descrizione, docente, date, orari
  - Form iscrizione semplice
  - Pagamento Stripe/Satispay al momento prenotazione
  - Confirma email + reminder 2 giorni prima corso
  - Smart list d'attesa (notifica se spot si libera)

- **Biglietteria eventi Stripe** — conferenze, mostre, concerti
  - Ticketing online per evento (prezzo ridotto soci)
  - QR code ticket scannable all'ingresso
  - Emissione ricevuta PDF
  - Analisi vendite real-time per staff

- **Prenotazione sale studio** — stile Affluences
  - Calendario disponibilità sala (posticini singoli, tavoli gruppo)
  - Booking 7 giorni in advance, durata 2–4h
  - Check-in app/browser (QR entry)
  - Tariffa oraria per soci vs non-soci

- **Catalogo libri ricerca + reservation** — database biblioteca
  - Search per titolo, autore, ISBN
  - Info libro (abstract, copia disponibile, due date)
  - Reservation online (ritiro entro 7 giorni)
  - Notifica quando copia disponibile
  - Storico prestiti per lettore

- **Multi-lingua IT/EN** — sito bilingue, attracker studenti internazionali

- **GDPR completo** — cookie banner, consensi dati

### Cosa NON è incluso

- Biblioteca digitale PDF/audio
- E-learning video on-demand
- Virtual tour 360°
- App mobile
- Community forum

---

## Tier Avanzato — €4.000–6.000 (500h)

**Obiettivo**: Ecosistema digitale culturale completo, biblioteca digitale, community, partnerships.

### Funzionalità incluse (Tier Base + Intermedio +)

- **Biblioteca digitale full** — collection PDF + audio reading
  - Upload staff: PDF catalogo (copyright-free, dominio pubblico, authors consent)
  - Audio reading: TTS sintetica o registrata da lettori volontari
  - Search full-text per PDF (OCR se scan cartaceo)
  - Bookmarks e note personali per lettore
  - Accesso temporale (scade fine anno, refresh automatico per soci attivi)
  - Export PDF/ePub personal collection

- **Community forum tematico** — lettori, studenti, appassionati
  - Forum per argomento (letteratura, storia, arte, filosofia)
  - Q&A moderata (staff approva post rilevanti)
  - Libro del mese discussion (reading group online)
  - Writing prompts per creative writers
  - Rating libri by readers (voti + reviews)

- **E-learning platform corsi video on-demand** — lezioni registrate
  - Upload insegnanti: video corso, slide, materiale supplementare
  - Lezioni asincrone (studente accede quando vuole)
  - Quiz midway + final exam con score
  - Certificato completamento downloadabile
  - Tracciamento progresso (staff dashboard)
  - Gamification: badge per milestone (prima lezione, corso completo, 100% quiz)

- **Virtual tour 360° spazi** — immersive experience online
  - Photo-stitching spazi centro (sala lettura, aula conferenza, giardino)
  - Hotspot interattivi (clicca su libro → info, clicca su quadro → biografia artista)
  - Desktop + mobile VR-ready (Cardboard, Meta Quest)
  - Download offline per studenti remote

- **Partnership universitarie** — integrazione dipartimenti
  - Seminari universitari ospitati (live streaming + archive)
  - Tesi di laurea digitalizzate (repository, searchable)
  - Collab con facoltà umanistiche (ricerche archivio storico)
  - Internship program per studenti (matching volunteer roles)

- **Prenotazione sale matrimoni/eventi privati** — catering builder
  - Sale disponibilità multi-spazi (sala conferenza + salotto + giardino)
  - Booking form: data, ospiti, tipo evento (matrimonio, compleanno, meeting)
  - Catering builder integrato: menu base + add-on (wine, dessert, decoration)
  - Prezzo quote automatico
  - Invoice + rental agreement PDF
  - Photo gallery evento (upload fornitori/ospiti post-evento)

- **Dashboard curatori analytics** — insights cultura
  - Libro più letto (PDF + audio)
  - Corsi trending (enrollment, completion rate)
  - Forum engagement (topic views, discussioni attive)
  - Virtual tour visitor heatmap (quali spazi attraggono)
  - Email newsletter open rates (subscriber growth)

- **Social media auto-post** — integration LinkedIn, Instagram, Facebook
  - Evento spotlight auto-post (calendario corsi, mostra, conferenza)
  - Libro mese social share
  - Corso completed student shout-out (opzionale, opt-in)
  - Hashtag curator insights

---

## Dettagli implementativi per Tier

### Tier Base: Stack semplice

```
Frontend: Angular 21 SSR prerender-only
Backend: API REST mock (no DB)
Hosting: Vercel CDN
Docs: VitePress GitHub Pages
```

### Tier Intermedio: Stack full-stack leggero

```
Frontend: Angular 21 SSR + login, booking form
Backend: Spring Boot 3.4 + PostgreSQL + Redis
Auth: JWT proprietario
Payments: Stripe SDK + Satispay SDK
Email: Brevo / Resend SMTP
Hosting: Vercel (frontend) + VPS own (backend)
```

### Tier Avanzato: Stack complete + multimedia

```
Frontend: Angular 21 SSR + Signals + dashboard
Backend: Spring Boot clean-arch 4-layer
Media: 
  - PDF: PDF.js viewer (client-side rendering)
  - Audio: HLS streaming + Spotify-style player
  - Video: ffmpeg transcode + HLS format
  - VR: Babylon.js (360 tour)
Search: Elasticsearch (full-text PDF, book catalog)
DB: PostgreSQL 16 + Redis Stack
Auth: JWT + opt-in OAuth (Google, università SSO)
Forum: Simple custom (Spring + PostgreSQL)
Hosting: VPS Hetzner CCX23 (3 microservizi) + Nginx SSL
```

---

## Scegliere il Tier

### **Base** se:
- Centro piccolo (<100 soci)
- Budget <€1k
- Esigenza primaria: info calendario, visibilità web
- No aspettativa prenotazioni online

### **Intermedio** se:
- Centro medio (100–300 soci)
- Voglia digitalizzare iscrizioni corsi + biglietteria
- Budget €1.500–2.200
- Soci nativi digitali, chiedono booking online

### **Avanzato** se:
- Centro grande (300+ soci, 50+ corsi/anno)
- Visione: hub culturale digitale (biblioteca + e-learning + community)
- Budget €4k–6k, ROI stimato 12–24 mesi
- Staff willing to learn content management (libro scanning, video upload)
- Partnership con università/musei interested

---

## Costi aggiuntivi (extra-tier)

| Servizio | Costo mensile | Note |
|----------|---------------|------|
| Elasticsearch cloud (search full-text) | €50–200 | Per biblioteca PDF full-text |
| Zoom webinar (50+ per mese) | €150–300 | Streaming conferenze / seminari |
| Video hosting (Vimeo, Bunny CDN) | €50–150 | E-learning video on-demand |
| TTS API (Google Cloud) | €20–100 | Audio reading sincronizzato PDF |
| Brevo email marketing | €20–100 | Newsletter >5k, GDPR bulk email |
| OCR scanning (Tesseract server) | €0 (open-source) | Digitizzazione libro cartaceo |
| SSL Let's Encrypt | €0 | Automatico |
| Backup cloud + archive | €30–80 | Storage PDF/video archivio |
| Consulenza GDPR | €500–1.000 | Uno-time, book scanning rights |

---

## Timeline tipica per Tier

| Fase | Base | Intermedio | Avanzato |
|------|------|-----------|----------|
| Discovery | 1 sett | 1 sett | 2 sett |
| Sviluppo | 2–2.5 sett | 6–7 sett | 12–13 sett |
| Testing + UAT | 0.5 sett | 1–1.5 sett | 2–3 sett |
| Deploy + training | 0.5 sett | 1 sett | 1–2 sett |
| **Totale** | **4 sett** | **9–10 sett** | **17–20 sett** |

---

## GDPR e Privacy — Conformità per Tier

### Tier Base
- Informativa privacy footer
- Cookie banner
- NO raccolta dati soci

### Tier Intermedio
- GDPR completo (Data Protection Policy)
- Crittografia password soci
- DPA con Stripe/Satispay
- Retention policy: prenotazioni 5 anni, rating libri 2 anni
- Consenso newsletter opt-in

### Tier Avanzato (aggiunto)
- Registro trattamenti (Video recording conferenze, PDF metadata)
- DPA esteso (Elasticsearch, video host, TTS provider)
- Diritto oblio: delete account → scrub all user notes, reviews, forum posts
- Photo evento: consenso esplicito ospiti / staff prima publicazione
- Audio copyright: verificare diritti autore per TTS reading

---

## Prossimi step

1. **Contatta Federico** — dimensione centro, budget, tipo libreria prevalente (generale/specializzata)
2. **Demo live** — accesso Tier Base con dati mock tuo centro
3. **Proposta personalizzata** — timeline, SLA uptime 99.5%, training staff prenotazioni
4. **Contratto e kickoff** — discovery call, mapping biblioteca digitale (scanning, OCR, upload timeline)
