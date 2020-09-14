import { useEffect, useRef, useState } from 'react'

function useClickOutside (callback) {
  const container = useRef(null)
  const [isTouchEvent, setTouchEvent] = useState(false)
  const eventType = isTouchEvent ? 'touchend' : 'click'

  function handleEvent (e) {
    if (e.type === 'click' && isTouchEvent) return

    if (container.current && e.target !== null) {
      if (!container.current.contains(e.target)) {
        callback(e)
      }
    }
  }

  useEffect(() => {
    document.addEventListener(eventType, handleEvent, true)

    return () => {
      document.removeEventListener(eventType, handleEvent, true)
    }
  })

  useEffect(() => {
    setTouchEvent('ontouchstart' in document.documentElement)
  }, [])

  return container
}

export default useClickOutside
