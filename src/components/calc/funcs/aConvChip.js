/*
Accumulation chip colors and coefficients.
Change accoriding to your desires
*/

const state = {
  rak: {
    bg: 'bg-red-600',
    fillBg: 'bg-red-600',
    fillText: 'text-white',
    outlineBorder: 'border-red-500',
    outlineText: 'text-red-500'
  },
  olen: {
    bg: 'bg-green-600',
    fillBg: 'bg-green-600',
    fillText: 'text-white',
    outlineBorder: 'border-green-500',
    outlineText: 'text-green-500'
  },
  statist: {
    bg: 'bg-blue-500',
    fillBg: 'bg-blue-500',
    fillText: 'text-white',
    outlineBorder: 'border-blue-500',
    outlineText: 'text-blue-500'
  },
  korben: {
    bg: 'bg-[#980cff]',
    fillBg: 'bg-[#980cff]',
    fillText: 'text-white',
    outlineBorder: 'border-[#980cff]',
    outlineText: 'text-[#980cff]'
  }
}

export const chipColor = (gConv) => {
  const absGConv = Math.abs(gConv)
  if (absGConv > 5.0) {
    return state.korben
  } else if (absGConv >= 4.0) {
    return state.statist
  } else if (absGConv >= 3.0) {
    return state.olen
  } else if (absGConv < 2.2) {
    return state.rak
  } else {
    return state.rak
  }
}
