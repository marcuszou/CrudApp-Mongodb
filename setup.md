# Setup the app



## 1. Install nextjs-app

```
npx create-next-app@latest crudapp
```

then select options as below:

​	TypeScript: No
​	ESLint:	Yes
​	Tailwind CSS:	Yes
​	`src/` directory:	No
​	App Router:	Yes
​	Import alias:	No



## 2. Install some frontend/backend modules

```
cd crudapp
npm install mongoose mongodb axios react-icons react-toastify
npm run dev
```



## 3. Setup project connection in cloud.mongodb.com

Signup/login with your account,

create a project named as "taksmgr" with name: marcuszou and password: Ka****21.

Go back to **Overview** page and click "**CONNECT**" button, and select "**Drivers**"

then, copy the **connection string**.



## 4. Create a .env file, excluded in .gitignore though

```shell
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.6xwb3pn.mongodb.net/?retryWrites=true&w=majority
```

Replace the <username> and <password> parts with your own please.



## 5. Setup in the app

**/app/globals.css**

```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  overflow-x:hidden;
}
```

**/app/page.js**

```javascript
import Image from "next/image";

export default function Home() {
  return <main>HomePage</main>;
}
```

**/libs/db.js**

```javascript
import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("db connected");
    return;
  }
  if (mongoose.connection.length > 0) {
    connection.isConneted = mongoose.connection.readyState;
    if (connection.isConnected === 1) {
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL);
  connection.isConnected = db.connection.readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = flase;
    }
  }
}
const db = { connect, disconnect };
export default db;
```

**/models/Contact.js**

```JavaScript
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  category: {
    type: String,
    enum: ["Friends", "Family", "Professional", "Business", "Secret"],
  },
});

export default mongoose?.models?.Contact ||
  mongoose.model("Contact", ContactSchema);
```

/app/api/contacts/route.js

```javascript
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
```

/app/api/contacts/[id]/route.js

```javascript
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
```

## 6. Test the functions of API using VS Code extension
- Thunder Client
- Postman

You can try standalone [Postman](https://www.postman.com) or [Insomnia](https://insomnia.rest/).