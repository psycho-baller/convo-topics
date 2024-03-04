import type { YStackProps } from 'tamagui';
import { Label, YStack } from 'tamagui';

import { api } from '@acme/api/utils/trpc';
import { AutocompleteInput, Text } from '@acme/ui';

import { getFullName } from '../../../lib/utils/name';
import { useAddPersonStore } from '../../../stores/addQuestion';
import { PersonStore } from '../../../types/people';

export const AddPerson = (props: YStackProps) => {
  const [personSearch, setPersonSearch, setSelectedPerson] = useAddPersonStore((state) => [
    state.personSearch,
    state.setPersonSearch,
    state.setSelectedPerson,
  ]);
  const personQuery = api.person.all.useQuery();
  if (personQuery.isLoading) {
    return <Text>Loading...</Text>;
  }
  if (personQuery.error) {
    return <Text>Error: {personQuery.error.message}</Text>;
  }

  const personData =
    personQuery.data?.map((person) => {
      const { firstName, lastName = null, id } = person;
      return { firstName, lastName, id };
    }) ?? [];

  const filterPeopleFromSearch = (people: PersonStore[], search: string) => {
    console.log('people', people);
    return people.filter((person) => {
      const personFullName = getFullName(
        person.firstName.toLowerCase(),
        person.lastName?.toLowerCase(),
      );
      const searchFullName = search.toLowerCase();
      return personFullName.includes(searchFullName);
    });
  };
  const onPersonSearch = (value: string) => {
    // check if there is a person with that name and set it as selected person if there is
    const matchedPerson = personData.find(
      (person) => value.trim() === getFullName(person.firstName, person.lastName),
    );
    matchedPerson ? setSelectedPerson(matchedPerson) : setSelectedPerson(null);
  };

  const onPersonSelected = (item: PersonStore) => {
    setPersonSearch(getFullName(item.firstName, item.lastName));
    setSelectedPerson(item);
    onPersonSearch(getFullName(item.firstName, item.lastName));
  };

  const keyExtractor = (item: PersonStore) => item.id.toString();

  return (
    <YStack {...props}>
      <Label fontSize={'$1'} unstyled color='$secondaryColor' htmlFor='person'>
        person
      </Label>
      <AutocompleteInput
        placeholderTextColor='$secondaryColor'
        opacity={0.75}
        data={personData}
        width={200}
        fontSize={'$8'}
        paddingVertical={'$2'}
        placeholder='Add person'
        value={personSearch}
        setValue={setPersonSearch}
        filter={filterPeopleFromSearch}
        onSearch={onPersonSearch}
        keyExtractor={keyExtractor}
        renderItem={(item) => getFullName(item.firstName, item.lastName)}
        onSelect={onPersonSelected}
      />
      {/* <personDropdown dropdownRef={dropdownRef} /> */}
    </YStack>
  );
};