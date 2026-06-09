
import {prisma} from "@/src/lib/prisma"
import {NextResponse} from "next/server"
import { auth } from "@/auth";

export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){
   const session = await auth();
    const {id} = await params;

    const currUserId=session?.user?.id;

    const messages=await prisma.message.findMany({
        where:{
            OR:[
                {
                    senderId:currUserId,

                    receiverId:id,
                },
                {
                    senderId:
                            id,
                          
                    receiverId:
                            currUserId,
                }
            ],
        },

        orderBy:{
            createdAt:"asc",
        }
        
    });

    return NextResponse.json(messages);

}