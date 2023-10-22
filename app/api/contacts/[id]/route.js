import db from "@/libs/db";
import Contact from "@/models/Contact";

export async function GET(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  try {
    const contact = await Contact.findById(id);
    return new Response(JSON.stringify(contact), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function PUT(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  try {
    const body = await req.json();
    const contact = await Contact.findById(id);
    const updatedPost = await Contact.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );
    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  try {
    const contact = await Contact.findById(id);
    await Contact.findByIdAndDelete(id);
    return new Response(JSON.stringify({ msg: "Contact Deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
