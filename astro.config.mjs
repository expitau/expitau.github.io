import { defineConfig } from 'astro/config';

import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

// https://astro.build/config
export default defineConfig({
    markdown: {
        shikiConfig: {
            // Choose from Shiki's built-in themes (or add your own)
            // https://shiki.style/themes
            theme: 'one-dark-pro'
        },
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeMathjax]
    }
});
