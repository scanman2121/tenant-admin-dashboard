# Tenant Admin Dashboard

A modern admin dashboard for tenant management built with Next.js, Tailwind CSS, and TypeScript.

## Features

- 🏢 Building Management
- 👥 Employee Management
- 🎫 Access Control
- 📅 Resource Booking
- 🚗 Parking Management
- 🛠️ Work Orders
- 💳 Credits System
- 🔄 Vendor Management
- 👋 Visitor Management
- ⚙️ Settings & Setup

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components
- [React Icons](https://react-icons.github.io/react-icons/) - Icons
- [React Select](https://react-select.com/) - Select Components

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/scanman2121/tenant-admin-dashboard.git
   cd tenant-admin-dashboard
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                # Next.js app directory
│   ├── (main)/        # Main application routes
│   └── layout.tsx     # Root layout
├── components/        # React components
│   └── ui/           # UI components
├── lib/              # Utility functions
└── styles/           # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Notes

This project uses
[`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

This project uses
[`Tremor Raw`](https://raw.tremor.so/docs/getting-started/installation)
components for the UI.

## Learn more

For a deeper understanding of the technologies used in this template, check out
the resources listed below:

- [Tremor Raw](https://raw.tremor.so) - Tremor Raw documentation
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [Next.js](https://nextjs.org/docs) - Next.js documentation
- [Radix UI](https://www.radix-ui.com) - Radix UI Website
- [Recharts](https://recharts.org) - Recharts documentation and website
- [Tanstack](https://tanstack.com/table/latest) - TanStack table documentation

## Git Configuration

Make sure to set your Git user name and email for this repository:

```bash
git config --local user.name "Your Name"
git config --local user.email "your.github.email@example.com"
```

**Important:** The email address must be associated with your GitHub account. If you're seeing the error "No GitHub account was found matching the commit author email address", make sure to use the email address that's registered with your GitHub account.

This is required for deploying to Vercel.

## Vercel Deployment

This project is configured for deployment on Vercel. Make sure your Git configuration is properly set up before deploying to avoid authentication errors.
