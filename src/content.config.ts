import { defineCollection } from 'astro:content';
import {glob, file} from 'astro/loaders';
import { z } from "astro/zod"

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		image: z.string().optional(),
		tags: z.array(z.string()).optional(),
		priority: z.number().default(0),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.yaml' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		date: z.coerce.date(),
		image: z.string().optional(),
		url: z.string().optional(),
		github: z.string().optional(),
		priority: z.number().default(0),
	}),
})

export const collections = { blog, projects };
