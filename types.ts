
export interface VocabItem {
  char: string;
  pinyin: string;
  english: string;
}

export interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  english: string;
}

export interface Lesson {
  day: number;
  title: string;
  vocab: VocabItem[];
  dialogue: DialogueLine[];
}

export enum AppTab {
  LESSON = 'LESSON',
  FLASHCARDS = 'FLASHCARDS',
  PRONUNCIATION = 'SOUNDS',
  TONE_GUIDE = 'TONES'
}

export interface Theme {
  id: string;
  name: string;
  bg: string;
  header: string;
  card: string;
  primary: string;    // Dominant color for characters
  secondary: string;  // Complementary color 1
  accent: string;     // Complementary color 2
  text: string;
  muted: string;
  border: string;
}
