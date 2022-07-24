export {}

declare global {
  interface ErrorsObj {
    [key: string]: Array<string>
  }
  interface StringsObj {
    [key: string]: string
  }
}
