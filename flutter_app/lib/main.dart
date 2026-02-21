
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'models.dart';
import 'constants.dart'; // Updated import
import 'lesson_tab.dart';
import 'flashcards_tab.dart';
import 'pronunciation_tab.dart';
import 'tone_guide_tab.dart';
import 'theme_picker.dart';

// main is now async
void main() async {
  // Ensure Flutter is initialized.
  WidgetsFlutterBinding.ensureInitialized();
  // Load all app data from constants.json
  await loadAppData();
  // Run the app
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mandarin Sprint',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'sans-serif',
      ),
      home: const MainPage(),
      debugShowCheckedModeBanner: false, // Hides the debug banner
    );
  }
}

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _currentDay = 1;
  // Initialize theme from the globally loaded data
  AppTheme _currentTheme = themes.isNotEmpty ? themes[0] : AppTheme.defaultTheme();
  int _masteredDays = 0;

  @override
  void initState() {
    super.initState();
    _loadProgress();
  }

  Future<void> _loadProgress() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _currentDay = prefs.getInt('currentDay') ?? 1;
      // Use the new themes list (from constants.dart getter)
      final themeName = prefs.getString('themeName') ?? (themes.isNotEmpty ? themes[0].name : 'midnight');
      _currentTheme = themes.firstWhere((t) => t.name == themeName, orElse: () => themes.isNotEmpty ? themes[0] : AppTheme.defaultTheme());
      _masteredDays = prefs.getInt('masteredDays') ?? 0;
    });
  }

  Future<void> _saveProgress() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('currentDay', _currentDay);
    await prefs.setString('themeName', _currentTheme.name);
    await prefs.setInt('masteredDays', _masteredDays);
  }

  void _changeTheme(AppTheme theme) {
    setState(() {
      _currentTheme = theme;
    });
    _saveProgress();
  }

  void _changeDay(int day) {
    // Ensure lessons list is not empty before trying to change the day
    if (lessons.isNotEmpty) {
        setState(() {
        _currentDay = day;
      });
      _saveProgress();
    }
  }

  void _showThemePicker() {
    showDialog(
      context: context,
      builder: (context) => ThemePicker(onThemeChanged: _changeTheme),
    );
  }

  Future<void> _resetProgress() async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Reset Progress?'),
        content: const Text('Are you sure you want to reset all of your progress?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Reset'),
          ),
        ],
      ),
    );

    if (confirmed ?? false) {
      setState(() {
        _currentDay = 1;
        // Reset to the first theme in the loaded list
        _currentTheme = themes.isNotEmpty ? themes[0] : AppTheme.defaultTheme();
        _masteredDays = 0;
      });
      _saveProgress();
    }
  }

  @override
  Widget build(BuildContext context) {
    // Handle the case where lesson data is not yet loaded or is empty.
    if (lessons.isEmpty) {
      return Scaffold(
        backgroundColor: _currentTheme.bg,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(color: _currentTheme.primary),
              const SizedBox(height: 16),
              Text('Initializing lesson data...', style: TextStyle(color: _currentTheme.text)),
            ],
          ),
        ),
      );
    }

    final Lesson currentLesson = lessons.firstWhere((lesson) => lesson.day == _currentDay, orElse: () => lessons[0]);

    return DefaultTabController(
      length: 4,
      child: Scaffold(
        backgroundColor: _currentTheme.bg,
        appBar: AppBar(
          backgroundColor: _currentTheme.header,
          elevation: 4.0,
          title: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                '30-Day Sprint',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.palette),
                    onPressed: _showThemePicker,
                  ),
                  TextButton(
                    onPressed: _resetProgress,
                    child: const Text('Reset'),
                  ),
                ],
              ),
            ],
          ),
          bottom: TabBar(
            indicatorColor: _currentTheme.primary,
            labelColor: _currentTheme.primary,
            unselectedLabelColor: _currentTheme.muted,
            tabs: const [
              Tab(text: 'LESSON'),
              Tab(text: 'FLASHCARDS'),
              Tab(text: 'SOUNDS'),
              Tab(text: 'TONES'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            LessonTab(lesson: currentLesson, theme: _currentTheme),
            FlashcardsTab(lesson: currentLesson, theme: _currentTheme),
            PronunciationTab(theme: _currentTheme),
            ToneGuideTab(theme: _currentTheme),
          ],
        ),
        bottomNavigationBar: _buildDaySelector(),
      ),
    );
  }

  Widget _buildDaySelector() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 8.0),
      color: _currentTheme.header,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(left: 8.0, bottom: 8.0),
            child: Text(
              'Timeline Day',
              style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.bold, letterSpacing: 1.2),
            ),
          ),
          SizedBox(
            height: 60,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: lessons.length,
              itemBuilder: (context, index) {
                final lesson = lessons[index];
                final isSelected = lesson.day == _currentDay;
                final isMastered = lesson.day <= _masteredDays;
                return GestureDetector(
                  onTap: () => _changeDay(lesson.day),
                  child: Container(
                    width: 60,
                    margin: const EdgeInsets.symmetric(horizontal: 4.0),
                    decoration: BoxDecoration(
                      color: isSelected ? _currentTheme.primary : (isMastered ? _currentTheme.secondary : _currentTheme.card),
                      borderRadius: BorderRadius.circular(12.0),
                      border: Border.all(
                        color: isSelected ? _currentTheme.primary : _currentTheme.border,
                        width: 2.0,
                      ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('D', style: TextStyle(fontSize: 10.0, color: isSelected ? _currentTheme.bg : _currentTheme.muted, fontWeight: FontWeight.bold)),
                        Text('${lesson.day}', style: TextStyle(fontSize: 18.0, color: isSelected ? _currentTheme.bg : _currentTheme.text, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
