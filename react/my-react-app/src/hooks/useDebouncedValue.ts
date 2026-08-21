import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delayMs = 350): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, Math.max(0, delayMs))

    return () => window.clearTimeout(timeoutId)
  }, [delayMs, value])

  return debouncedValue
}

/*useDeferredValue says:
    Results may temporarily use old data
    Update this when urgent work is handled*/
/*

If the user quickly types "react", the app normally sends one request:
    This is where debounce provides concrete value: fewer requests.*/
