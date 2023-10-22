import db from "@/libs/db";
import Contact from "@/models/Contact";

export async function POST(req) {
  await db.connect();

  try {
    const body = await req.json();
    const newContact = await Contact.create(body);
    return new Response(JSON.stringify(newContact), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function GET(req) {
  await db.connect();

  try {
    const contacts = await Contact.find({});
    return new Response(JSON.stringify(contacts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
