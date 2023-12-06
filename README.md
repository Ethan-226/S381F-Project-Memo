Memo system

Group: 3
Name: 
SO KIT FUNG (12937533),
yy (00000100)

Application link: 

********************************************
# Login
The login feature allows users to authenticate and access the application.

- `GET /auth/login` - Renders the login page.
- `POST /auth/login` - Handles the login logic. If the username and password are valid, it sets the user session and redirects to the memo page. Otherwise, it renders the login page with an error message.

********************************************
# Logout
The logout feature allows users to end their session and log out of the application.

- `GET /auth/logout` - Destroys the user session and redirects to the home page.
********************************************
# CRUD service
-- Create memo form

- `GET /memo/create` - Renders the create memo form.

-- Handle memo creation logic

- `POST /memo/create` - Handles the creation of a new memo. If the title and content are provided, it creates a new memo in the database and redirects to the memo page. Otherwise, it renders the create memo form with an error message.

********************************************
# CRUD service
- Read

- Memo List

- `GET /memo` - Retrieves the list of memos from the database and renders the memo list page with the memos.

- View memo

- `GET /memo/:id` - Retrieves a specific memo by ID from the database and renders the view memo page with the memo details.

********************************************
# CRUD service
- Update

- Edit memo form

- `GET /memo/:id/edit` - Retrieves a specific memo by ID from the database and renders the edit memo form with the memo details.

- Handle memo update logic

- `POST /memo/:id/edit` - Handles the update of a memo. If the title and content are provided, it updates the memo in the database and redirects to the view memo page. Otherwise, it renders the edit memo form with an error message.

********************************************
# CRUD service
- Delete

- Handle memo deletion logic

- `POST /memo/:id/delete` - Deletes a specific memo by ID from the database and redirects to the memo list page.

********************************************
# Restful

The application follows the principles of RESTful architecture for the memo CRUD operations.

- `GET /memo` - Retrieves the list of memos.
- `GET /memo/:id` - Retrieves a specific memo by ID.
- `POST /memo` - Creates a new memo.
- `PUT /memo/:id` - Updates a specific memo by ID.
- `DELETE /memo/:id` - Deletes a specific memo by ID.