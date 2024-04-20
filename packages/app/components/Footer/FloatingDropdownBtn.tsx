import { Plus } from '@tamagui/lucide-icons'
import type { FC } from 'react'

import { Button } from '@acme/ui'
import type { ButtonProps } from '@acme/ui'

import { useAddPersonStore } from '../../stores/addQuestion'

type Props = ButtonProps

/**
 * currently not being used but will prolly use it when I move the plus button above the tab bar
 * linear: https://linear.app/rami-m/issue/CT-16/the-add-button-is-now-a-floating-button-on-the-right
 */
export const FloatingDropdownBtn: FC<ButtonProps> = () => {
  const [setDropdownOpen] = useAddPersonStore((state) => [state.setDropdownOpen])

  function handlePlusClick() {
    setDropdownOpen(true)
  }

  return (
    <>
      <Button
        unstyled
        position='absolute'
        zIndex={10}
        right={20}
        bottom={20}
        onPress={handlePlusClick}
        icon={<Plus size={'$2.5'} />}
      />
    </>
  )
}
