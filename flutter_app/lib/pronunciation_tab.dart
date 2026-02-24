
import 'package:flutter/material.dart';
import 'audio_helper.dart';
import 'models.dart';

class PronunciationTab extends StatelessWidget {
  final List<Map<String, dynamic>> pronunciationData;
  final AppTheme theme;

  const PronunciationTab({super.key, required this.pronunciationData, required this.theme});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: pronunciationData.length,
      itemBuilder: (context, index) {
        final category = pronunciationData[index];
        return Card(
          margin: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
          color: theme.card,
          elevation: 2.0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0)),
          child: ExpansionTile(
            title: Text(category['category'] as String, style: TextStyle(color: theme.primary, fontWeight: FontWeight.bold)),
            subtitle: Text(category['description'] as String, style: TextStyle(color: theme.muted)),
            children: (category['sounds'] as List<dynamic>).map((soundData) {
              final sound = soundData as Map<String, dynamic>;
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                child: Row(
                  children: [
                    Text(sound['pinyin'] as String, style: TextStyle(fontSize: 18.0, color: theme.primary, fontWeight: FontWeight.bold, fontFamily: 'monospace')),
                    const SizedBox(width: 16.0),
                    Text(sound['example'] as String, style: TextStyle(fontSize: 18.0, color: theme.text)),
                    const Spacer(),
                    IconButton(
                      icon: Icon(Icons.volume_up, color: theme.secondary),
                      onPressed: () => AudioHelper().speak(sound['pinyin'] as String),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        );
      },
    );
  }
}
