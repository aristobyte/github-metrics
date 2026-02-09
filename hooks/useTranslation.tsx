"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  translations,
  type TranslationSchema,
  type LocaleType,
} from "../translations";
import { CONFIG } from "../config";

const FALLBACK_LOCALE = CONFIG.locales.fallback;

type TranslationContextValue = {
  locale: string;
  t: (key: string, token?: string, value?: string | number) => string;
  tLocale: (
    locale: LocaleType,
    key: string,
    token?: string,
    value?: string | number,
  ) => string;
};

const TranslationContext = createContext<TranslationContextValue>({
  locale: FALLBACK_LOCALE,
  t: () => "",
  tLocale: () => "",
});

function resolveLocale(pathname: string | null): LocaleType {
  if (!pathname) return FALLBACK_LOCALE;
  const segment = pathname.split("/")[1]?.toLowerCase() as LocaleType;
  if (segment && CONFIG.locales.supported.includes(segment)) {
    return segment;
  }
  return FALLBACK_LOCALE;
}

function getValueByPath(source: TranslationSchema, path: string) {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

function resolveTranslation(
  dictionary: TranslationSchema,
  key: string,
  token?: string,
  replacement?: string | number,
) {
  const resolved = getValueByPath(dictionary, key);
  if (typeof resolved !== "string") return key;
  if (token && replacement !== undefined) {
    return resolved.split(token).join(String(replacement));
  }
  return resolved;
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = resolveLocale(pathname);

  const value = useMemo<TranslationContextValue>(() => {
    const dictionary = translations[locale] ?? translations[FALLBACK_LOCALE];
    return {
      locale,
      t: (key, token, replacement) =>
        resolveTranslation(dictionary, key, token, replacement),
      tLocale: (targetLocale, key, token, replacement) => {
        const picked =
          translations[targetLocale] ?? translations[FALLBACK_LOCALE];
        return resolveTranslation(picked, key, token, replacement);
      },
    };
  }, [locale]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
