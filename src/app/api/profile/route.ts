import {auth} from "@/auth";
import {prisma} from "@/src/lib/prisma"

export async function PATCH(req:Request){
    const session =await auth();

    if(!session?.user?.id){
        return Response.json({
            error:"unauthorized"
        },{
            status:401
        });
    }

    const body =await req.json();


      if (!body.name?.trim()) {
    return Response.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }

  if (!body.profession?.trim()) {
    return Response.json(
      { error: "Profession is required" },
      { status: 400 }
    );
  }


    const upUser=await prisma.user.update({
        where : {
            id:session.user.id
        },
        data:{
            name: body.name,
            profession: body.profession,
            bio: body.bio,
            city: body.city,
            state: body.state,
            profileCompleted: true,
        }
    })

    return Response.json(upUser);
}