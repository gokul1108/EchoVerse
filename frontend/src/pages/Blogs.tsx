import { BlogCard } from "../components/BlogCard"


export const Blogs = () => {    
    return <div className=" flex justify-center">
        <div className=" max-w-xl">
        <BlogCard authorName={"Gokul"} title={"My first blog"} content={"This is my first blog post" }publishedDate={"2021-09-01"} id={1} />
        <BlogCard authorName={"Gokul"} title={"My first blog"} content={"This is my first blog post" }publishedDate={"2021-09-01"} id={1} />
        <BlogCard authorName={"Gokul"} title={"My first blog"} content={"This is my first blog post" }publishedDate={"2021-09-01"} id={1} />
        <BlogCard authorName={"Gokul"} title={"My first blog"} content={"This is my first blog post" }publishedDate={"2021-09-01"} id={1} />

        </div>
    </div>
}