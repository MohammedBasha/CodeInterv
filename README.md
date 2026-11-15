# CodeInterv -- Video Interview & Coding Platform

CodeInterv is a web-based technical interview platform that brings live
video interviews and collaborative coding into one workspace.
Interviewers and candidates can communicate face-to-face while working
through programming challenges in a code-editor-style interface.

## Features

-   **Live video and audio calls** for remote technical interviews.
-   **Screen sharing** to make it easier to explain solutions, review
    code, and collaborate.
-   **In-call reactions** for quick, lightweight feedback.
-   **Call recordings** for reviewing interview sessions, subject to the
    application's recording and consent flow.
-   **Collaborative coding workspace** with a VS Code-inspired
    interface.
-   **Multiple programming languages**, including JavaScript, Java, and
    Python.
-   **Coding challenges** with problem descriptions and starter code.
-   **Authentication with Clerk**, supporting Google, GitHub, and email
    sign-in.
-   **Real-time application data** powered by Convex.
-   **Video infrastructure** powered by Stream.

## Tech Stack

  Area                             Technology
  -------------------------------- --------------------
  Frontend framework               Next.js 16
  UI library                       React 19
  Language                         TypeScript
  Authentication                   Clerk
  Real-time database and backend   Convex
  Video and audio                  Stream Video
  Styling                          Tailwind CSS 4
  UI primitives                    Base UI, shadcn/ui
  Icons                            Lucide React
  Code quality                     ESLint

## Getting Started

### Prerequisites

Make sure you have the following installed and configured:

-   Node.js (use a version compatible with the installed Next.js
    release)
-   npm
-   A Clerk application
-   A Convex project
-   A Stream Video application

### 1. Clone the repository

``` bash
git clone <repository-url>
cd codeinterv
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the credentials
required by your Clerk, Convex, and Stream configurations.

A typical setup may look like this:

``` env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Convex
NEXT_PUBLIC_CONVEX_URL=

# Stream
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
```

> **Important:** These names are examples based on common provider
> conventions. Confirm the exact environment variable names used by the
> application code and never expose secret keys in client-side code or
> commit `.env.local` to version control.

### 4. Configure the providers

-   **Clerk:** Create your application, enable the desired Google,
    GitHub, and email authentication methods, and configure the required
    redirect URLs.
-   **Convex:** Create or select a Convex deployment and connect the
    application using the deployment URL. Deploy the project's Convex
    functions if the repository includes them.
-   **Stream:** Create a Stream Video application and configure its API
    key and server-side secret. Keep token generation and secret usage
    on the server.

### 5. Start the development server

``` bash
npm run dev
```

Open <http://localhost:3000> in your browser.

## Available Scripts

  Command           Description
  ----------------- ----------------------------------------
  `npm run dev`     Starts the Next.js development server.
  `npm run build`   Creates a production build.
  `npm run start`   Starts the production server.
  `npm run lint`    Runs ESLint.

## How It Works

1.  A user signs in through Clerk using an enabled authentication
    method.
2.  The interviewer and candidate join an interview session.
3.  Stream provides the real-time audio/video experience, including
    supported call controls such as screen sharing and reactions.
4.  The coding workspace presents the selected challenge, its
    instructions, and starter code.
5.  Convex provides the application's real-time data layer for the
    interview experience.

The exact session lifecycle, permissions, persistence model, and
recording behavior depend on the implementation in the repository and
the configured provider settings.

## Project Structure

The exact structure may evolve as the project develops. A typical
Next.js App Router layout could look like this:

``` text
codeinterv/
├── app/                 # Next.js routes and layouts
├── components/          # Shared UI components
├── convex/              # Convex schema, queries, and mutations
├── lib/                 # Shared utilities and provider helpers
├── public/              # Static assets
├── .env.local           # Local environment variables (not committed)
├── package.json
└── README.md
```

> This is an illustrative structure, not a verified listing of the
> repository's current files.

## Current Scope and Notes

-   The code editor is described as VS Code-inspired and is intended to
    support multiple languages and challenge starter code.
-   The listed dependencies do not identify a dedicated editor package
    or a code-execution service. If the application uses a specific
    editor (for example, Monaco or CodeMirror) or runs submitted code,
    document and configure that integration separately.
-   Stream recording availability, storage, permissions, and retention
    depend on the Stream setup and the application's implementation.
-   Before deploying publicly, configure production environment
    variables, authentication redirect URLs, provider permissions, and
    appropriate recording consent and privacy notices.

## License

No license has been specified yet. Add a `LICENSE` file and update this
section before distributing the project.
