const xlLayout = [
  { w: 4, h: 0.5, type: 'FixedTop' },
  { w: 1, h: 1, type: '1x1' },
  { w: 2, h: 1, type: '2x1' },
  { w: 2, h: 2, type: '2x2' },
  { w: 4, h: 1, type: '4x1' },
  { w: 4, h: 3, type: '4x3' },
  { w: 4, h: 4, type: '4x4' },
  { w: 4, h: 6, type: '4x6' }
]

const lgLayout = [
  { w: 4, h: 1, type: 'FixedTop' },
  { w: 1, h: 1, type: '1x1' },
  { w: 2, h: 1, type: '2x1' },
  { w: 2, h: 2, type: '2x2' },
  { w: 4, h: 1, type: '4x1' },
  { w: 4, h: 3, type: '4x3' },
  { w: 4, h: 4, type: '4x4' },
  { w: 4, h: 6, type: '4x6' }
]

const mdLayout = [
  { w: 4, h: 1.5, type: 'FixedTop' },
  { w: 1, h: 1, type: '1x1' },
  { w: 2, h: 1, type: '2x1' },
  { w: 2, h: 2, type: '2x2' },
  { w: 4, h: 1.5, type: '4x1' },
  { w: 4, h: 3, type: '4x3' },
  { w: 4, h: 4, type: '4x4' },
  { w: 4, h: 6, type: '4x6' }
]

const smLayout = [
  { w: 4, h: 1.5, type: 'FixedTop' },
  { w: 1, h: 1, type: '1x1' },
  { w: 2, h: 1, type: '2x1' },
  { w: 2, h: 2, type: '2x2' },
  { w: 4, h: 2, type: '4x1' },
  { w: 4, h: 3, type: '4x3' },
  { w: 4, h: 4, type: '4x4' },
  { w: 4, h: 6, type: '4x6' }
]

const xsLayout = [
  { w: 2, h: 3, type: 'FixedTop' },
  { w: 1, h: 1, type: '1x1' },
  { w: 2, h: 1, type: '2x1' },
  { w: 2, h: 2, type: '2x2' },
  { w: 2, h: 3, type: '4x1' },
  { w: 2, h: 3, type: '4x3' },
  { w: 2, h: 4, type: '4x4' },
  { w: 2, h: 3, type: '4x6' }
]

export const responsiveLayouts: any = {
  xl: xlLayout,
  lg: lgLayout,
  md: mdLayout,
  sm: smLayout,
  xs: xsLayout
}
