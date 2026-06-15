"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardClient({ email }: { email?: string | null }) {
  const router = useRouter();
  const [userList, setUserList] = useState([]);

  const [querry, setQuery] = useState("");
  const [searchType, setSearchType] = useState("name");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!querry.trim()) {
      setSearchResults([]);
      return;
    }
 const timer = setTimeout(async () => {
    
      const res = await fetch(`/api/search?querry=${querry}&type=${searchType}`);

      const data = await res.json();

      setSearchResults(data);
    },500);

     return () => clearTimeout(timer);
 
  }, [querry, searchType]);

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
      <input
        type="text"
        placeholder="Search..."
        value={querry}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="name">Name</option>

        <option value="profession">Profession</option>
      </select>

    {
  searchResults.map((user: any) => (
    <div
      key={user.id}
      onClick={() =>
        router.push(`/user/${user.id}`)
      }
    >
      <h3>{user.name}</h3>

      <p>{user.profession}</p>
    </div>
  ))
}

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
