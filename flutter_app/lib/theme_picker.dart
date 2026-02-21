
import 'package:flutter/material.dart';
import 'models.dart';
import 'constants.dart';

class ThemePicker extends StatelessWidget {
  final Function(AppTheme) onThemeChanged;

  const ThemePicker({super.key, required this.onThemeChanged});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Select a Theme'),
      content: SizedBox(
        width: double.maxFinite,
        child: ListView.builder(
          shrinkWrap: true,
          itemCount: themes.length,
          itemBuilder: (context, index) {
            final theme = themes[index];
            return ListTile(
              title: Text(theme.name),
              leading: CircleAvatar(
                backgroundColor: theme.primary,
              ),
              onTap: () {
                onThemeChanged(theme);
                Navigator.of(context).pop();
              },
            );
          },
        ),
      ),
    );
  }
}
