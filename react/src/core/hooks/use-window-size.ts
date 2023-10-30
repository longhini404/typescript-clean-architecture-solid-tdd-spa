import { useEffect, useState } from 'react'

interface ISize {
  width?: number
  height?: number
  isMobile: boolean
  isTablet: boolean
  isNotebook: boolean
  isDesktop: boolean
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<ISize>({
    width: undefined,
    height: undefined,
    isMobile: false,
    isTablet: false,
    isNotebook: false,
    isDesktop: false,
  })

  function handleResize() {
    setWindowSize(state => ({
      ...state,
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= 768,
      isTablet: window.innerWidth > 768 && window.innerWidth <= 992,
      isNotebook: window.innerWidth > 992 && window.innerWidth <= 1280,
      isDesktop: window.innerWidth > 1280,
    }))
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
