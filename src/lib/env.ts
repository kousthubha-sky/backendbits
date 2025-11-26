/**
 * Environment variable validation
 * This runs at startup to ensure all required environment variables are present
 */

const requiredEnvVars = [
  'DATABASE_URL',
  'BETTER_AUTH_SECRET',
] as const;

export function validateEnvironment() {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required environment variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  // Check optional but recommended environment variables
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    warnings.push('GitHub OAuth not configured (GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET missing)');
  }

  if (!process.env.GITHUB_TOKEN) {
    warnings.push('GITHUB_TOKEN not set - GitHub API calls will be rate limited');
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    warnings.push('NEXT_PUBLIC_SUPABASE_URL not set - Supabase client features may not work');
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    warnings.push('NEXT_PUBLIC_SUPABASE_ANON_KEY not set - Supabase client features may not work');
  }

  // Validate BETTER_AUTH_SECRET strength
  const secret = process.env.BETTER_AUTH_SECRET;
  if (secret && secret.length < 32) {
    warnings.push('BETTER_AUTH_SECRET should be at least 32 characters long for security');
  }

  // Validate DATABASE_URL format
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && !dbUrl.match(/^postgresql:\/\/.+/)) {
    warnings.push('DATABASE_URL appears to be malformed - should be a PostgreSQL connection string');
  }

  // Validate allowed origins
  const allowedOrigins = process.env.ALLOWED_ORIGINS;
  if (process.env.NODE_ENV === 'production' && !allowedOrigins) {
    warnings.push('ALLOWED_ORIGINS not set in production - CORS may not work correctly');
  }

  // Log warnings
  if (warnings.length > 0) {
    console.warn('⚠️  Environment warnings:');
    warnings.forEach(warning => console.warn(`   - ${warning}`));
  }

  // Throw error for missing required variables
  if (missing.length > 0) {
    throw new Error(
      `❌ Missing required environment variables:\n` +
      missing.map(envVar => `   - ${envVar}`).join('\n') +
      `\n\nPlease check your .env file or environment configuration.`
    );
  }

  console.log('✅ Environment validation passed');
}

// Run validation immediately when this module is imported
validateEnvironment();