import { useContext, useEffect } from 'react'
import MuiMarkdown from 'mui-markdown'
import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import { useTranslation } from 'react-i18next'

import { ShellContext } from 'contexts/ShellContext'
import {
  messageTranscriptSizeLimit,
  messageCharacterSizeLimit,
} from 'config/messaging'

const messageTranscriptSizeLimitFormatted = Intl.NumberFormat().format(
  messageTranscriptSizeLimit
)

const messageCharacterSizeLimitFormatted = Intl.NumberFormat().format(
  messageCharacterSizeLimit
)

export const About = () => {
  const { setTitle } = useContext(ShellContext)
  const { t } = useTranslation()
  const theme = useTheme()

  useEffect(() => {
    setTitle(t('about.title'))
  }, [setTitle, t])

  return (
    <Box
      className="About"
      sx={{
        p: 2,
        mx: 'auto',
        maxWidth: theme.breakpoints.values.md,
        '& p': {
          mb: 2,
        },
      }}
    >
      <MuiMarkdown>
        {`
### ${t('about.title')}

${t('about.description')}

#### ${t('about.chatRooms')}

${t('about.publicRooms')}

${t('about.privateRooms')}

${t('about.connectToOthers')}

##### ${t('about.peerVerification')}

${t('about.peerVerificationDesc')}

${t('about.localKeyGeneration')}

##### ${t('about.conversationBackfilling')}

${t('about.backfillingDesc')}

${t('about.publicRoomBackfill')}

${t('about.messageLimit', { limit: messageTranscriptSizeLimitFormatted })}

#### ${t('about.messageAuthoring')}

${t('about.markdownSupport')}

${t('about.sendShortcuts', {
  limit: messageCharacterSizeLimitFormatted,
})}
        `}
      </MuiMarkdown>
    </Box>
  )
}
