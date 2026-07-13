# Sudo Estate

A premium, conversion-focused website for Sudo Estate—an AI-assisted creative production studio that transforms property renders, photographs, floor plans, and listing assets into cinematic advertisements and social campaign creative.

## Features

- Cinematic, responsive marketing homepage
- Interactive source-to-campaign comparison
- GSAP and Framer Motion animation
- Focused benefits and production process
- Spec campaign presentation with honest labeling
- Project enquiry form and Next.js lead API
- Mobile navigation and responsive layouts
- Premium Manrope and Source Serif typography

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP
- Framer Motion

## Local development

Install dependencies:

```bash
npm install
```

Start the Webpack development server on port 3001:

```bash
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001).

## Production validation

```bash
npm run lint
npm run build
```

## Lead storage

The `/api/leads` endpoint stores submissions in `data/leads.ndjson` during local development. The `data` directory is intentionally excluded from Git.

For a serverless production deployment, connect the endpoint to durable storage or an email service because local filesystem writes are not persistent on platforms such as Vercel.
