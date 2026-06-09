"use client";
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function RegisterPage(){
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name:     formData.get("name"),
      email:    formData.get("email"),
      password: formData.get("password"),


    }

     const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const { error } = await res.json()
      setError(error)
      setLoading(false)
      return
    }

     const signInResult = await signIn("credentials", {
      email:    data.email,
      password: data.password,
      redirect: false,  // handle redirect manually
    })
     if (signInResult?.error) {
      setError("Account created but login failed. Try logging in.")
    } else {
      router.push("/dashboard")  // redirect on success
      router.refresh()            // refresh server components
    }

    setLoading(false)
  
}
    return (
      <form onClick={handleOnSubmit}>
        <input name="name" type="text" required />
        <input name="email" type="email" required />
        <input name="password" type="password" required />

                 {error && <p style={{color:"red"}}>{error}</p>}
        <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Sign up"}
        </button>

      </form>
    );
}