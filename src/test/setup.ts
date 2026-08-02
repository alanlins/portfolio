import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import '../i18n'

// jsdom has no IntersectionObserver; framer-motion's `whileInView` needs one.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly scrollMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

// jsdom doesn't implement scrollIntoView.
Element.prototype.scrollIntoView = vi.fn()

// jsdom doesn't implement matchMedia; ThemeContext uses it to detect the
// system color scheme when no preference is stored yet.
window.matchMedia =
  window.matchMedia ||
  ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }))
