import {auth} from "@/auth";
import {prisma} from "@/src/lib/prisma";
import ProfileForm from "./ProfileForm";


export default async function ProfilePage(){
    const session=await auth();

    const user=await prisma.user.findUnique({
        where:{
            id:session?.user?.id,
        }
    })
       
    return (
       
        <ProfileForm user={user}/>
    )
}