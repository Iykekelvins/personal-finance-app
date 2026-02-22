Personal Finance App
A full-stack personal finance management application that allows users to track income, manage budgets, set savings goals, and monitor recurring bills. Built with modern web technologies for a seamless financial tracking experience.

✨ Key Features
Wallet Management
Add fictional funds to your wallet and track your total balance in real-time. Every transaction—whether from pot deposits, withdrawals, or budget spending—automatically updates your wallet balance.

Transaction Tracking
View all your financial activity in one place. Transactions are automatically generated when you interact with pots, budgets, and wallet top-ups, giving you a complete audit trail of your money movements. Browse transactions with pagination, search, sort, and filter by category to find exactly what you need.

Budget Creation and Monitoring
Set spending limits for different categories and monitor your progress. Create budgets for Entertainment, Bills, Groceries, and more. Track how much you've spent against your maximum limit and stay in control of your finances.

Savings Pots
Create dedicated savings goals and watch your progress. Add money to pots for vacations, emergencies, or any goal you have in mind. Withdraw funds when needed, and see your savings grow visually. When you delete a pot, the balance automatically returns to your wallet.

Recurring Bills Management
Keep track of bills that repeat monthly. Create recurring bills, set the day they're due, and mark them as paid when you've settled them. Get a clear view of which bills are paid, due soon, or upcoming.

Comprehensive Overview
See all your financial data at a glance. The overview page displays your wallet balance, recent transactions, budget progress, savings pot goals, and recurring bill status—everything you need to manage your finances effectively.

🛠️ Tech Stack
Frontend
Next.js (with server actions)
TailwindCss
Shadcn UI

Backend
Node.js with Express
MongoDB with Mongoose ODM

Authentication
Clerk (secure user authentication and session management)

🎯 Core Functionality
Full CRUD operations for budgets and savings pots
Automatic transaction generation from financial activities
User-specific data isolation and authentication
Real-time wallet balance updates
Recurring bill status tracking
Advanced transaction filtering, searching, and sorting
Responsive design across all devices

🚀 Getting Started

npm install
npm run dev

Env Variables
MONGODB_URI=mongodb://localhost:27017/app-name
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

📋 How It Works
Top Up Your Wallet - Add funds to your fictional wallet from the overview page
Create Budgets - Set spending categories and limits
Create Savings Pots - Define savings goals and track progress
Track Transactions - All financial activities automatically appear as transactions
Manage Recurring Bills - Create bills and mark them as paid when due
Monitor Overview - View your complete financial snapshot
