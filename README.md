# techbridge-fewd-winter2022

A bookstore of rare books

1. Index.html - the login in page of the application where the user will enter their username and password to get into the rest of the application. The user object will have the property: value of "manager: true" if the user is a manager

2. Home.html - this is the home page that will show the current book inventory in table form. It will be accessible to all employees, the book store employees and the manager.
   Button to allow employees and managers to update the info on a book

3. Submission.html - the add new book tab, will have a user to input all the necessary infomation in order to add a new book. Including a button to upload a picture. Will send the submission to the manager's page and the home page. We consider using the same page for updating by populating the input values from the table. The update button will bring the user to this page

4. Manager.html - the manager tab, will only appear if it satisfy the condition of a user being a manager. Allow a manager the ability to approve or deny add book requests. If the delete request is approve, it will be sent to the bottom of the manager's table. And the quantity will automatically change to 0;
   If the request is deny, it will remain on the home page

Every page except Login:

1. see the username and the remaining time before automatic logout when there is 15 seconds left.
2. Nav bar with nav items for each page.
3. A sign out button to manually logout
4. Includes a search bar that will allow the user to search books by title or author
