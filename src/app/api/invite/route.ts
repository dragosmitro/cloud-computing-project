import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const docRef = doc(db, "users", email);
  const snap = await getDoc(docRef);
  if (!snap.exists()) {
    await setDoc(docRef, { email });
  }
  return NextResponse.json({ success: true });
}
