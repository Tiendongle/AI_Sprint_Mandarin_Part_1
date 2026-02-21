
import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;
import 'models.dart';


// A class to hold all the app's data loaded from JSON
class AppData {
  final List<AppTheme> themes;
  final List<Map<String, String>> toneGuideData;
  final List<Map<String, dynamic>> pronunciationData;
  final List<Lesson> lessons;

  AppData({
    required this.themes,
    required this.toneGuideData,
    required this.pronunciationData,
    required this.lessons,
  });

  factory AppData.fromJson(Map<String, dynamic> json, List<dynamic> lessonsJson) {
    // Parse themes
    final themesList = json['themes'] as List<dynamic>;
    final themes = themesList.map((themeJson) => AppTheme.fromJson(themeJson as Map<String, dynamic>)).toList();

    // Parse tone guide
    final toneList = json['toneGuide'] as List<dynamic>;
    final toneGuideData = toneList.map((item) => (item as Map<String, dynamic>).cast<String, String>()).toList();

    // Parse pronunciation data
    final pronunciationList = json['pronunciation'] as List<dynamic>;
    final pronunciationData = pronunciationList.map((item) => item as Map<String, dynamic>).toList();

    // Parse lessons
    final lessons = lessonsJson.map((lessonJson) => Lesson.fromJson(lessonJson as Map<String, dynamic>)).toList();

    return AppData(
      themes: themes,
      toneGuideData: toneGuideData,
      pronunciationData: pronunciationData,
      lessons: lessons,
    );
  }
}

// A global variable to hold the loaded data.
// It's 'late final' because it will be initialized asynchronously at startup.
late final AppData appData;

// This function must be called once at app startup.
Future<void> loadAppData() async {
  final constantsJsonString = await rootBundle.loadString('assets/data/constants.json');
  final constantsJsonMap = json.decode(constantsJsonString) as Map<String, dynamic>;

  final lessonsJsonString = await rootBundle.loadString('assets/data/lessons.json');
  final lessonsJson = json.decode(lessonsJsonString) as List<dynamic>;

  appData = AppData.fromJson(constantsJsonMap, lessonsJson);
}

// For convenience, we can expose the loaded data through getters.
List<AppTheme> get themes => appData.themes;
List<Map<String, String>> get toneGuideData => appData.toneGuideData;
List<Map<String, dynamic>> get pronunciationData => appData.pronunciationData;
List<Lesson> get lessons => appData.lessons;
