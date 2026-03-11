## 📁 Project Structure

```
├── .env.local  
├── next.config.ts
├── package.json
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── public/                     # Static assets
├── src/               
│   ├── app/                    
│   │   ├── api/                # API routes
│   │   │   ├── subscription-status/
│   │   │   │   └── route.ts
│   │   │   └── subscription-toggle/
│   │   │       └── route.ts
│   │   ├── articles/           # Article pages
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── search/             # Search page
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # React components
│   │   ├── features/           # Feature-specific components
│   │   │   ├── search/
│   │   │   │   ├── CategoryFilter.tsx
│   │   │   │   └── SearchInput.tsx
│   │   │   └── subscription/
│   │   │       ├── PaywallCTA.tsx
│   │   │       └── SubscriptionButton.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── DateText.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── SearchIcon.tsx
│   └── lib/                    # Shared utilities
│       ├── actions/            # Server actions
│       │   └── subscription.ts
│       ├── types/              # TypeScript definitions
│       │   └── index.ts
│       ├── api.ts              # API client functions
│       ├── constants.ts        # Application constants
│       └── utils.ts            # Utility functions
```
