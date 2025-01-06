import { readdir, readFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import React from "react";
import matter from "gray-matter";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";

async function getBlogPosts() {
	const result = [];
	const files = await readdir(join(process.cwd(), "/content"));
	for (const file of files) {
		const rawFile = await readFile(
			join(process.cwd(), "content", file),
			"utf-8"
		);
		const { data: frontmatter } = matter(rawFile);
		result.push({
			slug: basename(file, extname(file)),
			...frontmatter,
			publishedOn: new Date(frontmatter.publishedOn),
		});
	}
	result.sort((a, b) => b.publishedOn.getTime() - a.publishedOn.getTime());
	return result;
}

async function Home() {
	const blogPosts = await getBlogPosts();

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.mainHeading}>Latest Content:</h1>

			{blogPosts.map((blogPost) => (
				<BlogSummaryCard
					key={blogPost.slug}
					slug={blogPost.slug}
					title={blogPost.title}
					abstract={blogPost.abstract}
					publishedOn={blogPost.publishedOn}
				/>
			))}
		</div>
	);
}

export default Home;
