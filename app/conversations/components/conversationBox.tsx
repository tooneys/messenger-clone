import Avator from '@/app/components/Avator';
import useOtherUser from '@/app/hooks/useOtherUser';
import { FullConservationType } from '@/app/index';
import Users from '@/app/users/page';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface ConversationProps {
  data: FullConservationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversation/${data.id}`);
  }, [data?.id, router]);

  const lastMessge = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessge) {
      return false;
    }

    const seenArray = lastMessge.users || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user. === userEmail).length !== 0;
  }, [userEmail, lastMessge]);

  const lastMessageText = useMemo(() => {
    if (!lastMessge?.image) {
      return 'Sent an image';
    }
    if (lastMessge?.body) {
      return lastMessge.body;
    }

    return 'Started a conversation';
  }, [lastMessge]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avator user={otherUser}></Avator>
    </div>
  );
};

export default ConversationBox;
