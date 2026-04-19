# Architecture Notes

## Frontend
- Next.js App Router
- React components
- Bootstrap and React-Bootstrap UI

## Pages
- Home page
- Home page includes navbar, hero section, prompt input area, and feature highlights
- Compare page
- Saved page

- Compare page uses shared mock recommendation data and a reusable comparison table component
- Saved page reuses recommendation data and card patterns to support bookmarking and later comparison flows

## API
- Route handler in `app/api/chat/route.ts`
- backend now normalizes Claude recommendation output before sending it to the frontend
- normalization improves price formatting, pros/cons consistency, match scores, and card stability

## Data Flow
- User enters shopping need
- Frontend sends request to API route
- API route calls Anthropic
- Structured response returns to UI

- mock recommendation data is used before live AI integration to validate layout and card structure
- homepage state connects local chat input with locally selected recommendation sets
- homepage chat now sends real POST requests to `/api/chat`
- backend responses drive assistant messages and recommendation cards
- homepage now sends full conversation history to the backend, not only the latest message
- backend uses conversation transcript context to reduce repetitive follow-up questions
## Planned State
- chat messages
- recommendations
- saved products
- compare products
- loading state
- error state

- mock chat messages for UI development before API integration
- local chat state allows new user messages to appear before backend integration