import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const email = req.headers.get("email");

    if (!email) {
      return NextResponse.json({ allowed: false }, { status: 400 });
    }

    const userDoc = await getDoc(doc(db, "users", email));
    if (!userDoc.exists()) {
      return NextResponse.json({ allowed: false });
    }

    const snapshot = await getDocs(collection(db, "news"));
    const news = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        date: (() => {
          try {
            return data.date?.toDate?.()
              ? data.date.toDate().toLocaleDateString("ro-RO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : new Date(data.date).toLocaleDateString("ro-RO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
          } catch {
            return "Fără dată";
          }
        })(),
      };
    });

    return NextResponse.json({ allowed: true, news });
  } catch (error) {
    console.error("🔥 Eroare în API /news:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
