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
    All schemas have the _id parameter.
###Login

Parameter | Type | Required | Observation
-----|------|-----|-----
username | string | yes | corresponds to the CPF
password | string | yes
accessType | string | yes | can be 'professor' or 'student'

###Professor

Parameter | Type | Required | Observation
-----|------|-----|-----
name | string | yes | 
date_of_birth | Date | yes | Using the date type from mongodb
cpf | string | yes | unique value
phone | string | yes | 
cep | string | yes | 
email | string | yes
address | string | yes | pass the complete address with number and complement
city | string | yes
uf | string | yes | use the acronym. Example: MG, SP
schoold | School Id | yes | the id returned when registering the school or selecting one
studentsId | array of Students Id | no
loginId | Login Id | yes | the Login id

###School
Parameter | Type | Required | Observation
-----|------|-----|-----
name | string | yes | 
code | string | yes | unique value
phone | string | yes | 
cep | string | yes | 
address | string | yes | pass the complete address with number and complement
city | string | yes
uf | string | yes | use the acronym. Example: MG, SP
site | string | no
email | string | no

###Student

Parameter | Type | Required | Observation
-----|------|-----|-----
name | string | yes | 
date_of_birth | Date | yes | Using the date type from mongodb
cpf | string | yes | unique value
phone | string | yes | 
cep | string | yes | 
address | string | yes | pass the complete address with number and complement
city | string | yes |
email | string | no |
uf | string | yes | use the acronym. Example: MG, SP
schoold | School Id | yes | the id returned when registering the school or selecting one
drawsId | array of Draws Id | no
loginId | Login Id | no | the Login id

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

###Professor

####List Professor (/professor)
Retrieves all professor in database.
Method: get
Response: Professors schema

####Insert Professor (/professor)
insert a professor. Detail: a professor only can be insert if his school already exist.
Method: post

**Request:**
Parameters | Type | Required | Observation
-----|-----|-----|-----
name | string | yes | 
date_of_birth | Date | yes | Using the date type from mongodb
cpf | string | yes | unique value
phone | string | yes | 
cep | string | yes | 
email | string | yes
address | string | yes | pass the complete address with number and complement
city | string | yes
uf | string | yes | use the acronym. Example: MG, SP
schoold | string | yes | the id returned when registering the school or selecting one
password | string | yes

**Response:**
Status | Message
----|----
200 | return the professor schema
400 | All fields are required
400 | User already exists
400 | General errors

###Student

####List Student (/professor)
Retrieves all students in database.
Method: get
Response: Professors schema

####Insert Student (/student)
insert a student. Detail: a professor only can be insert if his school already exist.
Method: post

**Request:**
Parameters | Type | Required | Observation
-----|-----|-----|-----
name | string | yes | 
date_of_birth | Date | yes | Using the date type from mongodb
cpf | string | yes | unique value
phone | string | yes | 
cep | string | yes | 
email | string | no |
address | string | yes | pass the complete address with number and complement
city | string | yes |
uf | string | yes | use the acronym. Example: MG, SP
schoold | string | yes | the id returned when registering the school or selecting one
password | string | no |
isFromProfessor |bool | yes | define if the student will need a login or not. 

**Response:**
Status | Message
----|----
200 | return the student schema
400 | All fields are required
400 | User already exists
400 | General errors

###School

####List School (/school)
Retrieves all professor in database.
Method: get
Response: Professors schema

####Insert School (/school)
insert a school.
Method: post

**Request:**
Parameters | Type | Required | Observation
-----|-----|-----|-----
name | string | yes | 
code | string | yes | unique value
phone | string | yes | 
cep | string | yes | 
address | string | yes | pass the complete address with number and complement
city | string | yes
uf | string | yes | use the acronym. Example: MG, SP
site | string | no
email | string | no

**Response:**
Status | Message
----|----
200 | return the school schema
400 | All fields are required
400 | User already exists
400 | General errors

###ViaCep

####Get Cep (/cep/:cep)
Retrieves from Viacep the address from a cep request.
Method: get
Response: viacep standard

###Validate CPF (/cpf/:cpf)
Retrieves if a CPF is valid or not
Method: get
Response: status 200 for `valid = true` or status 400 for `valid = false`