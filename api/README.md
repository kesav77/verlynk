<p>Welcome to documentation for My API.This document provides information on how to use the various endpoint provides by API</p>


<h5>How To Run?</h5>

1.Open the comment prompt where project is located

2.cmd-node sever.js

C:\apps\verlynk\api>node server.js
C:\apps\verlynk\api\config\
C:\apps\verlynk\api\config\
Waiting for request

Now you can create first new user. Next login and others by hitting proper url,params,body and header



<h5>Tables</h5>
1.user

coloumn :id,user_name,password

User table is stored All user information

2.post

column: id,content,AuthorID

post is stored all post and AuthorID is reference of users's table id


3.comments

column: id,post_id,comments,AuthorID

post_id is reference of post's table id

AuthorID is reference of users's table id


<h5>contents</h5>

1.create user 
2.Authentication
3.User Management
4.Blog posts
5.comments

<h4>create user</h4>

You can create Registration

URL: http://localhost:7000/users

Method: POST

Request Body:

            example:

            {
                "user_name": "john",
                "email": "john@gmail.com",
                "password":"john123"
                
            }

Response: success & Response data

<h4>Authentication</h4>

check a vaild credential and Generate JWT token 

URL: http://localhost:7000/login

Method: GET

Request Body:

            example: valid user credential

            
            {
                "email": "neelan@gmail.com",
                "password":"workworld789"
            }
                
Response: Successfully login and Generate JWT token

<h4>update User info</h4>

Update a User Information

URL: http://localhost:7000/update?id=3

Method: POST

params:

            provide valid user id

             example

             id =1

Request Body:

            example: provide valid user id

            
            {
               "email": "neelan@gmail.com",
               "password":"workworld789"   
            }

Headers:

        When you successfully login. you can get a token as a response

        example:

        authorization : seydfghjkxcvbhnjmthjykjykn
                
Response: Success

<h4>Delete Post</h4>

URL: http://localhost:7000/delete

if your id is not refernce with any other table .you can delete user

Method: DELETE


Headers:

        When you successfully login. you can get a token as a response

        example:

        authorization : seydfghjkxcvbhnjmthjykjykn
                
Response: success

<h4>craete Post</h4>

this url allow to create a new post

Create a post

URL: http://localhost:7000/blogpost

Method: POST


Request Body:

            example:

            
            {
                   "Content":"pokey men"
   
            }

Headers:

        When you successfully login. you can get a token as a response

        example:

        authorization : seydfghjkxcvbhnjmthjykjykn
                
Response: Response data


<h4>Get All Post</h4>

this url allow to get all post


URL: http://localhost:7000/getpost

Method: GET

Headers:

        When you successfully login. you can get a token as a response

        example:

        authorization : seydfghjkxcvbhnjmthjykjykn
                
Response: Response data


<h4>Update Post</h4>

this url allow to update post info

URL: http://localhost:7000/updatepost?id=9

Method: POST


Request Body:

            example:

            
            {

                 "Content":"peek space"
    
            }

Headers:

        When you successfully login. you can get a token as a response

        example:

        authorization : seydfghjkxcvbhnjmthjykjykn
params:

        example: id:9
                
Response: Response data

<h4>Delete Post</h4>

if your id is not refernce with any other table .you can delete post


URL: http://localhost:7000/delete?id=8

Method: DELETE


Headers:

        When you successfully login. you can get a token as a response

        example:

        authorization : seydfghjkxcvbhnjmthjykjykn
params:

        example: id:8
                
Response: success

<h4>create comment</h4>

URL: http://localhost:7000/postcomments

Method: POST


Request Body:

            example:

            
            {             
               "post_id":7,
               "comments":"nice"
            }
    
            

Headers:

        When you successfully login. you can get a token as a response

        example:

        authorization : seydfghjkxcvbhnjmthjykjykn
                
Response: Response data


<h4>Get all comment</h4>

URL: http://localhost:7000/getComments

Method: GET

                
Headers:

        When you successfully login. you can get a token as a response

        example:

        authorization : seydfghjkxcvbhnjmthjykjykn
                
Response: Response data



<h4>update comment</h4>

URL: http://localhost:7000/updateComments?id=7

Method: POST


Request Body:

            example:

            
            {             
              
               "comments":"nice"
            }
    
            

Headers:

        When you successfully login. you can get a token as a response

        example:

        authorization : seydfghjkxcvbhnjmthjykjykn

params: 

            example:
            id:7
                
Response: Response data

<h4>Delete comment</h4>

if your id is not refernce with any other table .you can delete comment


URL: http://localhost:7000/updateComments?id=7

Method: DELETE


Headers:

        When you successfully login. you can get a token as a response

        example:

        authorization : seydfghjkxcvbhnjmthjykjykn

params: 

            example:
            id:7
                
Response: Response data



















