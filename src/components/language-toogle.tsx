"use client"

import * as React from "react"
import { useTranslation } from "next-i18next"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSelector() {
  const { t, i18n } = useTranslation("common")

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const getBrowserLanguage = () => {
    const browserLang = window.navigator.language.slice(0, 2)
    if (browserLang === "es") return "Español"
    else if (browserLang === "en") return "English"
    else return "Unknown"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span>{t("currentLanguage")}</span>
          <ChevronDownIcon className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("es")}>
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage(getBrowserLanguage())}>
          System Language
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
