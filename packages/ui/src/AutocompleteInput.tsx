import { FlashList } from '@shopify/flash-list'
import { useState } from 'react'
import type { FC } from 'react'
import type { UnstyledInputProps } from './UnstyledInput'
import { Button, Separator, Text, View, YStack } from 'tamagui'

import { VirtualList } from './list'
import { BottomSheetInput } from './BottomSheetInput'

type T = any
interface Props<T> extends UnstyledInputProps {
  data: T[]
  value: string
  setValue: (value: string) => void
  filter: (data: T[], value: string) => T[]
  onSearch?: (value: T) => void
  onSelect?: (item: T) => void
  renderItem?: (item: T) => string
  keyExtractor?: (item: T) => string
  onEmptyList?: () => JSX.Element
  insideBottomSheet?: boolean
}

export const AutocompleteInput: FC<Props<T>> = ({
  data,
  value,
  setValue,
  filter,
  onSearch,
  onSelect,
  onEmptyList,
  renderItem = (item: T) => item,
  keyExtractor = (item: T) => item,
  insideBottomSheet = false,
  ...rest
}) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [filteredData, setFilteredData] = useState<string[]>(data)

  const handleSearch = (text: string) => {
    setMenuVisible(true)
    setValue(text)
    setFilteredData(filter(data, text))
    onSearch?.(text)
  }

  const handleDropdownSelect = (item: T) => {
    onSelect?.(item)
    setFilteredData([])
    setMenuVisible(false)
  }

  return (
    <View position='relative' width='100%'>
      <BottomSheetInput
        value={value}
        onChangeText={handleSearch}
        onFocus={() => {
          // if (value.length === 0) {
          setMenuVisible(true)
          // }
        }}
        onBlur={() => {
          setTimeout(() => {
            setMenuVisible(false)
          }, 200)
        }}
        enabled={insideBottomSheet}
        {...rest}
      />
      <YStack
        gap='$1'
        position='absolute'
        top='100%'
        left={0}
        right={0}
        padding='$1'
        borderRadius='$1'
      >
        {menuVisible && (
          <FlashList
            data={filteredData}
            estimatedItemSize={10}
            // ={() => <Separator />}
            // listEmptyComponent={<onEmptyList/>}
            renderItem={({ item }) => {
              return (
                <Button onPress={() => handleDropdownSelect(item)}>
                  <Text>{renderItem(item)}</Text>
                </Button>
              )
            }}
          />
        )}
      </YStack>
    </View>
  )
}
