import {prisma} from "@/src/lib/prisma"
import {NextResponse} from "next/server"
import { pusherServer  } from "@/src/lib/pusher"
export async function POST(req:Request){
    const body=await req.json();

    const {content,senderId,receiverId}=body;

    const message=await prisma.message.create({
        data:{
            content,
            senderId,
            receiverId
        }
    });

    await pusherServer.trigger(
        receiverId,
        "new-message",
        message
    );

    
    return NextResponse.json(message);
}