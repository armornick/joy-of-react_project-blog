import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
import { COMPONENT_MAP } from "@/helpers/mdx-components";
import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

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
					components={COMPONENT_MAP}
				/>
			</div>
		</article>
	);
}

export default BlogPost;
