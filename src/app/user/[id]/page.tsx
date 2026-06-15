import {prisma} from "@/src/lib/prisma";

export default async function UserProfile({params}:{params:Promise<{id:string}>}){
   const {id}=await params;
    
   const user =await prisma.user.findUnique({
    where:{
        id:id
    },
   });
   
    return(
        <div>
            <h1>{user?.name}</h1>
            <p>{user?.profession}</p>
            <p>{user?.bio}</p>
            <p>{user?.city}</p>
        </div>
    )
}