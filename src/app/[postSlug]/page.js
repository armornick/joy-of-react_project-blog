import { readFile } from "node:fs/promises";
import { join } from "node:path";
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import matter from "gray-matter";

async function loadBlogPost(slug) {
	const filePath = join(process.cwd(), "content", slug + ".mdx");
	const rawFile = await readFile(filePath, "utf-8");
	const fileData = matter(rawFile);
	return fileData;
}

async function BlogPost({ params }) {
	const { postSlug } = await params;
	const blogPost = await loadBlogPost(postSlug);

	return (
		<article className={styles.wrapper}>
			<BlogHero
				title={blogPost.data.title}
				publishedOn={blogPost.data.publishedOn}
			/>
			<div className={styles.page}>
				<MDXRemote source={blogPost.content} />
			</div>
		</article>
	);
}

export default BlogPost;
