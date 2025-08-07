
interface ENVInterface  {
    ALL_BLOG_API: string;
    CATEGORIES_BLOG: string;

}

const prod:ENVInterface = {

    ALL_BLOG_API :"https://blog-app-mamun.vercel.app/api/blog",
    CATEGORIES_BLOG: "https://blog-app-mamun.vercel.app/api/blog/categories"

}

const dev:ENVInterface = {

    ALL_BLOG_API :"http://localhost:3000/api/blog",
    CATEGORIES_BLOG: "http://localhost:3000/api/blog/categories"
}
export const configApi = process.env.NODE_ENV === "development" ? dev : prod;