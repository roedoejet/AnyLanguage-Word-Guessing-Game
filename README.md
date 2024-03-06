# Any-Language Word Guessing Game

## Changes in this fork

I've adapted this code to allow for simply adapting it to another language. The wordlist and orthography (writing system) here are for the Gitksan language, but this repository is meant to be adapted to other languages. I've also added a script for publishing on GitHub Pages.

_Summary of changes_

- Allow letters in the "orthography.ts" to be digraphs or multigraphs (letters that are more than one character)
- Allow more or less atempts than 6
- Allow the length of words to be more or less than 5
- Added a configuration file to define language-specific metadata
- Added functionality for free deployment to GitHub Pages
- Dynamically render the keyboard based on the defined orthography
- Use Unicode normalization by default
- Use BC Sans open source font to better render Indigenous language orthographies in BC, Canada. See the blog to change the font
- Complete localization/translateability of the interface using react-i18next

_To adapt for your language (the basics):_

1. Change the file in `src/constants/orthography.ts` to use your language's writing system.
2. Change the file in `src/constants/wordlist.ts` to use your language's words.
3. Change the file in `src/constants/validGuesses.ts` to include all valid guesses for your language.
4. Change the file in `src/constants/config.ts` to include meta data about your language. If your language needs words longer or shorter than 5, you can set that in this file and also set the number of tries.
5. Publish on GitHub Pages by changing the `homepage` key in `package.json` and running `npm run deploy` or just committing to the main branch (and a GitHub workflow will take care of the rest).

For more information, including how to localize the interface to your language, visit the blog article: https://blog.mothertongues.org/word-guessing-game/.

The interface is translated by default in English, Kiswahili, Mandarin and Spanish - other translations are very welcome!  To add translations please submit a pull request with the following steps:

1. Add an appropriate localiztion file in `public/locales`
2. Update the other localization files in `public/locales` to include the additional langauge
3. Update the `CONFIG.availableLangs` variable in `src/constants/config.ts` to include your language. 

Thanks to Carolyn O'Meara (https://github.com/ckomeara) for providing the Spanish translation.
Thanks to Haowen Jiang (https://github.com/howard-haowen) for providing the 中文 translation.
Thanks to Benson Muite (https://github.com/bkmgit) for providing the Kiswahili translation.

_To Run Locally:_
Clone the repository and perform the following command line actions:
```bash
$ cd anylanguage-word-guessing-game
$ npm install
$ npm run start
```

_To build/run docker container:_
```bash
$ docker build -t anylanguage-word-guessing-game .
$ docker run -d -p 3000:3000 anylanguage-word-guessing-game
```
open http://localhost:3000 in browser.

