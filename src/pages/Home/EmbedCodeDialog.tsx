import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Link from '@mui/material/Link'
import { CopyableBlock } from 'components/CopyableBlock/CopyableBlock'

import { iframeFeatureAllowList } from 'config/iframeFeatureAllowList'
import { homepageUrl } from 'config/routes'
import { ChatEmbedAttributes } from 'models/sdk'

interface EmbedCodeDialogProps {
  showEmbedCode: boolean
  handleEmbedCodeWindowClose: () => void
  roomName: string
}

const basePackageHomepage =
  import.meta.env.VITE_HOMEPAGE ?? window.location.origin
const packageHomepage = basePackageHomepage.endsWith('/')
  ? basePackageHomepage
  : `${basePackageHomepage}/`

export const EmbedCodeDialog = ({
  showEmbedCode,
  handleEmbedCodeWindowClose,
  roomName,
}: EmbedCodeDialogProps) => {
  const { t } = useTranslation()
  const iframeSrc = new URL(`${packageHomepage}public/${roomName}`)
  iframeSrc.search = new URLSearchParams({ embed: '1' }).toString()

  const needsRootUrlAttribute =
    new URL(packageHomepage).origin !== homepageUrl.origin

  const chatRoomAttributes = {
    width: '800',
    height: '800',
    [ChatEmbedAttributes.ROOM_NAME]: roomName,
    ...(needsRootUrlAttribute && {
      [ChatEmbedAttributes.ROOT_URL]: packageHomepage,
    }),
  }

  const attributesString = Object.entries(chatRoomAttributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')

  // NOTE: The script src is inaccurate in the local development environment.
  const sdkEmbedCode = `<script src="${packageHomepage}sdk.js"></script>

<chat-room ${attributesString} />`

  return (
    <Dialog open={showEmbedCode} onClose={handleEmbedCodeWindowClose}>
      <DialogTitle>{t('embedCode.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            mb: 2,
          }}
        >
          {t('embedCode.description')}
          <code>iframe</code> HTML snippet into your project:
        </DialogContentText>
        <CopyableBlock>
          <SyntaxHighlighter
            language="html"
            style={materialDark}
            PreTag="div"
            lineProps={{
              style: {
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
              },
            }}
            wrapLines={true}
          >
            {`<iframe src="${iframeSrc}" allow="${iframeFeatureAllowList.join(
              ';'
            )}" width="800" height="800" />`}
          </SyntaxHighlighter>
        </CopyableBlock>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="h3"
          sx={theme => ({
            fontSize: theme.typography.h6.fontSize,
            fontWeight: theme.typography.h6.fontWeight,
            mb: 2,
          })}
        >
          {t('embedCode.advanced')}
        </Typography>
        <DialogContentText
          sx={{
            mb: 2,
          }}
        >
          {t('embedCode.advancedDescription')}
          <code>iframe</code>, you can use the{' '}
          <Link
            href="https://github.com/jeremyckahn/chitchatter#SDK"
            target="_blank"
          >
            {t('embedCode.chitchatterSdk')}
          </Link>{' '}
          {t('embedCode.advancedDescription2')}
          <Link
            href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components"
            target="_blank"
          >
            {t('embedCode.webComponent')}
          </Link>{' '}
          {t('embedCode.advancedDescription3')}:
        </DialogContentText>
        <CopyableBlock>
          <SyntaxHighlighter
            language="html"
            style={materialDark}
            PreTag="div"
            lineProps={{
              style: {
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
              },
            }}
            wrapLines={true}
          >
            {sdkEmbedCode}
          </SyntaxHighlighter>
        </CopyableBlock>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEmbedCodeWindowClose}>
          {t('common.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
