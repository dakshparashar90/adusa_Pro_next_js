"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/auth/userdata");
      const data = await res.json();

      setUserList(data);
      console.log("DATA", data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <>
      {session && <p>{session?.user?.email}</p>}
      <button onClick={() => signOut({ callbackUrl: "/auth/register" })}>
        Logout
      </button>
      {userList.map((user: any) => (
        <div key={user.id}
          onClick={() => router.push(`/chat/${user.id}`)}
          className="
                p-3
                border-b
                cursor-pointer
                "
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  );
}
