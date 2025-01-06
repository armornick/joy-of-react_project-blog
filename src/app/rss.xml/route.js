import { BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";

export async function GET() {
	const feed = new RSS({
		title: BLOG_TITLE,
		description: "A wonderful blog about JavaScript",
	});

	const blogPosts = await getBlogPostList();
	for (const blogPost of blogPosts) {
		feed.item({
			title: blogPost.title,
			description: blogPost.abstract,
			date: blogPost.publishedOn,
			url: `/${blogPost.slug}`,
		});
	}

	return new Response(feed.xml(), {
		headers: { "Content-Type": "application/xml" },
	});
}
