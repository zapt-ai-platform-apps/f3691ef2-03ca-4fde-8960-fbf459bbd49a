# Phone Number Tracker

A web application that allows users to track the location and other details of a phone number.

## Features

- Track the location of any phone number worldwide
- Get carrier information for the phone number
- Validate phone numbers for accuracy
- Mobile responsive design

## Technology Stack

- React.js
- Tailwind CSS
- Vercel Serverless Functions
- Abstract API for phone validation

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   - ABSTRACT_API_KEY
   - VITE_PUBLIC_APP_ID
   - VITE_PUBLIC_APP_ENV
   - VITE_PUBLIC_SENTRY_DSN
   - VITE_PUBLIC_UMAMI_WEBSITE_ID
   - SENTRY_AUTH_TOKEN

4. Run the development server:
   ```
   npm run dev
   ```

## Deployment

This application is configured for easy deployment on Vercel.

## Usage

1. Enter a phone number with the country code (e.g., +1 for US)
2. Click the "Search" button
3. View the location and carrier details for the number

## Security and Privacy

This application only uses publicly available information provided by telecom carriers. It doesn't track the real-time location of phones or access any private data.