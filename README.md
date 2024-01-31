# ChatterBox - Real-time Chat Application

### Overview
ChatterBox is a real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js), Material-UI for UI components, WebSocket for real-time communication, and Firebase for cloud storage of files. It provides users with a seamless and interactive interface for real-time communication.

### Features
 - Real-time communication: Users can chat in real-time, receiving messages instantly without refreshing the page.
 - Interactive Interface: The application offers an intuitive and user-friendly interface for a smooth chat experience.
 - File Sharing: Users can upload and share files in their conversations, facilitated by Firebase cloud storage.
 - Message Management: Users can delete individual messages or clear the entire chat history as needed.
 - Authentication: Secure authentication is provided to ensure that only authorized users can access the application.

### Technologies Used
 - MongoDB: NoSQL database for storing user data and chat history.
 - Express.js: Backend framework for building RESTful APIs and handling HTTP requests.
 - React.js: Frontend library for building interactive user interfaces.
 - Node.js: JavaScript runtime environment for server-side scripting.
 - WebSocket: Enables real-time, bidirectional communication between clients and server.
 - Material-UI: React component library for implementing UI designs.
 - Firebase: Cloud storage service for storing and serving user-uploaded files.

### Getting Started
#### Prerequisites
 - Node.js and npm installed on your machine
 - MongoDB Atlas account (or local MongoDB setup)
 - Firebase account for cloud storage

### Installation
1. Clone the repository:
   ```bash
    git clone https://github.com/ashwaniMaddheshiya/ChatterBox.git
   ```
2. Install Dependencies:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Set up environment variables:
   Create a '.env' file in the 'client' directory with the following content:
    ```bash
    REACT_APP_SERVER_URL=your_server_url
    REACT_APP_API_KEY=our_firebase_api_key
    REACT_APP_AUTH_DOMAIN=your_firebase_auth_domain
    REACT_APP_PROJECT_ID=your_firebase_project_id
    REACT_APP_STORAGE_BUCKET=your_firebase_storage_bucket
    REACT_APP_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    REACT_APP_APP_ID=your_firebase_app_id
    ```
4. Set up environment variables:
   Create a '.env' file in the 'server' directory with the following content:
    ```bash
    JWT_SECRET=your_jwt_secret_key
    MONGO_URI=your_mongodb_connection_uri
    CLIENT_URL=your_client_url
    ```
5. Run the application:
   ```bash
     //In the server directory
     node app.js
    // In the client directory
     npm start
   ```
6. The application will be accessible at 'http://localhost:3000.'

![image](https://github.com/ashwaniMaddheshiya/ChatterBox/assets/98683284/da9362be-c373-49f1-9acb-c77eb91750b9)


![image](https://github.com/ashwaniMaddheshiya/ChatterBox/assets/98683284/f6524cb6-be41-4fa2-a944-1a4bc5f7ff0b)




