export interface ConjugationSlot {
  slotId: number;
  pronounAr: string;
  pronounEn: string;
  person: '3rd' | '2nd' | '1st';
  gender: 'masc' | 'fem' | 'both';
  numberType: 'singular' | 'dual' | 'plural';
}

export interface Verb {
  id: string;
  root: string;
  form: number;
  madi: string;
  mudari: string;
  masdar?: string;
  ismFail?: string;
  ismMafool?: string;
  meaningEn: string;
  meaningAr?: string;
  verbType: 'salim' | 'mahmuz' | 'mudaaf' | 'mithal' | 'ajwaf' | 'naqis' | 'lafif';
  isTransitive: boolean;
  isQuranic: boolean;
  quranicReference?: string;
}

export interface Conjugation {
  verbId: string;
  tense: 'madi' | 'mudari' | 'amr';
  voice: 'active' | 'passive';
  slotId: number;
  formText: string;
  transliteration?: string;
}

export interface Stage {
  id: number;
  nameAr: string;
  nameEn: string;
  description: string;
  unlockThreshold: number;
}

export type Tense = 'madi' | 'mudari' | 'amr';
export type Voice = 'active' | 'passive';
