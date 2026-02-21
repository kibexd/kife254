'use client'

import { useEffect, useRef } from 'react'

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const pos = useRef({ mx: 0, my: 0, fx: 0, fy: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(max-width: 768px)').matches) return

    const dot = cursorRef.current
    const ring = followerRef.current
    if (!dot || !ring) return

    const p = pos.current

    // Cursor dot moves instantly – no lag
    const onMove = (e: MouseEvent) => {
      p.mx = e.clientX
      p.my = e.clientY
      dot.style.transform = `translate(${p.mx}px,${p.my}px) translate(-50%,-50%)`
    }

    // Follower lerps toward cursor – 0.15 is fast yet smooth
    const tick = () => {
      p.fx += (p.mx - p.fx) * 0.15
      p.fy += (p.my - p.fy) * 0.15
      ring.style.transform = `translate(${p.fx}px,${p.fy}px) translate(-50%,-50%)`
      rafRef.current = requestAnimationFrame(tick)
    }

    const setVariant = (v: string) => {
      dot.setAttribute('data-variant', v)
      ring.setAttribute('data-variant', v)
    }

    const show = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
    const hide = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    // Use event delegation instead of per-element listeners
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.('a,button,[role=button],input,textarea,select,[data-interactive]')
      setVariant(
        el
          ? el.matches('input,textarea,select') ? 'crosshair' : 'interactive'
          : 'default'
      )
    }

    const onDown = () => setVariant('active')
    const onUp   = () => {
      // restore: if still over interactive keep that state
      const el = document.querySelectorAll('a:hover,button:hover,[role=button]:hover')
      setVariant(el.length ? 'interactive' : 'default')
    }

    document.addEventListener('mousemove',  onMove, { passive: true })
    document.addEventListener('mouseover',  onOver, { passive: true })
    document.addEventListener('mouseenter', show)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fx-cursor fixed top-0 left-0 pointer-events-none select-none"
        style={{ opacity: 0, zIndex: 99999, willChange: 'transform' }}
        data-variant="default"
      />
      <div
        ref={followerRef}
        className="fx-follower fixed top-0 left-0 pointer-events-none select-none"
        style={{ opacity: 0, zIndex: 99998, willChange: 'transform' }}
        data-variant="default"
      />
    </>
  )
}
