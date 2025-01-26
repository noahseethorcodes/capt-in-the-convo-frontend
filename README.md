# CAPTInTheConvo Frontend

Welcome to the frontend for CAPTInTheConvo, a forum application built using Vercel's Next.js framework, based on React.js. This guide provides instructions on setting up the frontend and presumes your local backend has been set up successfully. You can find the backend repository [here](https://github.com/noahseethorcodes/capt-in-the-convo-backend/tree/dev). This application was developed for the NUS CVWO AY24/25 Winter Assignment.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
    - [Step 1: Clone the Repository](#step-1-clone-the-repository)
    - [Step 2: Configure Environment Variables](#step-2-configure-environment-variables)
    - [Step 3: Run the Application](#step-3-run-the-application)
3. [Testing the Setup](#testing-the-setup)

---

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher)
- **npm** (version 7.x or higher)

---

## Local Setup

Follow these steps to set up the frontend on your local machine.

### Step 1: Clone the Repository

1. Clone the repository from GitHub:
    ```bash
    git clone https://github.com/noahseethorcodes/capt-in-the-convo-frontend.git
    cd capt-in-the-convo-frontend
    ```

2. Switch to the development branch:
    ```bash
    git checkout dev
    ```

### Step 2: Configure Environment Variables

1. Locate the `.env.example` file in the project root directory.

2. Fill in the required details:
    ```env
    BACKEND_URL=YOUR_BACKEND_URL # usually http://localhost:8080
    NEXTAUTH_SECRET=YOUR_SECRET_KEY # can be any random string
    ```

3. Rename the `.env.example` file to `.env.local`:
    ```bash
    mv .env.example .env.local
    ```

### Step 3: Run the Application

1. Install dependencies:
    ```bash
    npm install
    ```

2. Start the application:
    ```bash
    npm run dev
    ```

3. The frontend should now be running on [http://localhost:3000](http://localhost:3000).

---

## Testing the Setup

To verify the setup:

1. **Access the Login Page:**
    - Open your browser and navigate to [http://localhost:3000/login](http://localhost:3000/login).
    - Ensure the page loads without errors.

2. **Test Authentication:**
    - Register at the /register page and log in using the details you provided
    - After logging in, verify that you are redirected to `/convos`.

3. **Check API Connectivity:**
    - On the `/convos` page, confirm that threads load successfully from the backend.
    - This verifies the connection between the frontend and backend.

---

## Notes

- Ensure the backend is running locally and accessible at the `BACKEND_URL` specified in your `.env.local` file.