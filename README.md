# arte-de-caderno-back
Backend application for 'Arte de Caderno' website

##How to run locally
 1. Clone the repository - `git clone`
 2. Install nodejs v19.3.0
 3. Install the packages - `npm init`
 4. Add a file to the root of the project called _.env_
 5. As the example below, add the infos in _.env_ file. The MONGO_URI is the url to MongoDB Atlas Database, and you can define a port. If a port is not defined, the server will run on port 3000. Replace the user and password in Mongo URI.
 ```
    MONGO_URI="mongodb+srv://</user>:<password></password>@cluster0.5czq7bw.mongodb.net/test"
    PORT=8080
 ```
 6. Run using `npm start`

##Schemas

###Login

Parameter | Type | Required | Observation
-----|------|-----|-----
id| string | yes
username | string | yes | corresponds to the CPF
password | string | yes
accessType | string | yes | can be 'professor' or 'student'

##Routes

### Login

####List login (/login)

Retrieves all logins in database.
Method: get
Response: Logins schema

####Logar (/login)
authenticates the user to the platform
Method: post

**Request:**
Parameters | Type | Required | Observation
-----|-----|-----|-----
username | string | yes | corresponds to the CPF
password | string | yes |

**Response:**
Status | Message
----|----
200 | return the student/professor schema
400 | Username or password cannot be null
400 | User not found
400 | Wrong Password



