# Any-Language Wordle Clone

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

For more information, including how to localize the interface to your language, visit the blog article: https://blog.mothertongues.org/wordle/.

The interface is translated by default in both English and Spanish - other translations are very welcome! 

Thanks to Carolyn O'Meara (https://github.com/ckomeara) for providing the Spanish translation.


## Project built upon *AnyLanguage-Wordle*

| Language | Repository | Website | Note |
| --- | --- | --- | --- |
| Bardi | [`chirila/Ngaankordle`](https://github.com/chirila/Ngaankordle/) | [Not Wordle — Bardi Ngaanka](https://chirila.github.io/Ngaankordle/) | |
| Comanche | [`kbridwel/Comanche-NotWordle`](https://github.com/kbridwel/Comanche-NotWordle5) | [Not Wordle — Nʉmʉtekwapʉ̠](https://kbridwel.github.io/Comanche-NotWordle5/) | |
| Gamilaraay | [`darcy-r/AnyLanguage-Wordl`](https://github.com/darcy-r/AnyLanguage-Wordle) | [Not Wordle — Gamilaraay](https://darcy-r.github.io/AnyLanguage-Wordle/) | |
| Iñupiaq | [`ilisaqativut/AnyLanguage-Wordle`](https://github.com/ilisaqativut/AnyLanguage-Wordle) | [Not Wordle — Iñupiaq (NS)](https://ilisaqativut.github.io/AnyLanguage-Wordle/) | |
| Japanese | [`fronoske/wordle48`](https://github.com/fronoske/wordle48) | [Wordle48](https://fronoske.github.io/wordle48/) | [48G](https://jpop.fandom.com/wiki/48G) groups
| Lineparine | [`Fafsfalira/Lineparine-Wordle`](https://github.com/Fafsfalira/Lineparine-Wordle) | [Not Wordle — Lineparine](https://fafsfalira.github.io/Lineparine-Wordle/) | A conlang |
| Malecite–Passamaquoddy | [`DiegoBear/Wolastoqey-Wordle`](https://github.com/DiegoBear/Wolastoqey-Wordle) | [Not Wordle — Wolastoqey](https://diegobear.github.io/Wolastoqey-Wordle/) | |
| Maltese | [`daleschembri/xkelma`](https://github.com/daleschembri/xkelma) | [Not Wordle — Maltese](https://daleschembri.github.io/xkelma/) | |
| Seri | [`ckomeara/Seri-Wordle`](https://github.com/ckomeara/Seri-Wordle) | [Not Wordle — Seri](https://ckomeara.github.io/Seri-Wordle/) | |
| Somali | [`SomaliWordle/SomaliWordle.github.io`](https://github.com/SomaliWordle/SomaliWordle.github.io) | [Somali Wordle](https://somaliwordle.github.io/) | |
| Vietnamese | [`Chithanh123/AnyLanguage-Wordle`](https://github.com/Chithanh123/AnyLanguage-Wordle) | [Từ Khóa](https://chithanh123.github.io/AnyLanguage-Wordle/) | |
| Yiddish | [`alephreish/yiddish-wordle`](https://github.com/alephreish/yiddish-wordle) | [יידיש וואָרדל](https://alephreish.github.io/yiddish-wordle/) | Traditional orthography |

In order to add a derivative version missing from the above list, create a suitable [pull request](https://github.com/roedoejet/AnyLanguage-Wordle/pulls) (edit `README.md`) or contact [Aidan Pine](mailto://hello@aidanpine.ca) (the developer of *AnyLanguage-Wordle*).

For a general list of Wordle-like games in various languages, including the above, see [Wordles of the World](https://rwmpelstilzchen.gitlab.io/wordles/).


## On to the original stuff from @hannahcode...

- Go play the real Wordle [here](https://www.powerlanguage.co.uk/wordle/)
- Read the story behind it [here](https://www.nytimes.com/2022/01/03/technology/wordle-word-game-creator.html)
- Try a demo of this clone project [here](https://wordle.hannahmariepark.com)

_Inspiration:_
This game is an open source clone of the immensely popular online word guessing game Wordle. Like many others all over the world, I saw the signature pattern of green, yellow, and white squares popping up all over social media and the web and had to check it out. After a few days of play, I decided it would be great for my learning to try to rebuild Wordle in React!

_Design Decisions:_
I used a combination of React, Typescript, and Tailwind to build this Wordle Clone. When examining the original Wordle, I assumed the list might come from an external API or database, but after investigating in chrome dev tools I found that the list of words is simply stored in an array on the front end. I'm using the same list as the OG Wordle uses, but watch out for spoilers if you go find the file in this repo! The word match functionality is simple: the word array index increments each day from a fixed game epoch timestamp (only one puzzle per day!) roughly like so:

```
WORDS[Math.floor((NOW_IN_MS - GAME_EPOCH_IN_MS) / ONE_DAY_IN_MS)]
```

React enabled me to componentize the littlest parts of the game - keys and letter cells - and use them as the building blocks for the keyboard, word grid, and winning solution graphic. As for handling state, I used the built in useState and useEffect hooks to track guesses, whether the game is won, and to conditionally render popups.

In addition to other things, Typescript helped ensure type safety for the statuses of each guessed letter, which were used in many areas of the app and needed to be accurate for the game to work correctly.

I implemented Tailwind mostly because I wanted to learn how to use Tailwind CSS, but I also took advantage of [Tailwind UI](https://tailwindui.com/) with their [headless package](https://headlessui.dev/) to build the modals and notifications. This was such an easy way to build simple popups for how to play, winning the game, and invalid words.

_To Run Locally:_
Clone the repository and perform the following command line actions:
```bash
$ cd wordle
$ npm install
$ npm run start
```

_To build/run docker container:_
```bash
$ docker build -t notwordle .
$ docker run -d -p 3000:3000 notwordle
```
open http://localhost:3000 in browser.

