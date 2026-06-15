import {prisma} from "@/src/lib/prisma";

export async function GET(req:Request){
    const {searchParams} = new URL(req.url);

    const querry=searchParams.get("querry") || "";

    const type =searchParams.get("type")|| "name";

    if(!querry.trim()){
        return Response.json([]);
    }

    let users:any=[];

    if(type === "name"){
        users=await prisma.user.findMany({
            where:{
                name:{
                    contains:querry,
                    mode:"insensitive"
                }
            }
        });
    }

    if(type=="profession"){
        users=await prisma.user.findMany({
            where:{
                profession:{
                    contains:querry,
                    mode: "insensitive"
                }
            }
        });
    }

    return Response.json(users);


}