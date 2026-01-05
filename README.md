# E-commerce Authentication App

A Next.js application with complete authentication flow including Register, Login, and Email Verification.

## Features

- **Register Page**: Full Name, Email, Password, Phone Number, Country Code
- **Login Page**: Email and Password authentication
- **Verify Account Page**: 6-digit verification code input with OTP boxes
- **Dashboard**: Welcome page showing user name after successful authentication
- **API Integration**: Fully integrated with backend APIs
- **Responsive Design**: Mobile and desktop friendly UI using shadcn/ui

## Tech Stack

- **Framework**: Next.js 16.1.1
- **UI Library**: shadcn/ui components
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=your_api_base_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my-app/
├── app/
│   ├── (main)/
│   │   ├── login/          # Login page
│   │   ├── register/       # Register page
│   │   ├── verify/         # Verify account page
│   │   └── dashboard/      # Dashboard page
│   ├── layout.tsx          # Root layout
│   └── providers.tsx       # Global providers
├── features/
│   ├── auth/               # Authentication features
│   │   ├── components/     # Auth form components
│   │   ├── hooks/          # Custom hooks
│   │   ├── actions/        # Server actions
│   │   └── schemas/        # Validation schemas
│   └── dashboard/          # Dashboard features
├── components/
│   └── ui/                 # shadcn/ui components
└── lib/                    # Utilities and configurations
```

## API Endpoints

The application integrates with the following API endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/verify-email` - Email verification
- `POST /auth/verify-email/resend-code` - Resend verification code
- `GET /auth/user-data` - Get user profile

## Authentication Flow

1. **Register**: User creates an account with personal information
2. **Verify**: User verifies their email with a 6-digit code (test code: `123456`)
3. **Login**: User logs in with email and password
4. **Dashboard**: User is redirected to dashboard showing "Welcome, [User Name]"

## Testing

- **Verification Code**: Use `123456` for testing email verification

## Build for Production

```bash
npm run build
npm start
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy

## License

This project is private and proprietary.
