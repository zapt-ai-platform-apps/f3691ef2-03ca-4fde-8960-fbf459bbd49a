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

This application requires an API key from Abstract API to function. Without this key, you'll receive an error message when trying to look up phone numbers.

### Step-by-Step Guide to Get Your API Key:

1. Visit [Abstract API's Phone Validation API](https://www.abstractapi.com/api/phone-validation-api)
2. Create an account or sign in to your existing account
3. After signing in, you'll be directed to your dashboard
4. Find the Phone Validation API section and locate your API key
5. Copy your API key

### Adding Your API Key to the Application:

1. Open the `.env` file in the root directory of the project
2. Add your API key as follows:
   ```
   ABSTRACT_API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with the actual API key you copied
3. Save the file
4. Restart your development server or redeploy your application

### API Key Troubleshooting:

If you encounter a "Configuration error" or "API key required" message in the application:

1. Verify that your `.env` file exists in the project root
2. Ensure the `ABSTRACT_API_KEY` variable is set correctly (no spaces around the equals sign)
3. Check that the API key is valid and active in your Abstract API dashboard
4. Make sure the application has been restarted after adding the key

## Deployment

This application is configured for easy deployment on Vercel.

## Usage

1. Enter a phone number with the country code (e.g., +1 for US)
2. Click the "Search" button
3. View the location and carrier details for the number

## Security and Privacy

This application only uses publicly available information provided by telecom carriers. It doesn't track the real-time location of phones or access any private data.