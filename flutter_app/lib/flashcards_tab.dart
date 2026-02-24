
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

class _FlashcardsTabState extends State<FlashcardsTab> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  int _flashcardIndex = 0;
  late List<VocabItem> _shuffledVocab;

  @override
  void initState() {
    super.initState();
    _shuffledVocab = List.from(widget.lesson.vocab)..shuffle();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(FlashcardsTab oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.lesson != oldWidget.lesson) {
      setState(() {
        _shuffledVocab = List.from(widget.lesson.vocab)..shuffle();
        _flashcardIndex = 0;
        _controller.reset();
      });
    }
  }

  void _shuffle() {
    setState(() {
      _shuffledVocab.shuffle();
      _flashcardIndex = 0;
      _controller.reset();
    });
  }

  void _nextCard() {
    setState(() {
      if (_shuffledVocab.isNotEmpty) {
        _flashcardIndex = (_flashcardIndex + 1) % _shuffledVocab.length;
      }
      _controller.reset();
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
            onTap: () {
              if (_controller.status == AnimationStatus.dismissed || _controller.status == AnimationStatus.reverse) {
                _controller.forward();
              } else {
                _controller.reverse();
              }
            },
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
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final isFlipped = _controller.value >= 0.5;
        final cardFace = isFlipped ? _buildCardFace(vocabItem, false) : _buildCardFace(vocabItem, true);

        return Transform(
          alignment: Alignment.center,
          transform: Matrix4.identity()
            ..setEntry(3, 2, 0.001) // perspective
            ..rotateY(_controller.value * pi),
          child: isFlipped ? Transform(transform: Matrix4.rotationY(pi), alignment: Alignment.center, child: cardFace) : cardFace,
        );
      },
    );
  }

  Widget _buildCardFace(VocabItem vocabItem, bool isFront) {
    return Card(
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
                      icon: Icon(Icons.volume_up, color: widget.theme.secondary, size: 32),
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
