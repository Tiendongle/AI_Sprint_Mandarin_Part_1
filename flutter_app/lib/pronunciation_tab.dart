
import 'package:flutter/material.dart';
import 'models.dart';
import 'constants.dart';
import 'audio_helper.dart';

class PronunciationTab extends StatelessWidget {
  final AppTheme theme;

  const PronunciationTab({super.key, required this.theme});

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
            children: (category['sounds'] as List<Map<String, String>>).map((sound) {
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(sound['pinyin']!, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: theme.text)),
                        Text(sound['soundsLike']!, style: TextStyle(fontSize: 12, color: theme.muted)),
                      ],
                    ),
                    Row(
                      children: [
                        Text(sound['example']!, style: TextStyle(fontSize: 16, color: theme.secondary)),
                        IconButton(
                          icon: Icon(Icons.volume_up, color: theme.accent),
                          onPressed: () => AudioHelper().speak(sound['pinyin']!),
                        ),
                      ],
                    )
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
