This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev

```

user details to login-
//admin
email - admin@email.com
password - 12345678

//author
email - author@email.com
password - 12345678

//Reader
email - reader@email.com
password - 12345678
.......

This is Nature blog app created in NextJS.

Folder Structure -

components
context
guard
hooks
layouts
pages
sections
serverConfig
styles
utils

-Create authentication module for blog post
-Created api using Next/api to authenticate
-Created context to use authentication.
-If authentication is successfull render to dashboard/home page.

-Created api to authentication using JWT token
-pages/api/auth/login
-Created api to register
-auth/register

-Created api to get all posts.
-pages/api/blog/getallpost

-Created api to create new posts, edit existed posts and delete posts.
-pages/api/blog/postblog

-Created api to add new Comment.
-pages/api/blog/addcomment

-Created api to get full content of individual post
-pages/api/blog/postdetail/[id].js

-Created layouts for NavBar footer
-Created Header
-layouts/mainLayouts/Header
-Created Footer
-layouts/mainLayouts/Footer

-Created Home page
Home - accessed by all users
Create post - accessed by admin and author
create user - accessed by only admin (admin can create user by defining their role).

-section/auth/login
-Created LoginForm to login and exported to pages/auth/login to render

-section/auth/register
-Created Register to register new user and exported to pages/auth/login to render

section/dashboard/home
-Created Hero Section-
-Created BlogList Component with pagination and can be searched by title.
-Created index component to export hero and BlogList to pages/dashboard/home for rendering

-section/dashboard/blogdetails
-Created BlogDetails section to show full content of individual post
-Created CommentForm component to get comment for individual post
-exported to pages/dashboard/blogdetails to render.

-section/dashboard/postblog
-Created CreatePost component to create a new post and edit existed post. Accessed by admin and author.
-exported to pages/dashboard/postblog to render.

.......

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
