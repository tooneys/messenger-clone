import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    /**
     * 아이디, 이메일 체크해서 없으면 에러화면으로 표기
     */
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized Error', { status: 401 });
    }

    /**
     * 그룹챗에 멤버가 혼자거나 이름이 없는경우 에러 표기
     */
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invaild Error', { status: 400 });
    }

    /**
     * 그룹챗의 경우 방을 만든다.
     */

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connectOrCreate: [
              ...members.map((member: { value: number }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    }

    const exsistingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
        ],
      },
    });

    const singleConversation = exsistingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        name: 'Test',
        isGroup,
        users: {
          create: [
            {
              userId: currentUser.id,
            },
          ],
        },
        userIds: [currentUser.id, userId],
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
