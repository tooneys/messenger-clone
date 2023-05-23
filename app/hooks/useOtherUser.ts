import { useSession } from 'next-auth/react';
import { FullConservationType } from '../index';
import { useMemo } from 'react';
import { User, UserToConversation } from '@prisma/client';

const useOtherUser = (
  conversation:
    | FullConservationType
    | {
        users: UserToConversation[];
      }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const otherUser = conversation.users.filter(
      (user) => user.userId !== currentUserEmail
    );

    return otherUser[0];
  }, [session?.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
