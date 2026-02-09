import { enGb } from "./en-gb";
import { enUs } from "./en-us";
import { esEs } from "./es-es";
import { frFr } from "./fr-fr";
import { deDe } from "./de-de";
import { itIt } from "./it-it";
import { ptBr } from "./pt-br";
import { ruRu } from "./ru-ru";
import { zhCn } from "./zh-cn";
import { jaJp } from "./ja-jp";

export const translations = {
  "en-gb": enGb,
  "en-us": enUs,
  "es-es": esEs,
  "fr-fr": frFr,
  "de-de": deDe,
  "it-it": itIt,
  "pt-br": ptBr,
  "ru-ru": ruRu,
  "zh-cn": zhCn,
  "ja-jp": jaJp,
};

export type LocaleType = keyof typeof translations;
export type TranslationSchema = typeof enGb;
