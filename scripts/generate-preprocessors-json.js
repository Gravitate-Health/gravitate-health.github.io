const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Fetches repositories from GitHub using the gh CLI
 * @param {string} org - GitHub organization name
 * @param {string} pattern - Repository name pattern to search for
 * @returns {Array} Array of repository objects
 */
function fetchGitHubRepos(org, pattern) {
    try {
        // Check if gh CLI is installed
        execSync('gh --version', { stdio: 'ignore' });
    } catch (error) {
        throw new Error('GitHub CLI (gh) is not installed. Please install it from https://cli.github.com/');
    }

    try {
        // Fetch repositories using gh CLI
        // Format: name, description, url
        const command = `gh repo list ${org} --limit 100 --json name,description,url --jq ".[] | select(.name | startswith(\\"${pattern}\\"))"`;
        const output = execSync(command, { encoding: 'utf-8' });
        
        if (!output.trim()) {
            console.warn(`No repositories found matching pattern: ${pattern}`);
            return [];
        }

        // Parse the NDJSON output (one JSON object per line)
        const repos = output
            .trim()
            .split('\n')
            .filter(line => line.trim())
            .map(line => JSON.parse(line));

        return repos;
    } catch (error) {
        console.error('Error fetching repositories from GitHub:', error.message);
        throw error;
    }
}

/**
 * Processes repository data into the desired format
 * @param {Array} repos - Array of repository objects from GitHub
 * @returns {Array} Processed repository objects
 */
function processRepos(repos) {
    return repos.map(repo => ({
        name: repo.name,
        description: repo.description || 'No description provided',
        repoUrl: `${repo.url}.git`
    }));
}

/**
 * Separates repositories into examples and operational preprocessors
 * @param {Array} repos - Array of repository objects
 * @returns {Object} Object with 'examples' and 'preprocessors' arrays
 */
function categorizeRepos(repos) {
    const examples = [];
    const preprocessors = [];

    repos.forEach(repo => {
        // Check if it's an example/template repository
        if (repo.name.includes('example')) {
            examples.push(repo);
        } else {
            preprocessors.push(repo);
        }
    });

    // Sort both arrays by name
    examples.sort((a, b) => a.name.localeCompare(b.name));
    preprocessors.sort((a, b) => a.name.localeCompare(b.name));

    return { examples, preprocessors };
}

/**
 * Main function to generate the preprocessors JSON file
 */
async function generatePreprocessorsJson() {
    const workspaceRoot = path.resolve(__dirname, '..');
    const outputPath = path.join(workspaceRoot, 'preprocessors.oficial.json');

    console.log('Fetching preprocessing-service-* repositories from Gravitate-Health...\n');

    try {
        // Fetch all preprocessing-service-* repositories
        const repos = fetchGitHubRepos('Gravitate-Health', 'preprocessing-service-');
        
        if (repos.length === 0) {
            console.warn('⚠ No repositories found');
            return;
        }

        console.log(`Found ${repos.length} repositories\n`);

        // Process and categorize repositories
        const processedRepos = processRepos(repos);
        const { examples, preprocessors } = categorizeRepos(processedRepos);

        // Create output object
        const output = {
            preprocessors,
            examples
        };

        // Write to output file
        fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

        console.log(`✅ Generated ${outputPath}`);
        console.log(`   Operational preprocessors: ${preprocessors.length}`);
        console.log(`   Example/template repositories: ${examples.length}`);
        
        console.log('\n📋 Operational Preprocessors:');
        preprocessors.forEach(p => console.log(`   - ${p.name}`));
        
        if (examples.length > 0) {
            console.log('\n📚 Examples/Templates:');
            examples.forEach(e => console.log(`   - ${e.name}`));
        }

        return output;
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    generatePreprocessorsJson();
}

module.exports = { generatePreprocessorsJson };
