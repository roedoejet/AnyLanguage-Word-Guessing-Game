interface UrlParams {
  [index: string]: string
}

export const URL_PARAMS: UrlParams = [
  ...new URL(document.URL).searchParams.entries(),
].reduce((obj, e) => ({ ...obj, [e[0]]: e[1] }), {})

/*
let obj: UrlParams = {}
const mySearchParams = (new URL(document.URL)).searchParams
for (const [key, value] of mySearchParams.entries()) {
  obj[value] = mySearchParams.get(key)
}
export const URL_PARAMS = hash
*/
