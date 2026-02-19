
import { Theme } from './types';

export const THEMES: Theme[] = [
  {
    id: 'midnight',
    name: 'Midnight Red',
    bg: '#121212',
    header: '#1a1a1a',
    card: '#1e1e1e',
    primary: '#FF4D4D',    // Vibrant Red
    secondary: '#4D94FF',  // Sky Blue
    accent: '#FFD700',     // Gold
    text: '#E0E0E0',
    muted: '#9CA3AF',
    border: '#2a2a2a'
  },
  {
    id: 'sakura',
    name: 'Sakura Pastel',
    bg: '#FFF5F7',
    header: '#FFFFFF',
    card: '#FFFFFF',
    primary: '#FF85A2',    // Soft Pink
    secondary: '#BDE0FE',  // Pastel Blue
    accent: '#D8E2DC',     // Sage Grey
    text: '#5F4B4B',
    muted: '#A89999',
    border: '#FFE0E6'
  },
  {
    id: 'matcha',
    name: 'Matcha Mint',
    bg: '#F3F6F1',
    header: '#FFFFFF',
    card: '#FFFFFF',
    primary: '#76885B',    // Forest Green
    secondary: '#DDA15E',  // Warm Sand
    accent: '#ADC4CE',     // Pale Blue
    text: '#283618',
    muted: '#8B9A6B',
    border: '#E2E8DE'
  },
  {
    id: 'synthwave',
    name: 'Neon Dreams',
    bg: '#120422',
    header: '#1A0B2E',
    card: '#241244',
    primary: '#F0ABFC',    // Neon Purple
    secondary: '#22D3EE',  // Cyan
    accent: '#F472B6',     // Pink
    text: '#F5F3FF',
    muted: '#A78BFA',
    border: '#4C1D95'
  },
  {
    id: 'nord',
    name: 'Nordic Frost',
    bg: '#2E3440',
    header: '#3B4252',
    card: '#3B4252',
    primary: '#88C0D0',    // Frost Blue
    secondary: '#A3BE8C',  // Meadow Green
    accent: '#EBCB8B',     // Muted Yellow
    text: '#ECEFF4',
    muted: '#D8DEE9',
    border: '#434C5E'
  },
  {
    id: 'minimal',
    name: 'Ink & Paper',
    bg: '#FDFDFD',
    header: '#F5F5F5',
    card: '#FFFFFF',
    primary: '#111111',    // Deep Black
    secondary: '#666666',  // Steel
    accent: '#999999',     // Grey
    text: '#111111',
    muted: '#888888',
    border: '#EEEEEE'
  },
  {
    id: 'desert',
    name: 'Desert Dune',
    bg: '#FAF3E0',
    header: '#FFFFFF',
    card: '#FFFFFF',
    primary: '#BC6C25',    // Terracotta
    secondary: '#8E9775',  // Olive
    accent: '#E28E8E',     // Dusty Rose
    text: '#432818',
    muted: '#997B66',
    border: '#F1E4D8'
  },
  {
    id: 'cyber',
    name: 'Cyberpunk',
    bg: '#000000',
    header: '#0a0a0a',
    card: '#111111',
    primary: '#FAFF00',    // Warning Yellow
    secondary: '#FF00FF',  // Magenta
    accent: '#00FFFF',     // Electric Blue
    text: '#FFFFFF',
    muted: '#666666',
    border: '#222222'
  },
  {
    id: 'ocean',
    name: 'Deep Pacific',
    bg: '#081C15',
    header: '#1B4332',
    card: '#2D6A4F',
    primary: '#D8F3DC',    // Pale Mint
    secondary: '#52B788',  // Emerald
    accent: '#FFD700',     // Sand
    text: '#FDFDFD',
    muted: '#B7E4C7',
    border: '#1B4332'
  },
  {
    id: 'lavender',
    name: 'Lavender Fields',
    bg: '#F8F7FF',
    header: '#FFFFFF',
    card: '#FFFFFF',
    primary: '#9381FF',    // Vibrant Lavender
    secondary: '#B8B8FF',  // Soft Periwinkle
    accent: '#FFD6BA',     // Apricot
    text: '#2B2D42',
    muted: '#8D99AE',
    border: '#EEEBFF'
  }
];

export const TONE_GUIDE_DATA = [
  {
    name: 'First Tone',
    mark: 'ā',
    desc: 'High and level. Imagine a flat horizontal line.',
    example: 'mā (Mother)',
    character: '妈'
  },
  {
    name: 'Second Tone',
    mark: 'á',
    desc: 'Rising. Like asking a question: "What?"',
    example: 'má (Hemp)',
    character: '麻'
  },
  {
    name: 'Third Tone',
    mark: 'ǎ',
    desc: 'Falling then rising. Like saying a hesitant "Well..."',
    example: 'mǎ (Horse)',
    character: '马'
  },
  {
    name: 'Fourth Tone',
    mark: 'à',
    desc: 'Falling. Sharp and short, like a command: "No!"',
    example: 'mà (Scold)',
    character: '骂'
  }
];

export const PRONUNCIATION_DATA = [
  {
    category: 'The Hard Initials',
    description: 'Retroflex sounds. Curl your tongue slightly toward the roof of your mouth.',
    sounds: [
      { pinyin: 'zh', soundsLike: '"j" in "judge"', example: '中 (zhōng)', audioHint: '中' },
      { pinyin: 'ch', soundsLike: '"ch" in "church"', example: '茶 (chá)', audioHint: '茶' },
      { pinyin: 'sh', soundsLike: '"sh" in "shirt"', example: '书 (shū)', audioHint: '书' },
      { pinyin: 'r', soundsLike: '"r" in "raw"', example: '日 (rì)', audioHint: '日' },
    ]
  },
  {
    category: 'The Dental Sibilants',
    description: 'Flat sounds. Keep your tongue flat behind your lower front teeth.',
    sounds: [
      { pinyin: 'z', soundsLike: '"ds" in "reads"', example: '字 (zì)', audioHint: '字' },
      { pinyin: 'c', soundsLike: '"ts" in "cats"', example: '菜 (cài)', audioHint: '菜' },
      { pinyin: 's', soundsLike: '"s" in "sun"', example: '岁 (suì)', audioHint: '岁' },
    ]
  },
  {
    category: 'Palatal Sounds',
    description: 'High and sharp. The front of the tongue touches the hard palate.',
    sounds: [
      { pinyin: 'j', soundsLike: '"j" in "jeep"', example: '叫 (jiào)', audioHint: '叫' },
      { pinyin: 'q', soundsLike: '"ch" in "cheap"', example: '请 (qǐng)', audioHint: '请' },
      { pinyin: 'x', soundsLike: '"sh" in "she"', example: '姓 (xìng)', audioHint: '姓' },
    ]
  },
  {
    category: 'Special Vowels',
    description: 'Tricky vowels that change sound based on surrounding letters.',
    sounds: [
      { pinyin: 'ü', soundsLike: '"ee" with rounded lips', example: '女 (nǚ)', audioHint: '女' },
      { pinyin: 'ian', soundsLike: 'like "ee-en"', example: '片 (piàn)', audioHint: '片' },
      { pinyin: 'er', soundsLike: 'like "are"', example: '二 (èr)', audioHint: '二' },
    ]
  }
];
