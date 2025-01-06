import React from "react";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
import { MDXRemote } from "next-mdx-remote/rsc";
import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import CodeSnippet from "@/components/CodeSnippet";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const loadBlogPostCached = React.cache(loadBlogPost);

export async function generateMetadata({ params }) {
	const { postSlug } = await params;
	const blogPost = await loadBlogPostCached(postSlug);
	if (!blogPost) return undefined;

	return {
		title: `${blogPost.frontmatter.title} • ${BLOG_TITLE}`,
		description: blogPost.frontmatter.abstract,
	};
}

async function BlogPost({ params }) {
	const { postSlug } = await params;
	const blogPost = await loadBlogPostCached(postSlug);
	if (!blogPost) {
		notFound();
	}

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
						CircularColorsDemo: dynamic(() =>
							import("@/components/CircularColorsDemo")
						),
					}}
				/>
			</div>
		</article>
	);
}

export default BlogPost;
