import { createTheme } from '@mui/material/styles'

// 现代简约主题颜色配置
const colors = {
  primary: {
    main: '#6366f1', // 现代紫色
    light: '#a78bfa',
    dark: '#4c3560',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#3b82f6', // 现代青色
    light: '#a5d6ff',
    dark: '#218838',
    contrastText: '#ffffff',
  },
  background: {
    default: '#ffffff',
    paper: '#f8fafc',
  },
  // 渐变色彩
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    surface: 'linear-gradient(145deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  // 玻璃态效果
  glassmorphism: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    shadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  },
}

export const modernTheme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    text: {
      primary: colors.primary.dark,
      secondary: colors.secondary.dark,
    },
    ...colors,
  },
  // 现代圆角
  shape: {
    borderRadius: 12,
  },
  // 优化的阴影系统
  shadows: [
    'none',
    '0 2px 4px rgba(99, 115, 255, 0.2)',
    '0 4px 12px rgba(99, 115, 255, 0.1)',
    '0 8px 16px rgba(99, 115, 255, 0.15)',
    '0 8px 24px rgba(99, 115, 255, 0.08)',
  ],
  // 更平滑的过渡
  transitions: {
    duration: {
      shortest: 150,
      shorter: 250,
      standard: 300,
      complex: 500,
      enteringScreen: 400,
      leavingScreen: 300,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  // 响应式断点
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // 自定义间距
  spacing: (factor: number) => `${8 * factor}px`,
  // 玻璃态样式
  glassmorphism: {
    paper: `background: rgba(255, 255, 255, 0.7);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.18);
              box-shadow: ${colors.glassmorphism.shadow};`,
  },
  typography: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    // 增强按钮样式
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(99, 115, 255, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      },
    },
    // 增强卡片样式
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(99, 115, 255, 0.15)',
          },
        },
      },
    },
    // 增强输入框样式
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    // 增强对话框样式
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
        },
      },
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          // 渐变背景
          background: colors.gradients.surface,
          minHeight: '100vh',
        },
      },
    },
  },
})

export default modernTheme
