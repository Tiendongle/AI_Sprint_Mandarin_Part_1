
import { Lesson } from '../types';
// Import the JSON data directly from the local data folder.
import lessonsData from './lessons.json';

// The existing code iterates 30 times to generate 30 lessons. We'll keep that structure
// but source the data from the imported JSON instead of the hardcoded 'progression' array.
export const LESSONS: Lesson[] = Array.from({ length: 30 }, (_, i) => {
  // Get the corresponding lesson from the imported data.
  const lessonFromJson = lessonsData[i];

  // The rest of the app expects the `vocab` array to contain objects with `char`, `pinyin`, and `english` keys.
  // The JSON file stores vocab as a more compact array of strings: `[char, pinyin, english]`.
  // We'll perform that transformation here to avoid refactoring the UI components.
  const vocab = lessonFromJson.vocab.map((v: string[]) => ({
    char: v[0],
    pinyin: v[1],
    english: v[2],
  }));

  // The old code had complex logic to generate dialogues and review-day vocab.
  // Since our JSON file is now the source of truth, we can use its data directly.
  // This correctly uses the pre-defined dialogue and review content from the JSON.
  return {
    day: lessonFromJson.day,
    title: lessonFromJson.title,
    vocab: vocab, // The transformed vocab array.
    dialogue: lessonFromJson.dialogue, // The dialogue from the JSON, which is already in the correct format.
  };
});
