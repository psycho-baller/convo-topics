import { api } from "@acme/api/utils/trpc";
import { UnstyledInput, ErrorText } from "@acme/ui";
import { X, CheckCircle2 } from "@tamagui/lucide-icons";
import { useState, useEffect } from "react";
import { Sheet, XStack, Label, Button } from "tamagui";
import { useAddFriendStore } from "../../../stores/addQuestion";
import { AddFriend } from "./AddFriend";

export const AddQuestion = () => {
  const utils = api.useUtils();

  const [selectedFriend, setSelectedFriend, friendSearch, setFriendSearch, dropdownOpen, setDropdownOpen] = useAddFriendStore((state) => [state.selectedFriend, state.setSelectedFriend, state.friendSearch, state.setFriendSearch, state.dropdownOpen, state.setDropdownOpen]);

  const [question, setQuestion] = useState("");
  const [mounted, setMounted] = useState(false);

  const { mutate, error } = api.question.create.useMutation({
    async onSuccess() {
      setQuestion("");
      setDropdownOpen(false);
      setFriendSearch("");
      await utils.question.all.invalidate();
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function addQuestion(){
    mutate({
      createdByUserId: 1,
      friendId: selectedFriend?.id,
      text: question,
    });
  }

  return (
    <Sheet
      open={dropdownOpen}
      modal
      onOpenChange={setDropdownOpen}
      zIndex={50}
    >
      {/* <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      /> */}
      <Sheet.Handle />
      <Sheet.Frame padding="$4">
        <XStack justifyContent="space-between">
          <Label fontSize={"$1"} unstyled color={"$gray8"} htmlFor="question">QUESTION</Label>
          <Button unstyled onPress={() => setDropdownOpen(false)}><X /></Button>
        </XStack>
        <UnstyledInput width={200} placeholderTextColor='$secondaryColor' fontSize={"$8"} paddingVertical={"$2"} style={mounted ? {
          transform: [
            {
              translateY: 0,
            },
          ],
        } : {
          transform: [
            {
              translateY: 100,
            },
          ],
        }} autoFocus={dropdownOpen} placeholder="Add Question" value={question} onChangeText={setQuestion}  />
        <XStack>
          <AddFriend flex={1} />
          <Button jc="flex-end" unstyled onPress={addQuestion}>
            <CheckCircle2 />
          </Button>
        </XStack>
        {/* <XStack justifyContent="space-between">
          <XStack>

          </XStack>
          
        </XStack> */}
        {error?.data?.code === "UNAUTHORIZED" && (
          <ErrorText ta="center">
            You need to be logged in to create a question
          </ErrorText>
        )}
        {error?.data?.zodError?.fieldErrors.text && (
          <ErrorText ta="center">
            {error.data.zodError.fieldErrors.text}
          </ErrorText>
        )}
      </Sheet.Frame>
    </Sheet>
  );
}