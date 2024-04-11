import { FlashList } from '@shopify/flash-list';

import { api } from '@acme/api/utils/trpc';
import { MainPage } from '../../shared/components/Footer/MainPage';
import PersonCard from './PersonCard';

const Component = () => {
  const personQuery = api.person.all.useQuery();

  return (
    <MainPage>
      <FlashList
        data={personQuery.data}
        estimatedItemSize={20}
        keyExtractor={(item) => item.id.toString()}
        // ItemSeparatorComponent={() => <Separator />}
        renderItem={(p) => (
          <PersonCard person={p.item} />
          // <Text>{p.item.text}</Text>
        )}
      />
    </MainPage>
  );
};

export default Component;
