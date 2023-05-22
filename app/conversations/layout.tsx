import getConversation from '../actions/getConversation';
import SideBar from '../components/sidebar/Sidebar';
import ConversationList from './components/conversationList';

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const convertsation = await getConversation();
  return (
    // @ts-expect-error Server Component
    <SideBar>
      <ConversationList initialItems={convertsation} />
      <div className="h-full">{children}</div>
    </SideBar>
  );
}
