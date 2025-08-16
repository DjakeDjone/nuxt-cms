import { useCookie } from '#imports'

export const persistCookie = <T>(key: string, value: T | null) => {
  if (import.meta.client) {
    if (value === null) {
      document.cookie = `${key}=; Max-Age=0; path=/; SameSite=Lax`
    }
    else {
      const jsonValue = JSON.stringify(value)
      document.cookie = `${key}=${encodeURIComponent(jsonValue)}; path=/; SameSite=Lax`
    }
  }
}

export const getCookie = <T>(key: string): T | null => {
  if (import.meta.client) {
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split('=')
      if (cookieKey === key) {
        try {
          return JSON.parse(decodeURIComponent(cookieValue ?? '')) as T
        }
        catch (e) {
          console.error(`Error parsing cookie value for key "${key}":`, e)
          return null
        }
      }
    }
  }
  return null
}

export function simpleCookieRef<T>(key: string, initialValue: T): { value: T }
export function simpleCookieRef<T>(key: string, initialValue?: T | null): { value: T | null }
export function simpleCookieRef<T>(key: string, initialValue: T | null = null) {
  // Use Nuxt's useCookie for SSR safety
  const cookie = useCookie<T | null>(key, { default: () => initialValue })

  const setCookie = (newValue: T | null) => {
    cookie.value = newValue
    persistCookie(key, newValue)
  }

  return {
    get value() {
      return cookie.value as T | null
    },
    set value(newValue: T | null) {
      setCookie(newValue)
    },
  }
}
