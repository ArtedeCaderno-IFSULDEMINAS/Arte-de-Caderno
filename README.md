# arte-de-caderno-back
Backend application for 'Arte de Caderno' website

## How to run locally
 1. Clone the repository - `git clone`
 2. Install nodejs v19.3.0
 3. Install the packages - `npm install`
 4. Add a file to the root of the project called _.env_
 5. As the example below, add the infos in _.env_ file. The MONGO_URI is the url to MongoDB Atlas Database, and you can define a port. If a port is not defined, the server will run on port 3000. Replace the user and password in Mongo URI.
 ```
    MONGO_URI="mongodb+srv://</user>:<password></password>@cluster0.5czq7bw.mongodb.net/test"
    PORT=8080
 ```
 6. Run using `npm start`

## Schemas
    All schemas have the _id parameter.
### Login

Parameter | Type | Required | Observation
-----|------|-----|-----
username | string | yes | corresponds to the CPF
password | string | yes
accessType | string | yes | can be 'professor' or 'student'

### Professor

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

### School
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

### Student

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

## Routes

### Login

#### List login (/login)

Retrieves all logins in database.
Method: get
Response: Logins schema

#### Logar (/login)

authenticates the user on the platform by generating the 2-factor code
method: post
response: informs the sending of the code to the registered email

### login with 2 factors authentication (/login2fa) 

it is necessary to pass user password and the 2-factor code containing 8 characters to perform the login
method: post
response: returns the data registered in the bank including the jwt token

### Reset Password (/forgotPassword) and (/resetPassword)
in the first route (/forgotPassword), you must pass the username you want to change the password. in the second route (/resetPassword), the user name, token and new password must be passed. The token will be sent by email containing 20 characters with duration of 1 hour.
method: post
response: informs if the password was actually changed

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

### Professor

#### List Professor (/professor)

Retrieves all professor in database.
Method: get
Response: List of Professors object

#### Get Professor By Id (/professor/:id)

Retrieves a professor by id
Method: get

**Request**
Id professor in URL

**Response**
Status | Message
----|----
200 | Professor object
404 | Professor not found

#### Get Schools by professor (/professor/school/:id)

Retrieves all schools linked to a professor
Method: get

**Request**
Id professor in URL

**Response**
Status | Message
----|----
200 | List of Schools object
400 | Professor is required
404 | Professor not found

#### Get students by professor (/professor/student/:id)

Retrieves all students linked to a professor
Method: get

**Request**
Id professor in URL

**Response**
Status | Message
----|----
200 | List of Students object
404 | Professor not found

#### Insert Professor (/insertProfessor)

Insert a professor. 
Detail: a professor only can be insert if his school already exist.
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

**Response:**
Status | Message
----|----
201 | Professor object
400 | Bad request
400 | User already exists
  
#### Insert Student by professor (/professor) 

Insert a student by professor.
Detail: a student inserted by a professor hasn't login associated. An student only can be insert if has an school linked.
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

**Response:**
Status | Message
----|----
201 | Student object
400 | User already exists
404 | Professor not found

### Student

#### List Student (/student)

Retrieves all students in database.
Method: get
Response: Student object

#### Get Student By Id (/student/:id)

Retrieves a student by id
Method: get

**Request**
Id student in URL

**Response**
Status | Message
----|----
200 | Student object
404 | Student not found

#### Insert Student (/insertStudent)

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

**Response:**
Status | Message
----|----
201 | Student object
400 | All fields are required
400 | User already exists

### School

#### List School (/school)
Retrieves all schools in database.
Method: get
Response: School object

#### Get School By Id (/school/:id)

Retrieves a school by id
Method: get

**Request**
Id school in URL

**Response**
Status | Message
----|----
200 | School object
404 | School not found

#### Insert School (/insertSchool)
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

#### List UFs (/school/uf)

List all distincts Ufs
Method: get
Response: List of cities

#### List Cities (/school/city)

List all cities from an UF
Method: post

**Request:**
Parameters | Type | Required | Observation
-----|-----|-----|-----
uf | string | yes | 

**Response:**
Status | Message
----|----
200 | return list of cities
400 | Uf is required
400 | Uf must have 2 characters

#### List Schools By City

List schools by city
Method: post

**Request:**
Parameters | Type | Required | Observation
-----|-----|-----|-----
city | string | yes | 

**Response:**
Status | Message
----|----
200 | return school schema
400 | City is required

### ViaCep

#### Get Cep (/cep/:cep)
Retrieves from Viacep the address from a cep request. 
Method: get
Response: viacep object

### Validate CPF (/cpf/:cpf)
Retrieves if a CPF is valid or not. Format: only numbers
Method: get
Response: status 200 for `valid = true` or status 400 for `valid = false`