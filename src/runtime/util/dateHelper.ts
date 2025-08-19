export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })
}

export const tryConvertToDate = (value: string): Date | null => {
  const date = new Date(value.toString())
  return Number.isNaN(date.getTime()) ? null : date
}

export const fixDates = <T>(obj: unknown): T => {
  if (!obj) return obj as T
  if (Array.isArray(obj)) {
    return obj.map(item => fixDates(item)) as T
  }
  // fix dates in the ojb
  const newObj: Record<string, unknown> = {}
  for (const key in obj as Record<string, unknown>) {
    // check if the value can be converted to an Date
    if (typeof (obj as Record<string, unknown>)[key] === 'string') {
      const date = tryConvertToDate((obj as Record<string, unknown>)[key] as string)
      newObj[key] = date ?? (obj as Record<string, unknown>)[key]
    }
    else if (typeof (obj as Record<string, unknown>)[key] === 'object' && (obj as Record<string, unknown>)[key] !== null) {
      newObj[key] = fixDates((obj as Record<string, unknown>)[key])
    }
    else {
      newObj[key] = (obj as Record<string, unknown>)[key]
    }
  }
  console.log(newObj)
  return newObj as T
}
