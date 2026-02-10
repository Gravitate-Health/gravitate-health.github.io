const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Converts a Git SSH URL to HTTPS URL
 * @param {string} sshUrl - Git SSH URL (e.g., git@github.com:org/repo.git)
 * @returns {string} HTTPS URL (e.g., https://github.com/org/repo.git)
 */
function convertSshToHttps(sshUrl) {
    if (!sshUrl) return null;
    
    // Handle both SSH and HTTPS URLs
    if (sshUrl.startsWith('https://')) {
        return sshUrl;
    }
    
    // Convert SSH to HTTPS: git@github.com:org/repo.git -> https://github.com/org/repo.git
    const match = sshUrl.match(/git@(.+):(.+)$/);
    if (match) {
        return `https://${match[1]}/${match[2]}`;
    }
    
    return sshUrl;
}

/**
 * Gets the Git remote URL for a repository
 * @param {string} repoPath - Path to the repository
 * @returns {string|null} Git remote URL or null if not found
 */
function getGitRemoteUrl(repoPath) {
    try {
        const remoteUrl = execSync('git remote get-url origin', {
            cwd: repoPath,
            encoding: 'utf-8'
        }).trim();
        return convertSshToHttps(remoteUrl);
    } catch (error) {
        console.warn(`Warning: Could not get git remote for ${repoPath}`);
        return null;
    }
}

/**
 * Reads a FHIR Library Resource JSON file and extracts lens information
 * @param {string} jsonFilePath - Path to the JSON file
 * @returns {object|null} Lens information or null if invalid
 */
function extractLensInfo(jsonFilePath) {
    try {
        const content = fs.readFileSync(jsonFilePath, 'utf-8');
        const fhirLibrary = JSON.parse(content);
        
        // Validate it's a FHIR Library resource
        if (fhirLibrary.resourceType !== 'Library') {
            return null;
        }
        
        return {
            name: fhirLibrary.name || null,
            description: fhirLibrary.description || null,
            title: fhirLibrary.title || null,
            status: fhirLibrary.status || null
        };
    } catch (error) {
        console.error(`Error reading ${jsonFilePath}:`, error.message);
        return null;
    }
}

/**
 * Finds the FHIR Library JSON file in a lens directory
 * @param {string} lensDir - Path to the lens directory
 * @returns {string|null} Path to the JSON file or null if not found
 */
function findLensJsonFile(lensDir) {
    const files = fs.readdirSync(lensDir);
    
    // Look for a .json file that's not package.json or package-lock.json
    const jsonFiles = files.filter(file => 
        file.endsWith('.json') && 
        file !== 'package.json' && 
        file !== 'package-lock.json'
    );
    
    if (jsonFiles.length === 0) {
        return null;
    }
    
    // Prefer files with 'lens' in the name
    const lensJsonFile = jsonFiles.find(file => file.includes('lens'));
    return lensJsonFile ? path.join(lensDir, lensJsonFile) : path.join(lensDir, jsonFiles[0]);
}

/**
 * Main function to generate the lenses.oficial.json file
 */
function generateLensesJson() {
    const workspaceRoot = path.resolve(__dirname, '..');
    const parentDir = path.resolve(workspaceRoot, '..');
    const outputPath = path.join(workspaceRoot, 'lenses.oficial.json');
    
    console.log('Searching for lens-logic-* folders in:', parentDir);
    
    const lenses = [];
    const entries = fs.readdirSync(parentDir, { withFileTypes: true });
    
    for (const entry of entries) {
        if (!entry.isDirectory() || !entry.name.startsWith('lens-logic-')) {
            continue;
        }
        
        const lensPath = path.join(parentDir, entry.name);
        console.log(`\nProcessing: ${entry.name}`);
        
        // Find the FHIR Library JSON file
        const jsonFilePath = findLensJsonFile(lensPath);
        if (!jsonFilePath) {
            console.warn(`  ⚠ No FHIR Library JSON file found`);
            continue;
        }
        
        console.log(`  Found JSON: ${path.basename(jsonFilePath)}`);
        
        // Extract lens information
        const lensInfo = extractLensInfo(jsonFilePath);
        if (!lensInfo) {
            console.warn(`  ⚠ Failed to extract lens info`);
            continue;
        }
        
        // Get git repository URL
        const repoUrl = getGitRemoteUrl(lensPath);
        
        // Create lens object
        const lensData = {
            name: lensInfo.name,
            description: lensInfo.description,
            title: lensInfo.title,
            status: lensInfo.status,
            repoUrl: repoUrl
        };
        
        lenses.push(lensData);
        console.log(`  ✓ Added: ${lensInfo.name}`);
    }
    
    // Sort lenses by name for consistency
    lenses.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    
    // Write to output file
    fs.writeFileSync(outputPath, JSON.stringify(lenses, null, 2), 'utf-8');
    
    console.log(`\n✅ Generated ${outputPath}`);
    console.log(`   Total lenses: ${lenses.length}`);
    
    return lenses;
}

// Run the script
if (require.main === module) {
    try {
        generateLensesJson();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

module.exports = { generateLensesJson };
