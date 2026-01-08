# TAstudio.live

## Getting Started

1.  **Environment Variables**:
    Create a `.env.local` file in the root directory (this file is ignored by git).
    Copy the following content and fill in your Sanity Project ID:

    ```bash
    NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id_here"
    NEXT_PUBLIC_SANITY_DATASET="production"
    NEXT_PUBLIC_SANITY_API_VERSION="2024-01-07"
    ```

    You can get your Project ID by running `npx sanity@latest init` or by creating a project on [Sanity.io](https://sanity.io).

2.  **Run Development Server**:

    ```bash
    npm run dev
    ```

3.  **Access Sanity Studio**:
    Go to [http://localhost:3000/studio](http://localhost:3000/studio) to manage your content.

## Features
- Next.js 14 App Router
- Tailwind CSS
- Sanity CMS (Headless Backend)
