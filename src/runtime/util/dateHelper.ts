export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })
}

export const tryConvertToDate = (value: string): Date | null => {
  const date = new Date(value.toString())
  return isNaN(date.getTime()) ? null : date
}

export const fixDates = <T> (obj: any): T => {
  if (!obj) return obj
  if (Array.isArray(obj)) {
    return obj.map(item => fixDates(item)) as T
  }
  // fix dates in the ojb
  const newObj: any = {}
  for (const key in obj) {
    // check if the value can be converted to an Date
    if (typeof obj[key] === 'string') {
      const date = tryConvertToDate(obj[key])
      newObj[key] = date ?? obj[key]
    }
    else if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[key] = fixDates(obj[key])
    }
    else {
      newObj[key] = obj[key]
    }
  }
  (newObj)
  return newObj as T
}
