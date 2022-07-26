import Cookies from "js-cookie"

export function getLocales() {
  return ["en", "uk", "ru"]
}

export function getCurrLang() {
  let locale = Cookies.get("locale")
  if (!locale) {
    locale = "ru"
    Cookies.set("locale", locale)
  }
  return locale
}

export function getApiUrl(part = "") {
  let locale = getCurrLang()
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/${locale}/${part}`
  return url
}

export function getLocalesFields(fields: Array<string>) {
  let locales = getLocales()
  let obj: StringsObj = {}
  for (const field of fields) {
    for (const locale of locales) {
      let keyName = `${locale}_${field}`
      obj[keyName] = ""
    }
  }
  return obj
}
export function getTranslation(row: any, currentLoc: string, name: string) {
  if (typeof row["tr"][currentLoc] !== "undefined")
    return row["tr"][currentLoc][name]
}

export function imgUrlFromFile(file: any) {
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(file)
  return imageUrl
}
export function stripHtml(html: string) {
  const temporalDivElement = document.createElement("div")
  temporalDivElement.innerHTML = html
  return temporalDivElement.textContent || temporalDivElement.innerText || ""
}

export function stripTags(str: string) {
  return str.replace(/<\/?[^>]+(>|$)/g, "")
}
export function shorten(str: string, no_words: number, suff = " ...") {
  let newStr = str.split(" ").splice(0, no_words).join(" ")
  newStr = stripHtml(newStr)
  newStr = stripTags(newStr)

  if (str.length > newStr.length) {
    newStr += suff
  }
  return newStr
}
export function filterObjToStr(filter: any) {
  let filterStr = ""
  for (let field in filter) {
    let value = filter[field]
    if (value) {
      filterStr += `filter[${field}]=${value}&`
    }
  }
  if (filterStr) return `&${filterStr}`
  return ""
}
