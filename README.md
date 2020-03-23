## Following are the steps to start the project in Development Mode

  

Clone the repository on your local machine and make sure you have **node** and **npm** installed. If not you can follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

  

### Starting the backend server

1. Open a terminal window and switch to the cloned repository **cd > notesapp**

2. Execute **npm install**

3. The dependencies required for the backend will get installed by this command

4. Now you are ready to start the server

5. Execute **npm start**

6. The server should be up and running at localhost:5000

---

  

## Starting the frontend client

  

1. Open a new terminal window and switch to the client folder **cd > notesapp > client**

2. Execute **npm install** to install the dependecies as we did earlier

3. Just one more step and you will be ready to start and play with the frontend

4. Execute **npm start**

5. Your browser window will launch automatically and the site should be hosted at localhost:3000 or any other port if it is busy.

---

  

## Site Flow

```
    A[SignIn Page] -- Successful SignIn --> B(Home Page)
    A -- Failed SignIn --> A
    A -- Register Button Clicked --> C(Register Page)
    B --> D{Add, Delete and Search notes}
    C --Successful Registration --> A

```


1. The first page is the **SignIn** Page where you can login with your *name* and *email-id* if you are already registered

2. Otherwise you can click on the **Register** button and register with your name and email-id

3. After successful registration you will be redirected to the **SignIn** page again

4. After successfully signing in, the **Home Page** will be visible where you can start adding notes

---

**Features**

  

1. Add a simple note with title and description

2. Add a list of items

3. Add an image

4. Add a Google Map location by moving the marker

5. Add a link

6.  **Search Bar** on the right side of navbar lets you type and filter your notes

7.  **Delete** notes by clicking on the trash icon present in each card



