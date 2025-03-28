import { ArrowLeft } from '@tamagui/lucide-icons'
import type { ReactNode } from 'react'
import { Platform } from 'react-native'
import { useLink, useParams } from 'solito/navigation'

import { api } from '@rooots/api/utils/trpc'
import { Button, Page } from '@rooots/ui'

import { EditQuestionText } from './EditQuestionText'
import { QuestionProperties } from './QuestionProperties'
import LinkButton from '../../components/LinkButton'

interface Params {
  id: string
  [key: string]: string
}

const QuestionScreen = (): ReactNode => {
  const { id } = useParams<Params>()

  const link = useLink({
    href: '/questions',
  })
  const { data } = api.question.byId.useQuery({ id: Number.parseInt(id) })
  if (!data) return null

  return (
    <Page animation='bouncy' paddingVertical='$2'>
      {/* <XStack gap={18}>
        <Button iconAfter={Trash2} size='$3' width='5%' variant='outlined'>
        </Button>
      </XStack> */}

      {/* <Label htmlFor='question' /> */}
      {Platform.OS === 'web' && (
        <LinkButton {...link} icon={ArrowLeft} size='$3' variant='outlined'>
          Back
        </LinkButton>
      )}
      <EditQuestionText id={data.id} content={data.question} />
      <QuestionProperties {...data} />
    </Page>
  )
}

export default QuestionScreen
