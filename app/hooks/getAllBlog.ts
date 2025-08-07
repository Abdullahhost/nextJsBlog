import { configApi } from "../config/apiBaseUrl";

export const getAllBlog = async () => {
    try {
        const res = await fetch(configApi.ALL_BLOG_API, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        return res.json();
    } catch (err) {
        console.log(err);
    }
};


export const getCategoriesBlog = async (role: string) => {
    try {
        const res = await fetch(`${configApi.CATEGORIES_BLOG}/${role}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        return res.json();
    } catch (err) {
        console.log(err);
    }
};


export const getSingleBlog = async (title: string) => {
    try {
        const res = await fetch(`${configApi.ALL_BLOG_API}/${title}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        return res.json();
    } catch (err) {
        console.log(err);
    }
};
