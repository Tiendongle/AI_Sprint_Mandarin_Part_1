import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { AppTab, Lesson, VocabItem, Theme } from "./types";
import { LESSONS } from "./data/lessons";
import { THEMES, TONE_GUIDE_DATA, PRONUNCIATION_DATA } from "./constants";
import { speak } from "./services/speechService";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.LESSON);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [masteredDays, setMasteredDays] = useState<number[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [shuffledVocab, setShuffledVocab] = useState<VocabItem[]>([]);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [showThemePicker, setShowThemePicker] = useState<boolean>(false);

  const dayScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem("mandarin-sprint-progress");
    if (savedProgress) setMasteredDays(JSON.parse(savedProgress));

    const savedThemeId = localStorage.getItem("mandarin-sprint-theme");
    if (savedThemeId) {
      const theme = THEMES.find((t) => t.id === savedThemeId);
      if (theme) setCurrentTheme(theme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--app-bg", currentTheme.bg);
    root.style.setProperty("--app-header", currentTheme.header);
    root.style.setProperty("--app-card", currentTheme.card);
    root.style.setProperty("--app-primary", currentTheme.primary);
    root.style.setProperty("--app-secondary", currentTheme.secondary);
    root.style.setProperty("--app-accent", currentTheme.accent);
    root.style.setProperty("--app-text", currentTheme.text);
    root.style.setProperty("--app-muted", currentTheme.muted);
    root.style.setProperty("--app-border", currentTheme.border);
    localStorage.setItem("mandarin-sprint-theme", currentTheme.id);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem(
      "mandarin-sprint-progress",
      JSON.stringify(masteredDays)
    );
  }, [masteredDays]);

  const currentLesson = useMemo(
    () => LESSONS.find((l) => l.day === currentDay) || LESSONS[0],
    [currentDay]
  );

  useEffect(() => {
    if (currentLesson.vocab.length > 0) {
      setShuffledVocab([...currentLesson.vocab]);
      setFlashcardIndex(0);
    }
    setIsFlipped(false);
  }, [currentDay, currentLesson.vocab]);

  const toggleMastery = () => {
    const isNowMastered = !masteredDays.includes(currentDay);
    if (isNowMastered) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [
          currentTheme.primary,
          currentTheme.secondary,
          currentTheme.accent,
        ],
      });
      if (window.navigator.vibrate) window.navigator.vibrate([20, 30, 20]);
    }
    setMasteredDays((prev) =>
      isNowMastered
        ? [...prev, currentDay]
        : prev.filter((d) => d !== currentDay)
    );
  };

  const handleReset = () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setMasteredDays([]);
      setCurrentDay(1);
      localStorage.removeItem("mandarin-sprint-progress");
    }
  };

  const progressPercentage = (masteredDays.length / 30) * 100;
  const showFooter =
    activeTab === AppTab.LESSON || activeTab === AppTab.FLASHCARDS;

  return (
    <div
      className="flex flex-col min-h-screen font-sans transition-colors duration-500"
      style={{ backgroundColor: "var(--app-bg)", color: "var(--app-text)" }}
    >
      <header
        className="sticky top-0 z-50 px-4 pt-4 pb-2 shadow-lg border-b transition-colors duration-500"
        style={{
          backgroundColor: "var(--app-header)",
          borderColor: "var(--app-border)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--app-primary)" }}
          >
            30-Day Sprint
          </motion.h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowThemePicker(!showThemePicker)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
              style={{ backgroundColor: "var(--app-border)" }}
            >
              <i
                className="fas fa-palette text-sm"
                style={{ color: "var(--app-primary)" }}
              ></i>
            </button>
            <button
              onClick={handleReset}
              className="text-[10px] px-3 font-bold rounded-lg uppercase tracking-wider transition-transform active:scale-95"
              style={{
                backgroundColor: "var(--app-border)",
                color: "var(--app-muted)",
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showThemePicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 rounded-3xl border grid grid-cols-5 gap-3"
              style={{
                backgroundColor: "var(--app-bg)",
                borderColor: "var(--app-border)",
              }}
            >
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setCurrentTheme(t);
                    setShowThemePicker(false);
                  }}
                  className={`group relative aspect-square rounded-full border-2 transition-all flex items-center justify-center overflow-hidden ${
                    currentTheme.id === t.id
                      ? "scale-110 border-[var(--app-primary)]"
                      : "border-transparent opacity-80"
                  }`}
                  style={{ backgroundColor: t.bg }}
                >
                  <div className="absolute inset-0 flex flex-col">
                    <div
                      className="flex-1"
                      style={{ backgroundColor: t.primary }}
                    ></div>
                    <div
                      className="flex-1"
                      style={{ backgroundColor: t.secondary }}
                    ></div>
                    <div
                      className="flex-1"
                      style={{ backgroundColor: t.accent }}
                    ></div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-4">
          <div className="flex justify-between text-[10px] mb-1 font-bold uppercase tracking-widest">
            <span style={{ color: "var(--app-muted)" }}>Progress</span>
            <span style={{ color: "var(--app-primary)" }}>
              {masteredDays.length}/30 Days
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--app-border)" }}
          >
            <motion.div
              className="h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: "spring", stiffness: 50 }}
              style={{ backgroundColor: "var(--app-primary)" }}
            />
          </div>
        </div>

        <nav className="grid grid-cols-4 gap-1.5">
          {Object.entries(AppTab).map(([key, tab]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2.5 px-1 text-[10px] font-black rounded-xl transition-all active:scale-95 uppercase tracking-tighter ${
                activeTab === tab ? "shadow-xl" : ""
              }`}
              style={{
                backgroundColor:
                  activeTab === tab
                    ? "var(--app-primary)"
                    : "var(--app-border)",
                color:
                  activeTab === tab
                    ? currentTheme.id === "minimal"
                      ? "#FFF"
                      : "var(--app-bg)"
                    : "var(--app-muted)",
              }}
            >
              {key}
            </button>
          ))}
        </nav>
      </header>

      <main
        className={`flex-1 p-4 overflow-y-auto max-w-2xl mx-auto w-full ${
          showFooter ? "pb-36" : "pb-10"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + currentDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === AppTab.LESSON && (
              <div className="space-y-6">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-1">
                    <h2 className="text-3xl font-black leading-none mt-2">
                      <span className="text-sm block uppercase tracking-widest opacity-40 mb-1">
                        Day {currentDay}
                      </span>
                      <span style={{ color: "var(--app-primary)" }}>
                        {currentLesson.title}
                      </span>
                    </h2>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMastery}
                    className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-center w-14 h-14 shrink-0 shadow-lg`}
                    style={{
                      backgroundColor: masteredDays.includes(currentDay)
                        ? "var(--app-primary)"
                        : "transparent",
                      borderColor: masteredDays.includes(currentDay)
                        ? "var(--app-primary)"
                        : "var(--app-border)",
                      color: masteredDays.includes(currentDay)
                        ? currentTheme.id === "minimal"
                          ? "#FFF"
                          : "var(--app-bg)"
                        : "var(--app-muted)",
                    }}
                  >
                    <i
                      className={`fas ${
                        masteredDays.includes(currentDay)
                          ? "fa-check-double text-xl"
                          : "fa-check text-sm opacity-20"
                      }`}
                    ></i>
                  </motion.button>
                </div>

                <section>
                  <h3 className="text-xs font-black mb-4 uppercase tracking-[0.2em] opacity-50">
                    Core Vocabulary
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {currentLesson.vocab.map((v, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => speak(v.char)}
                        className="p-4 rounded-3xl border shadow-sm flex flex-col items-center justify-center relative min-h-[140px] cursor-pointer transition-all overflow-hidden"
                        style={{
                          backgroundColor: "var(--app-card)",
                          borderColor: "var(--app-border)",
                        }}
                      >
                        <div className="absolute top-3 right-3 opacity-40">
                          <i
                            className="fas fa-volume-up text-[10px]"
                            style={{ color: "var(--app-secondary)" }}
                          ></i>
                        </div>
                        <div
                          className="text-4xl font-bold mb-2"
                          style={{ color: "var(--app-primary)" }}
                        >
                          {v.char}
                        </div>
                        <div
                          className="text-[10px] font-mono font-black uppercase tracking-widest mb-1"
                          style={{ color: "var(--app-secondary)" }}
                        >
                          {v.pinyin}
                        </div>
                        <div className="text-[10px] font-bold opacity-60 text-center px-1 truncate w-full">
                          {v.english}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-black mb-4 uppercase tracking-[0.2em] opacity-50">
                    Context Dialogue
                  </h3>
                  <div className="space-y-4">
                    {currentLesson.dialogue.map((line, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-3xl border relative shadow-sm"
                        style={{
                          backgroundColor: "var(--app-card)",
                          borderColor: "var(--app-border)",
                        }}
                      >
                        <div
                          className="text-[9px] font-black uppercase tracking-widest mb-2"
                          style={{ color: "var(--app-secondary)" }}
                        >
                          Speaker {line.speaker}
                        </div>
                        <div
                          className="text-2xl font-bold mb-2 leading-tight pr-12"
                          style={{ color: "var(--app-primary)" }}
                        >
                          {line.chinese}
                        </div>
                        <div className="text-sm mb-3 font-mono italic opacity-60">
                          {line.pinyin}
                        </div>
                        <div
                          className="text-sm pt-3 border-t font-medium"
                          style={{
                            borderTopColor: "var(--app-border)",
                            color: "var(--app-muted)",
                          }}
                        >
                          {line.english}
                        </div>
                        <button
                          onClick={() => speak(line.chinese)}
                          className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center rounded-2xl active:scale-90 transition-all shadow-inner"
                          style={{ backgroundColor: "var(--app-bg)" }}
                        >
                          <i
                            className="fas fa-volume-up text-sm"
                            style={{ color: "var(--app-primary)" }}
                          ></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === AppTab.FLASHCARDS && (
              <div className="flex flex-col items-center justify-center h-full min-h-[60vh] space-y-6">
                {shuffledVocab.length > 0 ? (
                  <>
                    <div className="text-center">
                      <h2 className="text-2xl font-black mb-1">
                        Drill Day {currentDay}
                      </h2>
                      <p
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: "var(--app-muted)" }}
                      >
                        Card {flashcardIndex + 1} / {shuffledVocab.length}
                      </p>
                    </div>

                    <div
                      className="w-full max-w-sm aspect-[3/4] relative cursor-pointer"
                      onClick={() => setIsFlipped(!isFlipped)}
                    >
                      <motion.div
                        className="w-full h-full relative"
                        initial={false}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{
                          duration: 0.6,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Front */}
                        <div
                          className="absolute inset-0 border-4 rounded-[3rem] flex flex-col items-center justify-center p-10 shadow-2xl"
                          style={{
                            backgroundColor: "var(--app-card)",
                            borderColor: "var(--app-secondary)",
                            backfaceVisibility: "hidden",
                          }}
                        >
                          <div
                            className="text-9xl font-black mb-6"
                            style={{ color: "var(--app-primary)" }}
                          >
                            {shuffledVocab[flashcardIndex]?.char}
                          </div>
                          <div className="animate-pulse text-xs font-black uppercase tracking-[0.3em] opacity-40">
                            Tap to Reveal
                          </div>
                        </div>
                        {/* Back */}
                        <div
                          className="absolute inset-0 rounded-[3rem] flex flex-col items-center justify-center p-10 shadow-2xl"
                          style={{
                            backgroundColor: "var(--app-primary)",
                            color:
                              currentTheme.id === "minimal"
                                ? "#FFF"
                                : "var(--app-bg)",
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                          }}
                        >
                          <div className="text-6xl font-black mb-4 tracking-tighter">
                            {shuffledVocab[flashcardIndex]?.pinyin}
                          </div>
                          <div className="text-3xl font-medium opacity-90">
                            {shuffledVocab[flashcardIndex]?.english}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speak(shuffledVocab[flashcardIndex].char);
                            }}
                            className="mt-12 w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl active:scale-90 transition-transform shadow-lg"
                          >
                            <i className="fas fa-volume-up text-3xl"></i>
                          </button>
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex gap-4 w-full max-w-sm">
                      <button
                        onClick={() =>
                          setShuffledVocab(
                            [...shuffledVocab].sort(() => Math.random() - 0.5)
                          )
                        }
                        className="flex-1 py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all border-2"
                        style={{
                          backgroundColor: "var(--app-card)",
                          borderColor: "var(--app-border)",
                          color: "var(--app-text)",
                        }}
                      >
                        Shuffle
                      </button>
                      <button
                        onClick={() => {
                          setIsFlipped(false);
                          setTimeout(
                            () =>
                              setFlashcardIndex(
                                (flashcardIndex + 1) % shuffledVocab.length
                              ),
                            150
                          );
                        }}
                        className="flex-1 py-5 rounded-2xl font-black uppercase tracking-widest text-white active:scale-95 transition-all shadow-xl"
                        style={{
                          backgroundColor: "var(--app-primary)",
                          color:
                            currentTheme.id === "minimal"
                              ? "#FFF"
                              : "var(--app-bg)",
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    className="text-center p-16 rounded-[3rem] border-2 border-dashed"
                    style={{
                      backgroundColor: "var(--app-card)",
                      borderColor: "var(--app-border)",
                    }}
                  >
                    <i
                      className="fas fa-scroll text-5xl mb-6 opacity-30"
                      style={{ color: "var(--app-primary)" }}
                    ></i>
                    <p
                      className="font-bold text-lg leading-tight"
                      style={{ color: "var(--app-muted)" }}
                    >
                      Review days prioritize list memorization. No new cards.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === AppTab.PRONUNCIATION && (
              <div className="space-y-8 pb-10">
                <header>
                  <h2
                    className="text-3xl font-black mb-2"
                    style={{ color: "var(--app-primary)" }}
                  >
                    Sound Board
                  </h2>
                  <p className="text-sm font-medium opacity-60">
                    Tap any phoneme to hear native pronunciation.
                  </p>
                </header>

                {PRONUNCIATION_DATA.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-4">
                    <div className="pl-1">
                      <h3
                        className="text-xs font-black uppercase tracking-[0.2em]"
                        style={{ color: "var(--app-secondary)" }}
                      >
                        {group.category}
                      </h3>
                      <p className="text-[11px] mt-1 leading-relaxed opacity-60">
                        {group.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {group.sounds.map((sound, sIdx) => (
                        <motion.div
                          key={sIdx}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => speak(sound.audioHint)}
                          className="p-5 rounded-3xl border-2 shadow-sm flex flex-col items-center cursor-pointer transition-all"
                          style={{
                            backgroundColor: "var(--app-card)",
                            borderColor: "var(--app-border)",
                          }}
                        >
                          <div
                            className="text-3xl font-black mb-1"
                            style={{ color: "var(--app-primary)" }}
                          >
                            {sound.pinyin}
                          </div>
                          <div className="text-[10px] font-bold text-center h-8 flex items-center opacity-50">
                            {sound.soundsLike}
                          </div>
                          <div
                            className="mt-3 text-[10px] px-3 py-1.5 rounded-full font-black border"
                            style={{
                              backgroundColor: "var(--app-bg)",
                              color: "var(--app-secondary)",
                              borderColor: "var(--app-border)",
                            }}
                          >
                            Ex: {sound.example}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === AppTab.TONE_GUIDE && (
              <div className="space-y-8 pb-10">
                <header>
                  <h2
                    className="text-3xl font-black mb-2"
                    style={{ color: "var(--app-primary)" }}
                  >
                    The 4 Tones
                  </h2>
                  <p className="text-sm font-medium opacity-60">
                    Pitch changes meaning. Compare the 'ma' quadrant.
                  </p>
                </header>

                <div className="grid gap-4">
                  {TONE_GUIDE_DATA.map((tone, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => speak(tone.character)}
                      className="p-6 rounded-[2.5rem] border-2 flex items-center gap-6 shadow-sm cursor-pointer transition-all hover:border-[var(--app-secondary)]"
                      style={{
                        backgroundColor: "var(--app-card)",
                        borderColor: "var(--app-border)",
                      }}
                    >
                      <div
                        className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl font-black border-4"
                        style={{
                          backgroundColor: "var(--app-bg)",
                          color: "var(--app-primary)",
                          borderColor: "var(--app-secondary)",
                          opacity: 0.9,
                        }}
                      >
                        {tone.mark}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-xl mb-1">{tone.name}</h4>
                        <p className="text-[11px] font-medium opacity-60 leading-tight mb-4">
                          {tone.desc}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] px-3 py-1.5 rounded-xl font-bold"
                            style={{
                              backgroundColor: "var(--app-border)",
                              color: "var(--app-muted)",
                            }}
                          >
                            Ex: {tone.example}
                          </span>
                          <div
                            className="text-sm font-black flex items-center gap-2"
                            style={{ color: "var(--app-primary)" }}
                          >
                            <i className="fas fa-play-circle text-lg"></i>{" "}
                            Listen
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {showFooter && (
        <footer
          className="fixed bottom-0 left-0 right-0 border-t-2 px-4 pt-4 pb-8 z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] transition-all duration-500"
          style={{
            backgroundColor: "var(--app-header)",
            borderColor: "var(--app-border)",
          }}
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
              Timeline Day
            </span>
            <span
              className="text-[10px] font-black flex items-center gap-2"
              style={{ color: "var(--app-secondary)" }}
            >
              Swipe to Jump
              <i className="fas fa-arrow-right opacity-30"></i>
            </span>
          </div>
          <div
            ref={dayScrollRef}
            className="flex overflow-x-auto gap-3 pb-2 scroll-hide px-1"
          >
            {LESSONS.map((lesson) => (
              <motion.button
                key={lesson.day}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setCurrentDay(lesson.day);
                  if (window.navigator.vibrate) window.navigator.vibrate(15);
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-[1.25rem] flex flex-col items-center justify-center transition-all border-4`}
                style={{
                  backgroundColor:
                    currentDay === lesson.day
                      ? "var(--app-primary)"
                      : "var(--app-card)",
                  borderColor:
                    currentDay === lesson.day
                      ? "var(--app-primary)"
                      : masteredDays.includes(lesson.day)
                      ? "var(--app-secondary)"
                      : "var(--app-border)",
                  color:
                    currentDay === lesson.day
                      ? currentTheme.id === "minimal"
                        ? "#FFF"
                        : "var(--app-bg)"
                      : masteredDays.includes(lesson.day)
                      ? "var(--app-secondary)"
                      : "var(--app-muted)",
                  transform:
                    currentDay === lesson.day
                      ? "scale(1.15) translateY(-5px)"
                      : "scale(1)",
                }}
              >
                <span className="text-[9px] font-black uppercase opacity-60 leading-none">
                  D
                </span>
                <span className="text-xl font-black leading-none">
                  {lesson.day}
                </span>
              </motion.button>
            ))}
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
