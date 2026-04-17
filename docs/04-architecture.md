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


## API
- Route handler in `app/api/chat/route.ts`

## Data Flow
- User enters shopping need
- Frontend sends request to API route
- API route calls Anthropic
- Structured response returns to UI

- mock recommendation data is used before live AI integration to validate layout and card structure

## Planned State
- chat messages
- recommendations
- saved products
- compare products
- loading state
- error state

- mock chat messages for UI development before API integration