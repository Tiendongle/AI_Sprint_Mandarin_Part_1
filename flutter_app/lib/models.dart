
import 'package:flutter/material.dart';

class Lesson {
  final int day;
  final String title;
  final List<VocabItem> vocab;
  final List<DialogueLine> dialogue;

  Lesson({
    required this.day,
    required this.title,
    required this.vocab,
    required this.dialogue,
  });

  factory Lesson.fromJson(Map<String, dynamic> json) {
    var vocabFromJson = json['vocab'] as List;
    List<VocabItem> vocabList = vocabFromJson.map((v) => VocabItem.fromList((v as List).cast<String>())).toList();
    
    var dialogueFromJson = json['dialogue'] as List;
    List<DialogueLine> dialogueList = dialogueFromJson.map((d) => DialogueLine.fromJson(d)).toList();

    return Lesson(
      day: json['day'] as int,
      title: json['title'] as String,
      vocab: vocabList,
      dialogue: dialogueList,
    );
  }
}

class VocabItem {
  final String char;
  final String pinyin;
  final String english;

  VocabItem({required this.char, required this.pinyin, required this.english});

  factory VocabItem.fromList(List<String> list) {
    return VocabItem(char: list[0], pinyin: list[1], english: list[2]);
  }
}

class DialogueLine {
  final String speaker;
  final String chinese;
  final String pinyin;
  final String english;

  DialogueLine({required this.speaker, required this.chinese, required this.pinyin, required this.english});

  factory DialogueLine.fromJson(Map<String, dynamic> json) {
    return DialogueLine(
      speaker: json['speaker'] as String,
      chinese: json['chinese'] as String,
      pinyin: json['pinyin'] as String,
      english: json['english'] as String,
    );
  }
}

@immutable
class AppTheme {
  final String id;
  final String name;
  final Color bg;
  final Color header;
  final Color card;
  final Color primary;
  final Color secondary;
  final Color accent;
  final Color text;
  final Color muted;
  final Color border;

  const AppTheme({
    required this.id,
    required this.name,
    required this.bg,
    required this.header,
    required this.card,
    required this.primary,
    required this.secondary,
    required this.accent,
    required this.text,
    required this.muted,
    required this.border,
  });

  factory AppTheme.fromJson(Map<String, dynamic> json) {
    return AppTheme(
      id: json['id'] as String,
      name: json['name'] as String,
      bg: _colorFromHex(json['bg'] as String),
      header: _colorFromHex(json['header'] as String),
      card: _colorFromHex(json['card'] as String),
      primary: _colorFromHex(json['primary'] as String),
      secondary: _colorFromHex(json['secondary'] as String),
      accent: _colorFromHex(json['accent'] as String),
      text: _colorFromHex(json['text'] as String),
      muted: _colorFromHex(json['muted'] as String),
      border: _colorFromHex(json['border'] as String),
    );
  }

  static AppTheme defaultTheme() {
    return const AppTheme(
        id: 'default',
        name: 'Default',
        bg: Colors.white,
        header: Colors.blue,
        card: Colors.white,
        primary: Colors.blue,
        secondary: Colors.lightBlue,
        accent: Colors.amber,
        text: Colors.black,
        muted: Colors.grey,
        border: Colors.grey,
    );
  }
}

Color _colorFromHex(String hexColor) {
  final hexCode = hexColor.replaceAll('#', '');
  return Color(int.parse('FF$hexCode', radix: 16));
}
