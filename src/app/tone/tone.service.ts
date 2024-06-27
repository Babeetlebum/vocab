import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToneService {
  // convert tone marks to tone numbers
  convert(pinyin: string): string {
    return pinyin.split(" ").map(convertWord).join(" ");
  }
}

const convertWord = (word: string): string => {
  const tonedCharacter = word.split("").find((character) => map[character]);

  return tonedCharacter ? `${removeAccent(word)}${map[tonedCharacter]}` : word;
};

const removeAccent = (pinyin: string): string =>
  pinyin.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

type Tone = 1 | 2 | 3 | 4;
const map: Record<string, Tone> = {
  ā: 1,
  á: 2,
  ǎ: 3,
  à: 4,
  ē: 1,
  é: 2,
  ě: 3,
  è: 4,
  ī: 1,
  í: 2,
  ǐ: 3,
  ì: 4,
  ō: 1,
  ó: 2,
  ǒ: 3,
  ò: 4,
  ū: 1,
  ú: 2,
  ǔ: 3,
  ù: 4,
  ǚ: 3,
  ǜ: 4,
};
