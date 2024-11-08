import {
  Button,
  Loader,
  Placeholder,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import { createAIHooks, AIConversation } from "@aws-amplify/ui-react-ai";
import { amplifyClient } from "../amplify-utils";

const { useAIConversation } = createAIHooks(amplifyClient);

export function Chat() {
  const { user, signOut } = useAuthenticator();
  const [
    {
      data: { messages },
      isLoading,
      hasError,
    },
    sendMessage,
  ] = useAIConversation("travelAgent");

  async function callListMessages(): Promise<void> {
    try {
      // list conversations
      const { data, errors } =
        await amplifyClient.conversations.travelAgent.list();
      console.log("Fetched messages:", data);
      data.map((item) =>
       
          item.listMessages().then((res) => {
            // if (res.data.length === 0) {
            //   console.error(res.data);
            //   return;
            // }
            // console.log(res);
            // console.log(res.data);
            if (res.data.length===0) {
              console.log(res);
              return console.log(item, res.data);
            }
          })
    
      );

      // You can update the state with the fetched messages if needed
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }
  return (
    <View className="chat-container">
      <AIConversation
        variant="bubble"
        messages={messages}
        handleSendMessage={sendMessage}
        isLoading={isLoading}
        avatars={{
          ai: { avatar: "🤖", username: "Travel Agent" },
          user: { avatar: "👤", username: user?.signInDetails?.loginId },
        }}
        allowAttachments={true}
      />
      <Button onClick={callListMessages} size="small" variation="destructive" />

      {isLoading && (
        <div className="loader-container">
          <p>Loading...</p>
          <Loader size="large" />
        </div>
      )}
      {hasError && <p>Error loading messages</p>}
    </View>
  );
}

export default Chat;
