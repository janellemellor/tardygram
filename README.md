# Tardygram (Instagram clone)

A backend for an Instagram clone using Express, Mongoose, MongoDB, and TDD with Jest. 

## Models

### User

Users can post new posts and leave comments. They have:

* A String `username`
* A String `passwordHash`
* A String `profilePhotoUrl`

### Post

Posts are photos with some text caption. They include:

* A reference to user `user`
* A String `photoUrl`
* A String `caption`
* An array of String `tags`

### Comment

Comments have:

* A reference to a user `commentBy`
* A reference to a post `post`
* A string `comment`

## Routes

### Auth

Authentication routes

* `POST /auth/signup`
  * creates a new user
  * responds with the created user
* `POST /auth/signin`
  * responds with a user
* `GET /auth/verify`
  * uses the `ensureAuth` middleware
  * responds with a user

### Posts

RESTful post routes

* `POST /posts`
  * requires authentication
  * creates a new post
  * responds with the new post
* `GET /posts`
  * responds with a list of posts
* `GET /posts/:id`
  * responds with a post by id
  * includes the populated user
  * includes all comments associated with the post (populated with commenter)
* `PATCH /posts/:id`
  * requires authentication
  * only can update the post caption
  * responds with the updated post
* `DELETE /posts/:id`
  * requires authentication
  * deletes a post
  * responds with the deleted post
* `GET /posts/popular`
  * responds with a list of the 10 posts with the most comments

### Comments

RESTful comments routes

* `POST /comments`
  * requires authentication
  * creates a new comment
  * responds with the comment
* `DELETE /comments/:id`
  * requires authentication
  * deletes a comment by id
  * responds with the deleted comment


