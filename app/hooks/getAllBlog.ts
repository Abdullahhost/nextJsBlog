export const getAllBlog = async () => {
    try {
        const res = await fetch("https://blog-app-mamun.vercel.app/api/blog", {
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
        const res = await fetch(`https://blog-app-mamun.vercel.app/api/blog/categories/${role}`, {
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
        const res = await fetch(`https://blog-app-mamun.vercel.app/api/blog/${title}`, {
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
