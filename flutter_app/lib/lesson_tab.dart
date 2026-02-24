
import 'package:flutter/material.dart';
import 'models.dart';
import 'audio_helper.dart';

class LessonTab extends StatelessWidget {
  final Lesson lesson;
  final AppTheme theme;

  const LessonTab({super.key, required this.lesson, required this.theme});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        _buildHeader(),
        const SizedBox(height: 24.0),
        _buildVocabulary(),
        const SizedBox(height: 24.0),
        _buildDialogue(),
      ],
    );
  }

  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Day ${lesson.day}',
          style: TextStyle(fontSize: 12.0, color: theme.muted, fontWeight: FontWeight.bold, letterSpacing: 1.2),
        ),
        Text(
          lesson.title,
          style: TextStyle(fontSize: 28.0, color: theme.primary, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _buildVocabulary() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Core Vocabulary',
          style: TextStyle(fontSize: 12.0, color: theme.muted, fontWeight: FontWeight.bold, letterSpacing: 1.2),
        ),
        const SizedBox(height: 8.0),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 8.0,
            mainAxisSpacing: 8.0,
            childAspectRatio: 1.5,
          ),
          itemCount: lesson.vocab.length,
          itemBuilder: (context, index) {
            final vocabItem = lesson.vocab[index];
            return Card(
              color: theme.card,
              elevation: 1.0,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0)),
              child: InkWell(
                borderRadius: BorderRadius.circular(16.0),
                onTap: () => AudioHelper().speak(vocabItem.char),
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(vocabItem.char, style: TextStyle(fontSize: 32.0, color: theme.primary, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 4.0),
                      Text(vocabItem.pinyin, style: TextStyle(fontSize: 12.0, color: theme.secondary, fontFamily: 'monospace')),
                      const SizedBox(height: 4.0),
                      Text(vocabItem.english, style: TextStyle(fontSize: 12.0, color: theme.muted), textAlign: TextAlign.center),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildDialogue() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Context Dialogue',
          style: TextStyle(fontSize: 12.0, color: theme.muted, fontWeight: FontWeight.bold, letterSpacing: 1.2),
        ),
        const SizedBox(height: 8.0),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: lesson.dialogue.length,
          itemBuilder: (context, index) {
            final dialogueLine = lesson.dialogue[index];
            return Card(
              color: theme.card,
              elevation: 1.0,
              margin: const EdgeInsets.symmetric(vertical: 4.0),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0)),
              child: InkWell(
                borderRadius: BorderRadius.circular(16.0),
                onTap: () => AudioHelper().speak(dialogueLine.chinese),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Speaker ${dialogueLine.speaker}', style: TextStyle(fontSize: 10.0, color: theme.secondary, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                      const SizedBox(height: 8.0),
                      Text(dialogueLine.chinese, style: TextStyle(fontSize: 20.0, color: theme.primary, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 4.0),
                      Text(dialogueLine.pinyin, style: TextStyle(fontSize: 14.0, color: theme.muted, fontStyle: FontStyle.italic, fontFamily: 'monospace')),
                      const Divider(height: 24.0),
                      Text(dialogueLine.english, style: TextStyle(fontSize: 14.0, color: theme.text)),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}
