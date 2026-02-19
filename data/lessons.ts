
import { Lesson } from '../types';

export const LESSONS: Lesson[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  
  // 150 characters total / 6 per day = 25 learning days.
  // Days 26-30 will be review days.
  const progression = [
    { title: "Greetings", vocab: [["你", "nǐ", "You"], ["好", "hǎo", "Good"], ["请", "qǐng", "Please"], ["问", "wèn", "Ask"], ["贵", "guì", "Noble"], ["姓", "xìng", "Surname"]] },
    { title: "Names & Identity", vocab: [["我", "wǒ", "I/Me"], ["呢", "ne", "Prtcl."], ["叫", "jiào", "Called"], ["什", "shén", "What"], ["么", "me", "Prtcl."], ["名", "míng", "Name"]] },
    { title: "Family Basics", vocab: [["家", "jiā", "Family"], ["有", "yǒu", "Have"], ["爸", "bà", "Dad"], ["妈", "mā", "Mom"], ["哥", "gē", "Bro (O)"], ["姐", "jiě", "Sis (O)"]] },
    { title: "Siblings & Qty", vocab: [["弟", "dì", "Bro (Y)"], ["妹", "mèi", "Sis (Y)"], ["两", "liǎng", "Two"], ["个", "gè", "MW"], ["谁", "shéi", "Who"], ["没", "méi", "Not"]] },
    { title: "Photos & People", vocab: [["张", "zhāng", "MW"], ["片", "piàn", "Photo"], ["这", "zhè", "This"], ["那", "nà", "That"], ["男", "nán", "Male"], ["女", "nǚ", "Female"]] },
    { title: "Dates & Weeks", vocab: [["月", "yuè", "Month"], ["号", "hào", "Date"], ["星", "xīng", "Star"], ["期", "qī", "Period"], ["天", "tiān", "Day"], ["年", "nián", "Year"]] },
    { title: "Birthdays", vocab: [["生", "shēng", "Birth"], ["日", "rì", "Sun/Day"], ["岁", "suì", "Age"], ["多", "duō", "Many"], ["大", "dà", "Big"], ["是", "shì", "To be"]] },
    { title: "Meals & Likes", vocab: [["吃", "chī", "Eat"], ["饭", "fàn", "Meal"], ["菜", "cài", "Dish"], ["喜", "xǐ", "Like"], ["欢", "huān", "Happy"], ["太", "tài", "Too"]] },
    { title: "Drinks", vocab: [["喝", "hē", "Drink"], ["茶", "chá", "Tea"], ["水", "shuǐ", "Water"], ["咖", "kā", "Coffee"], ["啡", "fēi", "Coffee"], ["了", "le", "Prtcl."]] },
    { title: "Hobbies 1", vocab: [["看", "kàn", "Watch"], ["书", "shū", "Book"], ["电", "diàn", "Elec."], ["影", "yǐng", "Shadow"], ["听", "tīng", "Listen"], ["唱", "chàng", "Sing"]] },
    { title: "Music & Sports", vocab: [["音", "yīn", "Sound"], ["乐", "yuè", "Music"], ["打", "dǎ", "Play"], ["球", "qiú", "Ball"], ["跳", "tiào", "Jump"], ["舞", "wǔ", "Dance"]] },
    { title: "Frequency", vocab: [["常", "cháng", "Often"], ["去", "qù", "Go"], ["对", "duì", "Right"], ["错", "cuò", "Wrong"], ["想", "xiǎng", "Want"], ["觉", "jué", "Feel"]] },
    { title: "Visiting Friends", vocab: [["进", "jìn", "Enter"], ["来", "lái", "Come"], ["快", "kuài", "Fast"], ["坐", "zuò", "Sit"], ["在", "zài", "At"], ["哪", "nǎ", "Where"]] },
    { title: "School Life", vocab: [["工", "gōng", "Work"], ["作", "zuò", "Do"], ["学", "xué", "Study"], ["校", "xiào", "School"], ["师", "shī", "Teacher"], ["教", "jiào", "Teach"]] },
    { title: "Introductions", vocab: [["漂", "piào", "Pretty"], ["亮", "liàng", "Bright"], ["认", "rèn", "Know"], ["识", "shí", "Know"], ["高兴", "gāoxìng", "Glad"], ["给", "gěi", "Give"]] },
    { title: "Phone Calls", vocab: [["话", "huà", "Word"], ["办", "bàn", "Handle"], ["公", "gōng", "Public"], ["室", "shì", "Room"], ["等", "děng", "Wait"], ["别", "bié", "Don't"]] },
    { title: "Time Slots", vocab: [["下", "xià", "Next"], ["午", "wǔ", "Noon"], ["上", "shàng", "Past"], ["节", "jié", "MW"], ["课", "kè", "Class"], ["到", "dào", "Arrive"]] },
    { title: "Exams", vocab: [["考", "kǎo", "Test"], ["试", "shì", "Try"], ["空", "kòng", "Time"], ["要", "yào", "Want"], ["开", "kāi", "Open"], ["会", "huì", "Meeting"]] },
    { title: "Study Habits", vocab: [["写", "xiě", "Write"], ["字", "zì", "Char."], ["慢", "màn", "Slow"], ["就", "jiù", "Then"], ["怎", "zěn", "How"], ["语", "yǔ", "Lang."]] },
    { title: "Languages", vocab: [["说", "shuō", "Speak"], ["法", "fǎ", "Law"], ["文", "wén", "Text"], ["难", "nán", "Hard"], ["平", "píng", "Flat"], ["笔", "bǐ", "Pen"]] },
    { title: "Directions", vocab: [["北", "běi", "North"], ["南", "nán", "South"], ["东", "dōng", "East"], ["西", "xī", "West"], ["边", "biān", "Side"], ["远", "yuǎn", "Far"]] },
    { title: "Transport", vocab: [["走", "zǒu", "Walk"], ["路", "lù", "Road"], ["车", "chē", "Car"], ["飞", "fēi", "Fly"], ["机", "jī", "Machine"], ["票", "piào", "Ticket"]] },
    { title: "Shopping", vocab: [["买", "mǎi", "Buy"], ["卖", "mài", "Sell"], ["钱", "qián", "Money"], ["块", "kuài", "MW"], ["百", "bǎi", "100"], ["件", "jiàn", "MW"]] },
    { title: "Colors", vocab: [["红", "hóng", "Red"], ["黄", "huáng", "Yellow"], ["蓝", "lán", "Blue"], ["白", "bái", "White"], ["黑", "hēi", "Black"], ["穿", "chuān", "Wear"]] },
    { title: "Weather", vocab: [["冷", "lěng", "Cold"], ["热", "rè", "Hot"], ["雨", "yǔ", "Rain"], ["雪", "xuě", "Snow"], ["风", "fēng", "Wind"], ["最", "zuì", "Most"]] },
    { title: "Review 1-30", vocab: [] }, // Placeholders for review days
    { title: "Review 31-60", vocab: [] },
    { title: "Review 61-90", vocab: [] },
    { title: "Review 91-120", vocab: [] },
    { title: "Final Mastery", vocab: [] },
  ];

  const content = progression[i];
  const vocab = content.vocab.map(v => ({ char: v[0], pinyin: v[1], english: v[2] }));
  
  // If it's a review day, grab some previous vocab for display
  if (day > 25) {
     const start = (day - 26) * 30;
     const end = start + 6;
     // Flat list of all previous vocab to sample from for review display
     const allVocab = progression.slice(0, 25).flatMap(p => p.vocab);
     vocab.push(...allVocab.slice(start, end).map(v => ({ char: v[0], pinyin: v[1], english: v[2] })));
  }

  return {
    day,
    title: content.title,
    vocab,
    dialogue: [
      {
        speaker: "A",
        chinese: vocab.length > 0 ? `你好！请问，这个${vocab[0].char}怎么说？` : "你好！我们复习吧。",
        pinyin: vocab.length > 0 ? `Nǐ hǎo! Qǐngwèn, zhège ${vocab[0].pinyin} zěnme shuō?` : "Nǐ hǎo! Wǒmen fùxí ba.",
        english: vocab.length > 0 ? `Hello! Excuse me, how do you say this "${vocab[0].english}"?` : "Hello! Let's review."
      },
      {
        speaker: "B",
        chinese: vocab.length > 0 ? `这个${vocab[0].char}的意思是"${vocab[0].english}"。` : "好主意，我们开始吧。",
        pinyin: vocab.length > 0 ? `Zhège ${vocab[0].pinyin} de yìsi shì "${vocab[0].english}".` : "Hǎo zhǔyì, wǒmen kāishǐ ba.",
        english: vocab.length > 0 ? `This "${vocab[0].char}" means "${vocab[0].english}".` : "Good idea, let's start."
      }
    ]
  };
});
