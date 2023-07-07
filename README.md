# UB Campus Photography

![University of Belize Campus Photography Logo](/public/assets/images/site-logo.png)

UB Campus Photography is a web application showcasing and promoting photographs of the University of Belize campus and activities therein. Users can sign in using their Google account and upload photos, which will be shown in their own profile page. Every photo also has their own page with additional information provided by the uploader.

This project was done by Andres Hung for the 2023 Harvard [CS50x](https://cs50.harvard.edu/x/2023/) Introduction to Computer Science online course.

Video Demonstration: [YouTube link]

Testable Website Deployment: https://ub-campus-photography.vercel.app

## Technological Design Choices

Once my final project idea was finalized earlier in the year, I spent a lot of time exploring other technologies outside the course, hence the half year deferral and the project probably being way more complicated than it needed to be! The idea was most certainly inspired by the [C$50 Finance](https://cs50.harvard.edu/x/2023/psets/9/finance/) problem set but I didn't want to template heavily off of it, therefore deciding to use something other than Python and the Flask framework. Personal decisions aside, below are the technologies and designs I decided to use for this project.

### Next.js

This decision is a three-fold combination of the [Next.js](https://nextjs.org/) web application framework, the [React](https://react.dev/) JavaScript library for web and native UI, and of course JavaScript itself. JavaScript quickly became the programming language that I've worked with the most, and after learning React 13 (hooks are so nice!), Next.js 13 was the perfect framework for combining the two. Next.js as a framework comes with numerous optimizations for data fetching, route handlers, server components, etc. that would have been a pain to learn to configure myself. I also decided to use the relatively new stable [App Router](https://nextjs.org/blog/next-13-4) in Next.js 13 as it happened to be so right when I was looking into learning the framework and I think it's good to learn where the direction of the technology is going. It did mean that finding resources and understanding the documentation was trickier without a background in the older Next.js Pages Router but I managed with the activity of the community. For deployment I went with [Vercel](https://vercel.com/home) as they have the best support for Next.js projects (as they maintain the framework!). Next.js was a delight to work with for the front and back end of my project.

### MongoDB Atlas/Mongoose

For my database solution I choose the combination of [MongoDB Atlas](https://www.mongodb.com/atlas) and [Mongoose](https://mongoosejs.com/), the former being a cloud platform for MongoDB and the latter being an object modeling library for MongoDB. It was an interesting choice to ultimately decide on a NoSQL database considering SQL was my favorite week in CS50, but the convenience of the online cloud database and fresh experience I had right off of freeCodeCamp's [Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis/) course won out over trying to implement something like PostgreSQL or SQLite in my project.

### Tailwind CSS

Another framework I used for my project was [Tailwind CSS](https://tailwindcss.com/). Initially I thought of using Bootstrap but it turned out it's a bit tricker to implement in a Next.js project, whereas Tailwind CSS was easier and had official support and documentation. I knew I didn't want to write pure CSS as CSS is pain, and the Tailwind utility classes and configuration were easy to pick up and utilize, and the framework also comes with the benefit of additional optimizations.

### Workplace & Site Design

I worked on my project in VS Code locally as it was much more convenient for me compared to the CS50 codespace, which was online and can lag when the connection is poor. It also allowed me to easily use git and GitHub to document my progress.

The website design was largely roughly sketched and designed on the fly, utilizing the purple and yellow colors of the University of Belize and various lighter shades. While it was extra work, I decided to draw my own site logo graphic to add a bit of personal flair and style. Had I more experience in Figma, I would have spent more time planning the design there but that's for another day.

The site draft that I used as a general guide can be seen [here](https://i.imgur.com/a4XAUq2.png).

## Folder & File Explanations

Below is a list of the folders and files I mainly worked on and a brief explanation for what each is for. Some files not mentioned are unedited configuration files from `create-next-app`.

- `/app` - the main folder where Next.js routes are created, containing pages for every route (folder) and route handler for api endpoints.
  - `/about/page.jsx` - the about page with project information.
  - `/api` - Next.js folder for api endpoint route handlers.
    - `/auth/[...nextauth]/route.js` - authentication route handler for NextAuth.js, configured for Google account sign ins and the creation of the new user entries in the database and storing session. Also exports options for `getServerSession` function for verifying session in other route handlers.
    - `/photo/route.js` - route handler for retrieving all photo entries from the database.
    - `/photo/[id]/route.js` - route handler for retrieving or deleting a specific photo using its database ID.
    - `/photo/new/route.js` - route handler for handling upload form input, creating a new entry in the database for a photo.
    - `/photo/random/route.js` - route handler for retrieving a random photo from the database.
    - `/profile/[id]/route.js` - route handler for retrieving a specific user and their information using its database ID.
  - `/photo/[id]/page.jsx` - dynamic route for photo pages, displaying a photo and its details based on the database ID.
  - `/profile/[id]/page.jsx` - dynamic route for profile pages, displaying a user's gallery of images based on the database ID.
  - `/upload/page.jsx` - the upload page with a form for signed in users to upload photos.
  - `/favicon.ico` - site icon.
  - `/layout.jsx` - the common website layout template, containing the header, footer and session provider for every other page.
  - `/loading.jsx` - Next.js loading fallback page.
  - `/not-found.jsx` - Next.js 404 page fallback.
  - `/page.jsx` - the home page, corresponding to `/`.
- `/components` - folder for reusable React components.
  - `/Footer.jsx` - footer component containing links.
  - `/Form.jsx` - form component for uploading photos. sends a request to `/api/photo/new/`.
  - `/Gallery.jsx` - gallery component that fetches all photos from `/api/photo/`, filters them based on user if necessary, and displays them in a CSS grid.
  - `/Header.jsx` - header component containing site logo and Nav component.
  - `/Nav.jsx` - navigation bar component for user sign ins, with additional dropdown options for signed in users. Also contains a button for fetching a random photo database ID and pushing to the corresponding photo page.
  - `/Photo.jsx` - photo component for displaying a photo and its information, containing a delete button for signed in users whose database ID matches that of the photo's uploader ID.
  - `/Profile.jsx` - profile component for displaying a user's profile page and gallery of their photos. Fetches user information from `/api/profile/[id]`.
  - `/Provider.jsx` - session provider component for NextAuth to enable session throughout entire website in `/app/layout.jsx`.
- `/models` - folder for Mongoose schemas and models.
  - `/photo.js` - schema and model for photos in the database with an uploader field which links to the users database.
  - `/user.js` - schema and model for users in the database.
- `/public/assets/images` - contains site logo and portrait drawing.
- `/styles/globals.css` - contains all styling classes created from applying Tailwind CSS utility classes. Is linked in `/app/layout.jsx` to enable global use in all other pages and components.
- `/utils/database.js` - utility function for connecting to MongoDB Atlas cluster database.
- `/LICENSE` - contains licensing information and attributions for favicon graphic.
- `/next.config.js` - contains additional configuration to allow for online Imgur images to work.
- `/package.json` - Node.js package information and list of dependencies.
- `/tailwind.config.js` - custom extended configuration for Tailwind CSS, containing custom color schemes and custom font.

## API

Two routes are available for fetching a specific photo or a random photo from the database. For a specific photo, you can use the database ID obtainable from the photo's page.

- Specific Photo: `https://ub-campus-photography.vercel.app/api/photo/[id]`
- Random Photo: `https://ub-campus-photography.vercel.app/api/photo/random`

Returned is a response containing JSON with the following format:

```
{
  "_id": "64a3178ab99255ec85215aa9", // photo id
  "uploader": {
    "_id": "649cbb4f93bb127b600743df", // user id
    "email": "2018118240@ub.edu.bz", // user email
    "name": "Andres Hung", // user name
    "__v": 0
  },
  "link": "https://i.imgur.com/9DvF8RD.jpg", // image link
  "hash": "9DvF8RD", // Imgur image hash
  "title": "Sunny Afternoon", // image title
  "description": "The connecting road between the RLC building and the library on a sunny February afternoon.", // image description
  "cameraModel": "iPhone 13 mini", // camera model
  "uploadDate": "2023-07-03T18:46:34.546Z", // upload date
  "__v": 0
}
```

## Deploying This Project

For hosting and testing this project on your own computer, you can clone, install, and run the project as follows:

1. `git clone https://github.com/andreshungbz/ub-campus-photography.git`
2. `cd ub-campus-photography`
3. `npm install`
4. `npm run dev`

You **must** provide your own variables in a `.env` in the root folder containing the following values:

- `GOOGLE_ID` - from creating a project on [Google Cloud Console](https://console.cloud.google.com/).
- `GOOGLE_CLIENT_SECRET` - also obtained from the same created project on [Google Cloud Console](https://console.cloud.google.com/).
- `MONGODB_URI` - the connection string to your [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.
- `NEXTAUTH_URL` - website URL or `http://localhost:3000`.
- `NEXTAUTH_URL_INTERNAL` - website URL or `http://localhost:3000`.
- `NEXTAUTH_SECRET` - a string generated from the command `openssl rand -base64 32` or online.
- `IMGUR_CLIENT_ID` - see the [Imgur API](https://apidocs.imgur.com/) docs.
- `IMGUR_ACCESS_TOKEN` - see the [Imgur API](https://apidocs.imgur.com/) docs.
- `IMGUR_ALBUM_HASH` - the unique hash of your Imgur album.

The project on Google Cloud Console must be properly configured for OAuth, with the authorized JavaScript origin being website or `http://localhost:3000` and the authorized redirect URI being the same website appended with `/api/auth/callback/google` or `http://localhost:3000/api/auth/callback/google`.

## Known Issues

- The Imgur API Access Token has an expiry date of 30 days. It can be easily refreshed but it means that the environment variable must be updated as to allow for create and delete operations of images, as the project is dependent on Imgur links for images.
- The free tier of the Imgur API is used in this project, which means that large-scale traffic of the web application can cause that limit to be exceeded, stopping normal functionality.
- Usage of free tiers in MongoDB Atlas cluster and Vercel deployment may mean that the performance may not be the absolute best (I'm cheap ok).
- When you delete a photo, if your connection is interrupted midway, the photo will be deleted from the database but not from the Imgur album. However, this problem does not affect the functionality of the web application, as it does not rely on the Imgur album for fetching photos.
- Sometimes you have to hard refresh the page for the session or gallery of images to appear.
- Extra privacy can be implemented for user emails in the API routes.

## Personal Project Highlights

Throughout working on this project, there were notable moments of progress!

- Learning to use the [Imgur API](https://apidocs.imgur.com/) to store images in the database as links. This greatly saves storage space as the MongoDB Atlas free tier cluster has a 512 Mb storage limit. Images are also saved to a personal Imgur album, which acts sort of like a secondary independent database.
- Utilizing the [ExifReader](https://github.com/mattiasw/ExifReader) JavaScript library for extracting exif data from images. While the only thing I do extract is the device model, it is a very cool detail.
- Using the NextAuth [getServerSession](https://next-auth.js.org/configuration/nextjs#getserversession) function to secure the API routes for uploading photos and deleting them. A security flaw I almost conceded arose from the way I used the database IDs for publicly available profile pages and photo pages, which made it particularly easy to craft a request in Postman that could delete anyone's photo without signing in. However, those routes now check for the existence of a valid session, else returning a 403 Unauthorized error.
- The usage of every other technology, be it Next.js, React, or Tailwind CSS. This is the first time I've worked on a large project what wasn't based on a problem set specification or online course exercise constraints.

## Extra Project Scope Ideas

These are the ideas and features I decided to leave out of this project's scope, else I never actually finish! They could be interesting ideas to implement when revisiting the project.

- As it stands, proper content moderation of uploaded images is relegated to just an email link where I would manually have to delete the photo from the database. Something along the lines of a secondary database for reviewing photos before approval to the main database can work great against the hypothetical malicious actor. It would be more restrictive but safer.
- Implementing account types of admin and user accounts. It would mostly be myself as the administrator, and making such that I can delete any photo would make it easier than going into the database itself. Another database can also be used for managing and displaying reports rather than just the current email link.
- Concurrent traditional user account sign up along with Google sign ins. Personally I never like using the Google sign in option when I sign up for websites although after this project I've gotten a greater appreciation for the simplicity and security it offers. For a simple username and password account system, I could implement encryption measures for verifying users.
- Restricting sign ins to University of Belize school emails. It would fit in the theme of the project and also discourage malicious actors.
- Set up a custom domain name on the Vercel deployment.

## Thanks

- The websites [freeCodeCamp](https://www.freecodecamp.org/), [W3schools](https://www.w3schools.com/) and [MDN Web Docs](https://developer.mozilla.org/en-US/) for the great free tutorials, exercises and resources for learning all aspects of web development.
- This [React 18 tutorial](https://youtu.be/2-crBg6wpp0) by [John Smilga](https://github.com/john-smilga) and this [Next.js 13 tutorial](https://youtu.be/wm5gMKuwSYk?list=LL) by JavaScript Mastery [Adrian Hajdin](https://github.com/adrianhajdin) for the comprehensive and practical video tutorials for the latest in React and Next.js respectively.
- The [CS50](https://cs50.harvard.edu/x/2023/) course by [David J. Malan](https://cs.harvard.edu/malan/) for laying the computer science foundation for me to be able to learn all the technologies I have until now.
