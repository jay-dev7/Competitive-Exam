# Competitive Exam Practice CLI

A minimal command-line mock test app for competitive exam preparation.

## Run

```bash
python run.py
```

## Useful options

```bash
python run.py --limit 5 --shuffle --show-explanations
python run.py --file questions.json --limit 10
```

## Question format

`questions.json` is an array of objects:

```json
{
  "prompt": "Question text",
  "options": ["A", "B", "C", "D"],
  "answer": 2,
  "explanation": "Optional explanation"
}
```

- `answer` is 1-based index of the correct option.
- Add your own subject-wise question banks and pass them with `--file`.
