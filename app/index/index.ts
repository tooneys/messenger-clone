import {
  Conversation,
  User,
  Message,
  UserToConversation,
  seenUserToMessage,
} from '@prisma/client';

export type FullMessageType = Message & {
  sender: User;
  users: seenUserToMessage[];
};

export type FullConservationType = Conversation & {
  messages: FullMessageType[];
  users: UserToConversation[];
};
