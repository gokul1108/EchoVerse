import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "gokul-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userID:string
  }
}>();

blogRouter.use("/*",async (c,next)=>{
    const authHeader = c.req.header("Authorization")||""
    const user = await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set("userID",user.id)
        await next()
    }else{
        c.status(403);
        return c.json({
            message:"you are not logged in"
        })
    }
})

blogRouter.post("/", async (c) => {

  const body = await c.req.json();
  const {success} = createPostInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid input" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userID");

  const blogs = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId)
    },
  });
  return c.json({
    id: blogs.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const {success} = updatePostInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid input" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog =await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      content: body.content,
      title:body.content
    },
  });
  return c.json({
    id:blog.id
  })

  
});
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany({});   
  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {

  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id:Number(id)
      },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.text("Error while updating Blog");
  }
});


