# Backend Templates Portfolio

A showcase of production-ready backend templates to help you ship faster with pre-configured auth, databases, and deployment scripts.

## Features

- **Auth Templates**: Ready-to-use authentication setups with popular providers
- **Payment Integration**: Templates with payment processing capabilities
- **Personal Projects**: Demo templates for showcasing your work
- **Production-Ready**: Battle-tested stacks with proper deployment configurations

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-opensource
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Templates

### Auth Templates
- **Better Auth + MongoDB**: Next.js API routes with Better Auth and MongoDB Atlas
- **Auth0 + React Router**: Vite + React Router with Auth0 SDK and TanStack Query

### Personal Projects
- **Personal Project Demo**: Basic setup for showcasing personal projects

## Using Templates

Each template includes:
- Pre-configured tech stack
- Deployment instructions
- Environment variables setup
- Example use cases

To use a template, run the provided npx command:

```bash
npx create-backend-template <template-slug>
```

## Project Structure

```
src/
├── app/
│   ├── templates/          # Templates showcase page
│   └── ...
├── components/             # Reusable UI components
├── data/
│   └── templates.ts        # Template definitions
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

This project is optimized for deployment on Vercel, but can be deployed to any platform supporting Next.js:

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## License

This project is open source and available under the [MIT License](LICENSE).
