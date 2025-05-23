"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InvitePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const router = useRouter();

  const handleInvite = async () => {
    if (!email) return;
    setStatus("sending");
    await fetch("/api/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus("done");
    setTimeout(() => router.push("/"), 1500);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Invită un prieten
      </h2>
      <input
        type="email"
        className="w-full p-3 border rounded-lg mb-4"
        placeholder="Email prieten"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleInvite}
        disabled={status === "sending"}
        className={`w-full py-3 text-white rounded-lg ${
          status === "sending" ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Trimite invitația
      </button>
      {status === "done" && (
        <p className="text-green-600 text-center font-medium mt-4">
          ✅ Invitație trimisă!
        </p>
      )}
    </div>
  );
}
