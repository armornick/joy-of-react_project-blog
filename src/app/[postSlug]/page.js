import React from "react";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
import { MDXRemote } from "next-mdx-remote/rsc";
import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import CodeSnippet from "@/components/CodeSnippet";
import dynamic from "next/dynamic";

const loadBlogPostCached = React.cache(loadBlogPost);

export async function generateMetadata({ params }) {
	const { postSlug } = await params;
	const blogPost = await loadBlogPostCached(postSlug);

	return {
		title: `${blogPost.frontmatter.title} • ${BLOG_TITLE}`,
		description: blogPost.frontmatter.abstract,
	};
}

async function BlogPost({ params }) {
	const { postSlug } = await params;
	const blogPost = await loadBlogPostCached(postSlug);

	return (
		<article className={styles.wrapper}>
			<BlogHero
				title={blogPost.frontmatter.title}
				publishedOn={blogPost.frontmatter.publishedOn}
			/>
			<div className={styles.page}>
				<MDXRemote
					source={blogPost.content}
					components={{
						pre: CodeSnippet,
						DivisionGroupsDemo: dynamic(() =>
							import("@/components/DivisionGroupsDemo")
						),
					}}
				/>
			</div>
		</article>
	);
}

export default BlogPost;
