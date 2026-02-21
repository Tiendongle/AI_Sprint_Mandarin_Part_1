
// IMPORTANT: Add the following dependency to your pubspec.yaml file for this to work:
//
// dependencies:
//   flutter:
//     sdk: flutter
//   flutter_tts: ^4.0.2 // Add this line

import 'package:flutter_tts/flutter_tts.dart';

class AudioHelper {
  // Singleton pattern to ensure a single instance of the TTS engine
  static final AudioHelper _instance = AudioHelper._internal();
  factory AudioHelper() {
    return _instance;
  }

  final FlutterTts _flutterTts = FlutterTts();

  AudioHelper._internal() {
    _initTts();
  }

  // Initializes the TTS engine with the Chinese language
  Future<void> _initTts() async {
    await _flutterTts.setLanguage("zh-CN");
    await _flutterTts.setSpeechRate(0.4);
    await _flutterTts.setPitch(1.0);
  }

  // Speaks the given text
  Future<void> speak(String text) async {
    await _flutterTts.speak(text);
  }
}
