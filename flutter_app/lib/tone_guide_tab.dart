
import 'package:flutter/material.dart';
import 'models.dart';
import 'constants.dart';
import 'audio_helper.dart';

class ToneGuideTab extends StatelessWidget {
  final AppTheme theme;

  const ToneGuideTab({super.key, required this.theme});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemCount: toneGuideData.length,
      itemBuilder: (context, index) {
        final tone = toneGuideData[index];
        return Card(
          color: theme.card,
          elevation: 1.0,
          margin: const EdgeInsets.symmetric(vertical: 8.0),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0)),
          child: InkWell(
            borderRadius: BorderRadius.circular(16.0),
            onTap: () => AudioHelper().speak(tone['character']!),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  Text(tone['mark']!, style: TextStyle(fontSize: 48, color: theme.primary, fontWeight: FontWeight.bold)),
                  const SizedBox(width: 16.0),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(tone['name']!, style: TextStyle(fontSize: 16, color: theme.text, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 4.0),
                        Text(tone['desc']!, style: TextStyle(fontSize: 14, color: theme.muted)),
                      ],
                    ),
                  ),
                  const SizedBox(width: 16.0),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(tone['character']!, style: TextStyle(fontSize: 32, color: theme.secondary, fontWeight: FontWeight.bold)),
                      Text(tone['example']!, style: TextStyle(fontSize: 12, color: theme.muted)),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
