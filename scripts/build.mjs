#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function build() {
    try {
        console.log('🔨 Building prompt library...');

        // Read existing prompts.json
        const existingPrompts = JSON.parse(readFileSync(join(rootDir, 'prompts.json'), 'utf8'));
        
        // Read all markdown files from prompts directory
        const promptsDir = join(rootDir, 'prompts');
        const markdownFiles = readdirSync(promptsDir)
            .filter(file => extname(file) === '.md')
            .map(file => join(promptsDir, file));

        console.log(`📄 Found ${markdownFiles.length} markdown files`);

        // Update timestamp
        existingPrompts.updated = new Date().toISOString();

        // Write updated prompts.json
        writeFileSync(
            join(rootDir, 'prompts.json'), 
            JSON.stringify(existingPrompts, null, 2)
        );

        // Generate stats
        const stats = {
            total_prompts: existingPrompts.prompts.length,
            categories: [...new Set(existingPrompts.prompts.map(p => p.category))],
            tags: [...new Set(existingPrompts.prompts.flatMap(p => p.tags || []))],
            last_updated: existingPrompts.updated
        };

        writeFileSync(
            join(rootDir, 'stats.json'),
            JSON.stringify(stats, null, 2)
        );

        console.log('✅ Build completed successfully!');
        console.log(`📊 Stats: ${stats.total_prompts} prompts, ${stats.categories.length} categories, ${stats.tags.length} tags`);

    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

build();