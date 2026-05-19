import { getCollection } from "astro:content";

export const projects = await Promise.all((await getCollection("projects"))
    .sort(
        (a, b) => (b.data.priority - a.data.priority) || (b.data.date?.valueOf() - a.data.date?.valueOf()) || 0
    )
    .filter((p) => (p.data.priority || 0) >= 0)
    .map(async (p: any) => {
        if (!p.data.url) {
            p.data.url = p.data.github
        }
        if (p.data.github) {
            p.stars = (await fetch(p.data.github.replace("https://github.com/", "https://api.github.com/repos/")).then((res) => res.json())).stargazers_count;
        } else {
            p.stars = 0;
        }
        return p;
    }));

export const blog = (await getCollection("blog"))
    .sort(
        (a, b) => (b.data.priority - a.data.priority) || (b.data.date?.valueOf() - a.data.date?.valueOf()) || 0
    )
    .filter((p) => (p.data.priority || 0) >= 0);

export default {
    projects: projects,
    blog: blog,
}
