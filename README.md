# SUBJECT 96 translations

The card and keyword text of SUBJECT 96, for translators. Adults-only fiction (18+): every character is an adult.
This repo holds words only. No game code, art or build is here.

## The sheets

One file per language, for example `zh-TW.tsv`. Each has three columns:

| key | english | translation |
|---|---|---|
| `cards.kael_strike.text` | `Deal {damage} damage.` | your text goes here |

Fill the third column. Leave a line empty and it stays English in the game, so a half-finished sheet is always fine.
Never change the first two columns.

## How to work on a sheet (no git needed)

1. Open the sheet here on GitHub and press the **Download raw file** button (the arrow at the top right of the file).
2. Open it in Google Sheets or LibreOffice (File > Import, separator: Tab, encoding: UTF-8). Excel can break Chinese
   text in a `.tsv`, so the other two are safer.
3. Fill the translation column. Save or download it as **Tab-separated values (.tsv)** with the same file name.
4. Back here: **Add file > Upload files**, drop your file in, and press **Commit changes**. It replaces the old one.

Upload as often as you like. Every upload is kept in the history, so nothing you send is ever lost.
Each upload is checked against the rules below, and you hear back if a line needs a fix.

## Rules for the text

1. Keep every `{placeholder}` exactly as it is, once each: `{damage}`, `{stacks}`, `{n}`. The game puts a number there.
   You may move it inside your sentence.
2. `{{a|b}}` is a switch on the player's body: the first side is read with a cage, the second with a belt. Translate
   both sides and keep the braces and the bar: `{{cage|belt}}` becomes `{{籠|貞操帶}}`.
3. Keep tags like `<b>` and `</b>` around the matching words, and add no others.
4. Keyword names (keys `keywords.<id>.name`, such as Fury, Denial, Edge) appear inside card text. Use the very same
   word for a keyword everywhere.
5. No `&` character. At most 600 characters in one line.
6. Character names (Kael, Silth, Argent) can stay as they are.

## For maintainers

`node tools/check.mjs zh-TW.tsv` runs the same check locally. The sheets are cut from the game with
`tools/i18n-export.mjs` and go back in with `tools/workshop-from-kit.mjs` or `tools/i18n-check.mjs`.
