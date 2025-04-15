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
- Abstract API key (get one at [Abstract API](https://www.abstractapi.com/api/phone-validation-api))

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   - `ABSTRACT_API_KEY`: Your API key from Abstract API's phone validation service
   - `VITE_PUBLIC_APP_ID`: Your application ID
   - `VITE_PUBLIC_APP_ENV`: Environment (development/production)
   - `VITE_PUBLIC_SENTRY_DSN`: Sentry DSN for error tracking
   - `VITE_PUBLIC_UMAMI_WEBSITE_ID`: Umami analytics ID
   - `SENTRY_AUTH_TOKEN`: Sentry authentication token

4. Run the development server:
   ```
   npm run dev
   ```

## Obtaining an Abstract API Key

1. Visit [Abstract API](https://www.abstractapi.com/api/phone-validation-api) and sign up for an account
2. Navigate to the Phone Validation API section
3. Copy your API key from the dashboard
4. Paste the key in your `.env` file as `ABSTRACT_API_KEY=your_api_key_here`

## Deployment

This application is configured for easy deployment on Vercel.

## Troubleshooting

### "Missing ABSTRACT_API_KEY environment variable"

If you encounter this error, it means the application cannot find your Abstract API key. Make sure:
1. You've created a `.env` file at the root of your project
2. The file contains `ABSTRACT_API_KEY=your_api_key_here` (replace with your actual key)
3. You've restarted your development server after adding the key

## Usage

1. Enter a phone number with the country code (e.g., +1 for US)
2. Click the "Search" button
3. View the location and carrier details for the number

## Security and Privacy

This application only uses publicly available information provided by telecom carriers. It doesn't track the real-time location of phones or access any private data.