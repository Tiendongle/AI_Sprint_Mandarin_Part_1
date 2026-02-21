
import 'package:flutter/material.dart';
import 'models.dart';
import 'dart:math';
import 'audio_helper.dart';

class FlashcardsTab extends StatefulWidget {
  final Lesson lesson;
  final AppTheme theme;

  const FlashcardsTab({super.key, required this.lesson, required this.theme});

  @override
  State<FlashcardsTab> createState() => _FlashcardsTabState();
}

class _FlashcardsTabState extends State<FlashcardsTab> {
  bool _isFlipped = false;
  int _flashcardIndex = 0;
  late List<VocabItem> _shuffledVocab;

  @override
  void initState() {
    super.initState();
    _shuffledVocab = List.from(widget.lesson.vocab)..shuffle();
  }

  @override
  void didUpdateWidget(FlashcardsTab oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.lesson != oldWidget.lesson) {
      setState(() {
        _shuffledVocab = List.from(widget.lesson.vocab)..shuffle();
        _flashcardIndex = 0;
        _isFlipped = false;
      });
    }
  }

  void _shuffle() {
    setState(() {
      _shuffledVocab.shuffle();
      _flashcardIndex = 0;
      _isFlipped = false;
    });
  }

  void _nextCard() {
    setState(() {
      _isFlipped = false;
      if (_shuffledVocab.isNotEmpty) {
        _flashcardIndex = (_flashcardIndex + 1) % _shuffledVocab.length;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_shuffledVocab.isEmpty) {
      return Center(
        child: Text(
          'No flashcards available for this lesson.',
          style: TextStyle(color: widget.theme.text),
        ),
      );
    }

    final vocabItem = _shuffledVocab[_flashcardIndex];

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Drill Day ${widget.lesson.day}',
            style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.bold, color: widget.theme.text),
          ),
          Text(
            'Card ${_flashcardIndex + 1} / ${_shuffledVocab.length}',
            style: TextStyle(fontSize: 12.0, color: widget.theme.muted, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 24.0),
          GestureDetector(
            onTap: () => setState(() => _isFlipped = !_isFlipped),
            child: _buildFlipCard(vocabItem),
          ),
          const SizedBox(height: 24.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: widget.theme.card,
                  foregroundColor: widget.theme.text,
                ),
                onPressed: _shuffle,
                child: const Text('Shuffle'),
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: widget.theme.primary,
                  foregroundColor: widget.theme.bg,
                ),
                onPressed: _nextCard,
                child: const Text('Next'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFlipCard(VocabItem vocabItem) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 600),
      transitionBuilder: (Widget child, Animation<double> animation) {
        final rotate = Tween(begin: pi, end: 0.0).animate(animation);
        return AnimatedBuilder(
          animation: rotate,
          builder: (BuildContext context, Widget? child) {
            final isUnder = (ValueKey(_isFlipped) != child?.key);
            var tilt = ((animation.value - 0.5).abs() - 0.5) * 0.003;
            tilt *= isUnder ? -1.0 : 1.0;
            final value = isUnder ? min(rotate.value, pi / 2) : rotate.value;
            return Transform(
              transform: Matrix4.rotationY(value)..setEntry(3, 0, tilt),
              alignment: Alignment.center,
              child: child,
            );
          },
          child: _isFlipped ? _buildCardFace(vocabItem, false) : _buildCardFace(vocabItem, true),
        );
      },
      child: const SizedBox.shrink(),
    );
  }

  Widget _buildCardFace(VocabItem vocabItem, bool isFront) {
    return Card(
      key: ValueKey(isFront),
      color: isFront ? widget.theme.card : widget.theme.primary,
      elevation: 4.0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(32.0)),
      child: SizedBox(
        width: 300,
        height: 400,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: isFront
                ? [
                    Text(vocabItem.char, style: TextStyle(fontSize: 96, fontWeight: FontWeight.bold, color: widget.theme.primary)),
                    IconButton(
                      icon: Icon(Icons.volume_up, color: widget.theme.accent, size: 32),
                      onPressed: () => AudioHelper().speak(vocabItem.char),
                    )
                  ]
                : [
                    Text(vocabItem.pinyin, style: TextStyle(fontSize: 48, color: widget.theme.bg, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 16),
                    Text(vocabItem.english, style: TextStyle(fontSize: 32, color: widget.theme.bg)),
                    const SizedBox(height: 16),
                    IconButton(
                      icon: Icon(Icons.volume_up, color: widget.theme.bg, size: 32),
                      onPressed: () => AudioHelper().speak(vocabItem.char),
                    ),
                  ],
          ),
        ),
      ),
    );
  }
}
