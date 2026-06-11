"use client";

import { useState } from "react";
type User = {
  name?: string | null;
  profession?: string | null;
  bio?: string | null;
  city?: string | null;
  state?: string | null;
};
type Props = {
  user: User | null;
};

export default function ProfileForm({ user }: Props) {
  const [name, setName] = useState(user?.name || "");
  const [profession, setProfession] = useState(user?.profession || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [city, setCity] = useState(user?.city || "");
  const [state, setState] = useState(user?.state || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
    alert("Name is required");
    return;
  }

  if (!profession.trim()) {
    alert("Profession is required");
    return;
  }

    await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        profession,
        bio,
        city,
        state,
      }),
    });

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        placeholder="Profession"
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
      />
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
      />

      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
      />

      <button type="submit">Save Profile</button>
    </form>
  );
}
