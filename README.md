<hr>

<h3 align="center">
  <a href="https://snapsap.netlify.app/">VIEW LIVE APP</a> |
  <a href="https://github.com/A-M-IDIR/SnapSap/tree/main/CLIENT">VIEW CLIENT</a> |
  <a href="https://github.com/A-M-IDIR/SnapSap/tree/main/SERVER">VIEW SERVER</a>
</h3>

<hr>

<img src="https://firebasestorage.googleapis.com/v0/b/snapsap-f6590.appspot.com/o/TOOLS.png?alt=media&token=aa7060af-ac77-4638-bbaa-5aad26ee4968" style="width: 100%;" alt="">

<hr>

<img src="https://firebasestorage.googleapis.com/v0/b/snapsap-f6590.appspot.com/o/APP.png?alt=media&token=30885e3e-75ae-4cd9-877f-6d2210b1121a" style="width: 100%;" alt="">

## What is this and who is it for 🤷‍♀️

SnapSap is a task management application designed for Agile teams, built using the MERN stack. It facilitates project management based on the Scrum framework, enabling efficient organization, collaboration, and tracking of tasks and projects.

### Purpose

SnapSap is a project developed to showcase my skills as a software engineer and demonstrate an example of a modern MERN (MongoDB, Express.js, React, Node.js) stack application. Created in my spare time, this project serves as a testament to my proficiency in building full-stack web applications using industry-standard technologies and best practices.

### Development Timeline

SnapSap was developed over a relatively short period of about 1.5 to 2 months. During this time, I aimed to deliver a functional and robust application while acknowledging the constraints of time and resources. While certain compromises may have been made to meet deadlines, the overall quality and effectiveness of the application remain intact.

## Features ⚡

Here are some of the main features that SnapSap offers :

- Authentication with OTPs
- Email Verification
- Scrum Framework Integration
- Drag-and-Drop Task Management
- Notification System
- Responsive Design
- Team Collaboration
- Easy to Understand Project Structure

## Tech & Tools ⚙️

For SnapSap's frontend development, I utilized `React` for its flexibility and efficiency, complemented by `SCSS` and `Styled Components` for maintainable CSS. To manage data fetching and asynchronous requests, I integrated `Axios` and `React-Query`, ensuring seamless interactions with the backend. `Framer-Motion` was employed for fluid animations, enhancing the user experience with visually appealing transitions. On the backend, SnapSap relies on `Node.js` and `Express.js`, with `TypeScript` for type safety and productivity. `Express-Validator` ensures input validation for data integrity and security. `MongoDB` serves as the primary database solution, offering scalability and flexibility, while `Firebase-Storage` efficiently handles media storage like images, seamlessly integrated into the backend infrastructure.

## Setting up development environment 🛠

- Create a MongoDb account if you don't have it already and get the URI to your cluster.
- `git clone https://github.com/A-M-IDIR/SnapSap.git`.
- Create an empty `.env` file in `/SERVER`, copy `/SERVER/.env.example` contents into it, and fill it up.
- `cd SERVER` `yarn add` then `yarn start`.
- After running the server do the same with the `.env` in `/CLIENT`.
- Go into `/CLIENT/src/RESOURCES/CONSTANTS` and update the `Board` & `Project` & `Sprint` by following the directions.
- `cd client && yarn run dev` in another terminal tab.
- App should now be running on `http://localhost:3000/`.

## What's missing? 🙌

Given the relatively short development timeframe of approximately 1.5 to 2 months, certain functionalities in SnapSap were prioritized over others. While the current version provides a solid foundation for project management, there are several key features that are missing:

### Comments on Tasks 💬

The ability to add comments to specific tasks is a crucial feature for facilitating communication and collaboration within teams. While SnapSap allows for task assignment and status updates, the addition of comments would enable users to share thoughts, provide feedback, and discuss details related to individual tasks.

### Web Sockets ⭕

Real-time updates and communication are essential for enhancing the collaborative nature of SnapSap. Although the application currently utilizes polling functions for near-real-time updates, the implementation of Web Sockets would offer a more efficient and responsive solution. Additionally, Web Sockets could pave the way for future enhancements such as real-time chat functionality, further improving team communication and productivity.

### Testing 🚥

Due to time constraints, comprehensive testing was not prioritized during the development of SnapSap. While manual testing was performed to ensure basic functionality, the absence of automated testing poses limitations in terms of reliability and scalability. Integrating testing frameworks such as Cypress or Jest would enable automated testing of various features and scenarios, ensuring robustness and stability in future iterations of the application.

<hr>

<h3 align="center">
  <a href="">VIEW LIVE APP</a> |
  <a href="https://github.com/A-M-IDIR/SnapSap/tree/main/CLIENT">VIEW CLIENT</a> |
  <a href="https://github.com/A-M-IDIR/SnapSap/tree/main/SERVER">VIEW SERVER</a>
</h3>

<hr>
