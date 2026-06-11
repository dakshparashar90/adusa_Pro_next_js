"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardClient({
  email,
}: {
  email?: string | null;
}) {
  const router = useRouter();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/auth/userdata");
      const data = await res.json();

      setUserList(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <p>{email}</p>

      <button
        onClick={() =>
          signOut({
            callbackUrl: "/auth/register",
          })
        }
      >
        Logout
      </button>

      {userList.map((user: any) => (
        <div
          key={user.id}
          onClick={() =>
            router.push(`/chat/${user.id}`)
          }
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