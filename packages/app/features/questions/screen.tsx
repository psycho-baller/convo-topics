import { FlashList } from '@shopify/flash-list';

import { api } from '@acme/api/utils/trpc';
import { MainPage } from '../../shared/components/Footer/MainPage';
import QuestionCard from './QuestionCard';

const Index = () => {
  // const { width, height } = Dimensions.get('window');
  const questionQuery = api.question.all.useQuery();

  return (
    <MainPage>
      <FlashList
        data={questionQuery.data}
        estimatedItemSize={20}
        keyExtractor={(item) => item.id.toString()}
        // ItemSeparatorComponent={() => <Separator />}
        renderItem={(p) => <QuestionCard question={p.item} />}
      />
    </MainPage>
  );
};

export default Index;
