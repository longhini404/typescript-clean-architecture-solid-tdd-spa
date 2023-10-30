import { createBreakpoints } from '@chakra-ui/theme-tools'

export const breakpointsSizes = {
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
  xxl: 1536,
}

export const breakpoints = createBreakpoints({
  sm: `${breakpointsSizes.sm}px`,
  md: `${breakpointsSizes.md}px`,
  lg: `${breakpointsSizes.lg}px`,
  xl: `${breakpointsSizes.xl}px`,
  xxl: `${breakpointsSizes.xxl}px`,
})
