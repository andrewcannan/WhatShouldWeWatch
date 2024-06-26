# What Should We Watch
----------------
A web application for users to create and manage watchlists either alone or with other users.
<br>

[Mockup image to go here]
<br>
[Link to deployed site to go here]
<br>

## Contents

* [User Experience](#user-experience)
    * [User Goals](#user-goals)
    * [Web App Goals](#web-app-goals)
* [Design](#design)
    * [User Stories](#user-stories)
    * [Database Schema](#database-schema)

## User Experience

### User Goals

* **Organize watchlists collaboratively:**  Effortlessly share and manage watchlists with friends and colleagues by creating and joining groups. 
* **Discover new content:** Quickly find interesting films and shows to watch by browsing categorized watchlists and searching for specific titles. 
* **Maintain a curated watchlist:** Efficiently manage personal and group watchlists by adding, removing, and organizing content. 
<br>

### Web App Goals

* **Intuitive group management:** Provide a user-friendly interface for creating, joining, editing, and deleting groups.
* **Seamless search functionality:** Facilitate easy discovery of films and shows within groups through a robust search function. 
* **Clear content organization:** Categorize watchlist content by type (movie, tv show and content category e.g action, comedy etc) for easy browsing and navigation. 
* **Visually appealing watchlist details:** Include film/show titles, pictures, and descriptions to provide users with relevant information at a glance.
* **Simple watchlist management:** Allow users to easily add, remove, and manage content within individual and group watchlists.
* **Accessibility across devices:** Ensure the app is responsive and functions seamlessly on various devices, including desktops, tablets, and smartphones. 
<br><br>

## Design

### User Stories

| **User Story #** | **As A** | **I WANT TO BE ABLE TO...** | **SO THAT I CAN...** |
|---|---|---|---|
| 1 | Guest User | See the app name on the welcome screen | Understand the purpose of the app |
| 2 | Guest User | Navigate to a login or register page from the welcome screen | Access the full functionality of the app |
| 3 | Registered User | Log in with username and password | Securely access my watchlist groups |
| 4 | New User | Register for an account | Start creating and managing watchlist groups |
| 5 | Logged-in User | See a list of all groups I'm a member of | Easily access and manage my watchlists |
| 6 | Logged-in User | Create a new group | Organize my watchlists by category or theme |
| 7 | Logged-in User | Join a group using a unique code | Collaborate and share watchlists with others |
| 8 | Group Member | See all films/shows categorized | Easily browse the watchlist content |
| 9 | Group Member | Search for a specific film or show by name | Quickly add it to the group watchlist |
| 10 | Group Member | See details of each film or show (picture, description, remove option) | Manage my watchlist content effectively |
| 11 | Group Owner | Edit the group name and description | Keep the group information accurate |
| 12 | Group Owner | Delete a group | Maintain a clean and organized watchlist collection |
| 13 | Group Owner | Invite other users to my group with a unique code | Easily expand the group membership |
<br>

### Database Schema

Database will consist of five tables designed to manage information about users, groups and shows and thier relationships.

1. User Table 

This table stores user information.

* id (Integer, Primary Key, Not Null): Unique identifier for each user.
* username (String, Not Null): Username of the user.
* password (String, Not Null, Unique): Password of the user.

2. Group Table 

This table stores information about groups created by users.

* id (Integer, Primary Key, Not Null): Unique identifier for each group.
* created_by (Integer, Foreign Key, Not Null): ID of the user who created the group. This references user.id and has a cascading delete.
* group_name (String, Not Null): Name of the group.
* group_code (Integer, Not Null): Code associated with the group.
* avatar (Enum, Not Null): Avatar for the group, with possible values being 'avatar1' to 'avatar10'.

3. Show Table

This table stores information about various shows.

* id (Integer, Primary Key, Not Null): Unique identifier for each show.
* name (String, Not Null): Name of the show.
* description (Text, Not Null): Description of the show.
* pic_url (String, Not Null): URL of the show's picture.
* media_type (Enum, Not Null): Type of media, either 'tv' or 'film'.
* tmdb_genre_id (Integer, Not Null): Identifier for the genre from The Movie Database (TMDb).
* genre_name (String, Not Null): Name of the genre.

4. Users-Groups Table

This table defines a many-to-many relationship between users and groups.

* user_id (Integer, Foreign Key, Not Null): ID of the user. This references user.id.
* group_id (Integer, Foreign Key, Not Null): ID of the group. This references group.id.

5. Groups-Shows Table

This table defines a many-to-many relationship between groups and shows.

* group_id (Integer, Foreign Key, Not Null): ID of the group. This references group.id.
* show_id (Integer, Foreign Key, Not Null): ID of the show. This references show.id.
<br><br>

<img src="docs\readme-images\db-schema.png">
<br>