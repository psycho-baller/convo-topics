import { Button as ButtonOG, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

export const TagButton = styled(ButtonOG, {
  // Tag: true,
  name: 'TagButton',
  size: '$3',
  fontSize: '$5',
  scaleIcon: 1.4,
  borderColor: '$gray7',
  scaleSpace: 0.5,
  backgroundColor: '$gray3',
  textProps: {
    textTransform: 'capitalize',
  },
})

export type TagButtonProps = GetProps<typeof TagButton>
// export type Page : withStaticProperties(Page, {
//   Props: GetProps<typeof Page>
// GetProps<typeof YStack>
