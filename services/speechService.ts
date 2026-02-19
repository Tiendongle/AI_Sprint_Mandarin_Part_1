
export const speak = (text: string) => {
  if (!window.speechSynthesis) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.9; // Slightly slower for learners
  utterance.pitch = 1.0;
  
  window.speechSynthesis.speak(utterance);
};
