# GitHub API Integration

This document describes the GitHub API integration feature that allows users to search and display personal projects and portfolio items dynamically.

## Features

### 1. GitHub API Search
- **User Search**: Fetch all repositories from a specific GitHub user
- **Organization Search**: Fetch all repositories from a GitHub organization
- **Repository Search**: Search for repositories using keywords

### 2. Real-time Search
- Debounced search input (500ms delay) for optimal performance
- Loading states and error handling
- Automatic search triggering as user types

### 3. Data Display
The following GitHub project details are displayed:
- User/organization profile name
- Project name
- Programming languages (from GitHub API)
- Topics/tags
- Star count
- Fork count
- Last updated date
- Homepage/demo URL (if available)
- Repository URL

### 4. UI Integration
- Reuses existing `TemplatesShowcase` component
- Displays GitHub repositories using the same card layout as templates
- Consistent styling with the rest of the application
- Responsive design for all device sizes

## Implementation

### Components Modified

#### 1. `src/lib/github.ts` (New)
GitHub API service with the following functionality:
- `GitHubService` class for API interactions
- Methods for fetching user/org repositories
- Repository search functionality
- Data mapping from GitHub API to template format
- Support for optional GitHub token authentication

#### 2. `src/components/TemplatesShowcase.tsx`
Enhanced with GitHub search capabilities:
- New prop: `enableGitHubSearch` to toggle search functionality
- Search input with type selection (User/Org/Search)
- Real-time search with debouncing
- Error handling and loading states
- Integration of GitHub results with existing template display

#### 3. `src/app/templates/page.tsx`
Added "GitHub Projects" category:
- New category button for GitHub search
- Dynamic title and description based on selected category
- Conditional enablement of GitHub search feature

## Usage

### 1. Navigate to Templates Page
Visit `/templates` and click on the "GitHub Projects" category.

### 2. Search Options
- **User**: Enter a GitHub username (e.g., `octocat`)
- **Organization**: Enter an organization name (e.g., `facebook`)
- **Search**: Enter keywords to search repositories (e.g., `react typescript`)

### 3. View Results
Search results display in the same card format as templates, showing:
- Repository name
- Description
- Languages used
- Topics
- Star and fork counts
- Links to demo (if available) and source code

## Configuration

### GitHub API Token (Optional)
For higher rate limits (5,000 requests/hour vs 60 requests/hour), configure a GitHub Personal Access Token:

1. Create a token at: https://github.com/settings/tokens
2. Add to your `.env.local` file:
   ```
   GITHUB_TOKEN=your_github_personal_access_token
   ```

**Note**: The token is optional. Without it, you'll be limited to 60 requests per hour.

### Environment Variables
See `.env.example` for all available configuration options.

## API Rate Limits

### Without Token
- 60 requests per hour per IP address

### With Token
- 5,000 requests per hour

### Rate Limit Headers
The GitHub API includes rate limit information in response headers:
- `X-RateLimit-Limit`: Maximum requests per hour
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Time when rate limit resets (Unix timestamp)

## Data Mapping

GitHub repository data is mapped to the `TemplateDefinition` interface:

| GitHub Field | Template Field | Description |
|-------------|---------------|-------------|
| `name` | `name` | Repository name (formatted) |
| `full_name` | `slug` | Owner/repo (used as unique ID) |
| `description` | `summary`, `description` | Repository description |
| `languages` | `techStack` | Programming languages |
| `topics` | `techStack` | Repository topics/tags |
| `stargazers_count` | `features` | Star count |
| `forks_count` | `features` | Fork count |
| `homepage` | `demoUrl` | Homepage URL |
| `html_url` | `codeUrl` | Repository URL |
| `owner.login` | `features` | Repository owner |
| `updated_at` | `features` | Last update date |

## Error Handling

The implementation includes comprehensive error handling:
- Network errors
- API rate limit errors
- Invalid user/org names
- Empty search results
- Timeout errors

Errors are displayed to users with helpful messages.

## Performance Optimizations

1. **Debouncing**: Search input is debounced (500ms) to reduce API calls
2. **Caching**: Results are cached in component state
3. **Loading States**: Visual feedback during API calls
4. **Conditional Rendering**: GitHub search only enabled when needed

## Future Enhancements

Possible improvements for future versions:
- Pagination for large result sets
- Advanced filters (language, stars, forks)
- Sort options (stars, updated, name)
- Repository preview cards with more details
- Bookmark/favorite repositories
- Export search results
- Integration with GitHub GraphQL API for better performance

## Testing

To test the GitHub integration:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000/templates

3. Click "GitHub Projects" category

4. Try different search types:
   - User: `vercel`, `facebook`, `google`
   - Organization: `microsoft`, `netflix`
   - Search: `nextjs starter`, `react components`

## Troubleshooting

### Rate Limit Errors
If you encounter rate limit errors:
- Wait for the rate limit to reset (check `X-RateLimit-Reset` header)
- Configure a GitHub token for higher limits

### No Results Found
- Verify the username/org name is correct
- Check your internet connection
- Ensure the user/org has public repositories

### Build Errors
If you encounter build errors related to the auth system:
- Ensure `MONGODB_URI` and `BETTER_AUTH_SECRET` are set in `.env.local`
- The auth routes are dynamic and won't be statically rendered

## Support

For issues or questions:
- Check the GitHub API documentation: https://docs.github.com/rest
- Review Next.js documentation: https://nextjs.org/docs
- File an issue in the project repository
