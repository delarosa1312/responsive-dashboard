// hooks/useThemeColors.ts
import { useTheme } from '@mui/material'
import React from 'react'

export const useThemeColors = () => {
  const theme = useTheme()

  React.useEffect(() => {
    const primaryColor = theme.palette.primary.main
    const secundaryColor = theme.palette.background.default

    document.documentElement.style.setProperty('--primary-color', primaryColor)
    document.documentElement.style.setProperty('--secundary-color', secundaryColor)

    const styleElement = document.createElement('style')
    styleElement.textContent = `
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: #5a5fe0;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #5a5fe0;
      }
    `
    document.head.append(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [theme.palette.primary.main, theme.palette.background.default])
}
