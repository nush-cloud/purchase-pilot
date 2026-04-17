# Architecture Notes

## Frontend
- Next.js App Router
- React components
- Bootstrap and React-Bootstrap UI

## Pages
- Home page
- Compare page
- Saved page

## API
- Route handler in `app/api/chat/route.ts`

## Data Flow
- User enters shopping need
- Frontend sends request to API route
- API route calls Anthropic
- Structured response returns to UI

## Planned State
- chat messages
- recommendations
- saved products
- compare products
- loading state
- error state