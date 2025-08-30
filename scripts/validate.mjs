#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function validate() {
    try {
        // Read schema and prompts files
        const schema = JSON.parse(readFileSync(join(rootDir, 'schema.json'), 'utf8'));
        const prompts = JSON.parse(readFileSync(join(rootDir, 'prompts.json'), 'utf8'));

        console.log('📋 Validating prompts.json against schema...');

        // Basic structure validation
        if (!prompts.version || !prompts.updated || !Array.isArray(prompts.prompts)) {
            throw new Error('Invalid prompts.json structure');
        }

        // Version format validation
        if (!/^\d+\.\d+\.\d+$/.test(prompts.version)) {
            throw new Error(`Invalid version format: ${prompts.version}`);
        }

        // Date format validation
        if (isNaN(Date.parse(prompts.updated))) {
            throw new Error(`Invalid updated timestamp: ${prompts.updated}`);
        }

        // Validate each prompt
        const ids = new Set();
        for (const prompt of prompts.prompts) {
            // Required fields
            if (!prompt.id || !prompt.title || !prompt.description || !prompt.prompt) {
                throw new Error(`Prompt missing required fields: ${JSON.stringify(prompt, null, 2)}`);
            }

            // ID format validation
            if (!/^[a-z0-9-]+$/.test(prompt.id)) {
                throw new Error(`Invalid ID format: ${prompt.id}`);
            }

            // Duplicate ID check
            if (ids.has(prompt.id)) {
                throw new Error(`Duplicate prompt ID: ${prompt.id}`);
            }
            ids.add(prompt.id);

            // Variables validation
            if (prompt.variables) {
                const promptVars = prompt.prompt.match(/\{(\w+)\}/g) || [];
                const declaredVars = prompt.variables.map(v => `{${v}}`);
                
                // Check if all variables in prompt are declared
                for (const variable of promptVars) {
                    if (!declaredVars.includes(variable)) {
                        console.warn(`⚠️  Undeclared variable ${variable} in prompt ${prompt.id}`);
                    }
                }

                // Check if all declared variables are used
                for (const variable of declaredVars) {
                    if (!promptVars.includes(variable)) {
                        console.warn(`⚠️  Unused declared variable ${variable} in prompt ${prompt.id}`);
                    }
                }
            }
        }

        console.log(`✅ Validation passed! Found ${prompts.prompts.length} valid prompts.`);
        console.log(`📊 Categories: ${[...new Set(prompts.prompts.map(p => p.category))].join(', ')}`);
        console.log(`🏷️  Unique tags: ${[...new Set(prompts.prompts.flatMap(p => p.tags || []))].length}`);

    } catch (error) {
        console.error('❌ Validation failed:', error.message);
        process.exit(1);
    }
}

validate();