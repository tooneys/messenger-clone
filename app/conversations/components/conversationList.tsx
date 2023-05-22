'use client';

import useConversation from '@/app/hooks/useConversation';
import { FullConservationType } from '@/app/index';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';

interface ConversationListProps {
  initialItems: FullConservationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const routes = useRouter();
  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
    `,
        isOpen ? 'hidden' : 'block w-full left-0'
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">Message</div>
          <div className="">
            <MdOutlineGroupAdd />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ConversationList;
