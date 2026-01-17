import './polyfills'
import './i18n/config'
import ReactDOM from 'react-dom/client'
import 'typeface-roboto'

import 'modern-normalize/modern-normalize.css'
import './index.css'

import { ThemeProvider } from '@mui/material/styles'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import HomeIcon from '@mui/icons-material/Home'
import ChatIcon from '@mui/icons-material/Chat'
import SettingsIcon from '@mui/icons-material/Settings'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import useTheme from '@mui/material/styles/useTheme'

import Init from './Init'
import reportWebVitals from './reportWebVitals'
import modernTheme from './theme/theme'

// NOTE: 使用现代化的自定义主题
const MobileNav = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor:
          theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(20px)',
        '-webkit-backdrop-filter': 'blur(20px)',
        borderTop:
          theme.palette.mode === 'light'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.05)',
        padding: theme.spacing(2),
        zIndex: 1300,
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: theme.spacing(2),
          padding: theme.spacing(1, 2),
        }}
      >
        <Fab
          size="medium"
          onClick={() => (window.location.href = '/')}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: theme.palette.primary.light,
            },
            '&:active': {
              transform: 'scale(1.05)',
            },
          }}
          aria-label="Home"
        >
          <HomeIcon />
        </Fab>
        <Fab
          size="medium"
          onClick={() => (window.location.href = '/chat-demo')}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: theme.palette.primary.light,
            },
            '&:active': {
              transform: 'scale(1.05)',
            },
          }}
          aria-label="Chat"
        >
          <ChatIcon />
        </Fab>
        <Fab
          size="medium"
          onClick={() => (window.location.href = '/settings')}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: theme.palette.primary.light,
            },
            '&:active': {
              transform: 'scale(1.05)',
            },
          }}
          aria-label="Settings"
        >
          <SettingsIcon />
        </Fab>
        <Fab
          size="medium"
          onClick={() => (window.location.href = '/about')}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: theme.palette.primary.light,
            },
            '&:active': {
              transform: 'scale(1.05)',
            },
          }}
          aria-label="About"
        >
          <QuestionMarkIcon />
        </Fab>
      </Box>
    </Box>
  )
}

;<ThemeProvider theme={modernTheme}>
  <Init />
  <MobileNav />
</ThemeProvider>

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<Init />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
