import {prisma} from '@/src/lib/prisma';
import ChatBox from "./ChatBox";

export default async function ChatPage({params}:{params:Promise<{id: string}>}){
    const {id} = await params;

    const user =await prisma.user.findUnique({
        where:{
            id,
        },
    })

    if(!user){
        return <div>User Not Found</div>
    }

    return(
        <ChatBox receiverId={user.id} receiverName={user.name ?? "unknown"}/>
    )
}
