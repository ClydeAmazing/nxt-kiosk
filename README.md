# nxt-kiosk

A modern self-service restaurant kiosk system built with Next.js, allowing customers to browse menus, place orders, and complete payments independently.

## Features

- 🍽️ Dine-in and takeaway ordering options
- 🛒 Interactive cart management
- 💳 Multiple payment methods (Card, Cash, QRIS)
- 📱 Responsive design for various screen sizes
- ⚡ Real-time menu updates
- 🎨 Modern UI with smooth animations

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- PocketBase (Backend)
- React Icons

## Prerequisites

- Node.js 18+ 
- PocketBase server running locally
- npm or yarn

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nxt-kiosk.git
cd nxt-kiosk
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file with:
```bash
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Main application code
- `/components` - Reusable UI components
- `/context` - React context providers
- `/services` - API and business logic
- `/hooks` - Custom React hooks
- `/api` - API types and interfaces

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
