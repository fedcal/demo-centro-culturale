// Tipi TypeScript per i dati mock del centro culturale

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface Spazio {
  id: string;
  nome: string;
  capienza: number;
  descrizione: string;
  prenotabile: boolean;
}

export interface Tessera {
  prezzo: number;
  valida: string;
  benefici: string[];
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  fondazione: number;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  spazi: Spazio[];
  tessera: Tessera;
  metaSeo: MetaSeo;
}

export type CategoriaEvento = 'mostra' | 'concerto' | 'conferenza' | 'presentazione' | 'workshop';

export interface Evento {
  id: number;
  tipo: CategoriaEvento;
  titolo: string;
  descrizione: string;
  dataInizio: string;
  dataFine: string;
  oraInizio: string;
  luogo: string;
  prezzo: number;
  featured: boolean;
  categoria: CategoriaEvento;
}

export interface EventiData {
  eventi: Evento[];
}

export type CategoriaCorso = 'arte' | 'scrittura' | 'lingue' | 'musica' | 'ceramica';

export interface Corso {
  id: number;
  categoria: CategoriaCorso;
  titolo: string;
  descrizione: string;
  livello: string;
  durata: string;
  giorno: string;
  ora: string;
  maxPartecipanti: number;
  prezzoMensile: number;
  prezzoSocio: number;
  docente: string;
  materialeIncluso: boolean;
}

export interface CorsiData {
  corsi: Corso[];
}

export interface Membro {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  specialita: string[];
}

export interface TeamData {
  team: Membro[];
  sociAttivi: number;
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface FaqData {
  faq: FaqItem[];
}
