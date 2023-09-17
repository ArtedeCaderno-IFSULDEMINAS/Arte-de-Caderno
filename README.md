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

## Routes

### Professor

#### List Professor (/professor)

**Method** : GET

**Request** : -

**Response**:

Status | Return
--- | ---
200 | Type: Object Name: Professor
500 | Message: Internal Server Error

**Object Professor**:

Parameter | Type
---|---
name | string
email| string
cpf| string
uf| string
city| string
address| string
cep| string
phone| string
date_of_birth| Date
schoolId| Types.ObjectId[]
studentsId| Types.ObjectId[]
id?| string
loginId?| Types.ObjectId

#### Get Professor By Id (/professor/:id)

**Method** : GET

**Request** : 
Params: id

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Professor
400 | Message: invalid datas
404 | Message: Professor Not Found
500 | Message: Internal Server Error

**Object Professor**:

Parameter | Type
---|---
name | string
email| string
cpf| string
uf| string
city| string
address| string
cep| string
phone| string
date_of_birth| Date
schoolId| Types.ObjectId[]
studentsId| Types.ObjectId[]
id?| string
loginId?| Types.ObjectId

#### Get Schools by professor (/professor/school/:id)

**Method** : GET

**Request** : 
Params: id

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: School
400 | Message: invalid datas
404 | Message: Professor Not Found
500 | Message: Internal Server Error

**Object School**:

Parameter | Type
---|---
name| string
code| string
uf| string
city| string
address| string
cep| string
phone| string
id?| string
email?| string
site?| string

#### Get students by professor (/professor/student/:id)

**Method** : GET

**Request** : 
Params: id

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Student
400 | Message: invalid datas
404 | Message: Professor Not Found
500 | Message: Internal Server Error

**Object Student**:

Parameter | Type
---|---
email| string
name| string
cpf| string
uf| string
city| string
address| string
cep| string
phone| string
date_of_birth| Date
schoolId| Types.ObjectId
drawsId| Types.ObjectId[]
id?| string | undefined
loginId?| Types.ObjectId

#### Insert Professor (/insertProfessor)

**Method** : POST

**Request** :

Parameter | Type | Required | Unique
---|--- | --- | ---
name | string | true | false
email| string | true | false
cpf| string | true | true
uf| string | true | false
city| string | true| false
address| string | true| false
cep| string | true| false
phone| string | true| false
date_of_birth| Date | true| false
schoolId| Types.ObjectId[] | true| false
password| string | true| false

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Professor
400 | Message: invalid datas
400 | Message: message from mongoose
500 | Message: Internal Server Error

**Object Professor**:

Parameter | Type
---|---
name | string
email| string
cpf| string
uf| string
city| string
address| string
cep| string
phone| string
date_of_birth| Date
schoolId| Types.ObjectId[]
studentsId| Types.ObjectId[]
id?| string
loginId?| Types.ObjectId
  
#### Update Professor (/professor/update/:id)

**Method** : POST

**Request** :

Params: id

Body:
Parameter | Type | Required | Unique
---|--- | --- | ---
name | string | true | false
email| string | true | false
uf| string | true | false
city| string | true| false
address| string | true| false
cep| string | true| false
phone| string | true| false
date_of_birth| Date | true| false
schoolId| Types.ObjectId[] | true| false

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Professor
400 | Message: invalid datas
400 | Message: message from mongoose
500 | Message: Internal Server Error

**Object Professor**:

Parameter | Type
---|---
name | string
email| string
cpf| string
uf| string
city| string
address| string
cep| string
phone| string
date_of_birth| Date
schoolId| Types.ObjectId[]
studentsId| Types.ObjectId[]
id?| string
loginId?| Types.ObjectId

#### Insert Student By Professor Id (/professor/student/:id)
**Method** : POST

**Request** :
Params: id

Body:
Parameter | Type | Required | Unique
---|--- | --- | ---
name | string | false | false
email| string | false | false
cpf| string | false | true
uf| string | false | false
city| string | false| false
address| string | false| false
cep| string | false| false
phone| string | false| false
date_of_birth| Date | false| false
schoolId| Types.ObjectId[] | false| false

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Student
400 | Message: invalid datas
400 | Message: message from mongoose
404 | Professor not found
500 | Message: Internal Server Error

**Object Student**:

Parameter | Type
---|---
email| string
name| string
cpf| string
uf| string
city| string
address| string
cep| string
phone| string
date_of_birth| Date
schoolId| Types.ObjectId
drawsId| Types.ObjectId[]
id?| string | undefined
loginId?| Types.ObjectId

#### Delete Professor (/professor/:id)
**Method** : DELETE

**Request** :
Params: id

**Response**:

Status | Return
--- | ---
200 | Message: Professor deleted
404 | Message: Professor not found
500 | Message: Internal Server Error


### Student

#### List Student (/student)

**Method** : GET

**Request** : -

**Response**:

Status | Return
--- | ---
200 | Type: Object Name: Student
500 | Message: Internal Server Error

**Object Student**:

Parameter | Type
---|---
email| string
name| string
cpf| string
uf| string
city| string
address| string
cep| string
phone| string
date_of_birth| Date
schoolId| Types.ObjectId
drawsId| Types.ObjectId[]
id?| string | undefined
loginId?| Types.ObjectId

#### Get Student By Id (/student/:id)

**Method** : GET

**Request** :
Params: id

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Student
400 | Message: invalid datas
404 | Message: Student Not Found
500 | Message: Internal Server Error

**Object Student**:

Parameter | Type
---|---
email| string
name| string
cpf| string
uf| string
city| string
address| string
cep| string
phone| string
date_of_birth| Date
schoolId| Types.ObjectId
drawsId| Types.ObjectId[]
id?| string | undefined
loginId?| Types.ObjectId

#### Get Draws By Student Id (/student/:id/draws)

**Method** : GET

**Request** : 
Params: id

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Draws
400 | Message: invalid datas
404 | Message: Student Not Found
500 | Message: Internal Server Error

**Object Draws**:

Parameter | Type
---|---
title| string
linkImage| string
category| string
review| date?: Date ;  evaluator?: Types.ObjectId; score?: number; note: string

#### Insert Student (/insertStudent)

**Method** : POST

**Request** :

Parameter | Type | Required | Unique
---|--- | --- | ---
name | string | true | false
email| string | true | false
cpf| string | true | true
uf| string | true | false
city| string | true| false
address| string | true| false
cep| string | true| false
phone| string | true| false
date_of_birth| Date | true| false
schoolId| Types.ObjectId[] | true| false
password| string | true| false

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Student
400 | Message: invalid datas
400 | Message: message from mongoose
500 | Message: Internal Server Error

**Object Student**:

Parameter | Type
---|---
email| string
name| string
cpf| string
uf| string
city| string
address| string
cep| string
phone| string
date_of_birth| Date
schoolId| Types.ObjectId
drawsId| Types.ObjectId[]
id?| string | undefined
loginId?| Types.ObjectId
  
#### Update Student (/student/update/:id)

**Method** : POST

**Request** :

Params: id

Body:
Parameter | Type | Required | Unique
---|--- | --- | ---
name | string | true | false
cpf| string | true | true
uf| string | true | false
city| string | true| false
address| string | true| false
cep| string | true| false
phone| string | true| false
date_of_birth| Date | true| false
schoolId| Types.ObjectId[] | true| false

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Student
400 | Message: invalid datas
400 | Message: message from mongoose
404 | Message: Student not found
500 | Message: Internal Server Error

**Object Professor**:

Parameter | Type
---|---
name | string
email| string
cpf| string
uf| string
city| string
address| string
cep| string
phone| string
date_of_birth| Date
schoolId| Types.ObjectId[]
studentsId| Types.ObjectId[]
id?| string
loginId?| Types.ObjectId

#### Delete Student (/student/:id)
**Method**: DELETE

**Request**:
Params: id

**Response**:

Status | Return
--- | ---
200 | Message: Student deleted
404 | Message: Student not found
500 | Message: Internal Server Error

### School
[fazendo]

### Draws
[fazendo]

### Evaluator

#### List Evaluators (/evaluator)
**Method** : GET

**Request** :
Query:

Parameters | Type | Required | Default
--- | --- | --- | ---
page | integer | false | 1
limit | integer | false | 10

**Response**:

Status | Return
--- | ---
200 | Type: Object Name: Evaluators
500 | Internal Server Error

**Object Evaluator**:

Parameter | Type
---|---
name| string
email| string
cpf| string
draws| Types.ObjectId[]
id?| string
loginId?| Types.ObjectId

#### Get Evaluator By Id (/evaluator/:id)
**Method** : GET

**Request** :
Params: id

**Response**:

Status | Return
--- | ---
200 | Type: Object Name: Evaluator
400 | Message: invalid datas
404 | Message: Evaluator not found
500 | Message: Internal Server Error

**Object Evaluator**:

Parameter | Type
---|---
name| string
email| string
cpf| string
draws| Types.ObjectId[]
id?| string
loginId?| Types.ObjectId

#### Insert Evaluator (/insertEvaluator)

**Method** : POST

**Request** :

Parameter | Type | Required | Unique
---|--- | --- | ---
name | string | true | false
email| string | true | false
cpf| string | true | true
password| string | true| false

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Evaluator
400 | Message: invalid datas
400 | Message: message from mongoose
500 | Message: Internal Server Error

**Object Evaluator**:

Parameter | Type
---|---
name| string
email| string
cpf| string
draws| Types.ObjectId[]
id?| string
loginId?| Types.ObjectId

#### Get Draws By Evaluator Id (/evaluator/:id/draws)

**Method** : GET

**Request** : 
Params: id

Query:

Parameters | Type | Required | Default
--- | --- | --- | ---
page | integer | false | 1
limit | integer | false | 10

**Response**:

Status | Return
--- | ---
200 | Type: Object; Name: Draws
400 | Message: invalid datas
404 | Message: Evaluator Not Found
500 | Message: Internal Server Error

**Object Draws**:

Parameter | Type
---|---
title| string
linkImage| string
category| string
review| date?: Date ;  evaluator?: Types.ObjectId; score?: number; note: string

### ViaCep

#### Get Cep (/cep/:cep)
Retrieves from Viacep the address from a cep request. 
Method: get
Response: viacep object

### Validate CPF (/cpf/:cpf)
Retrieves if a CPF is valid or not. Format: only numbers
Method: get
Response: status 200 for `valid = true` or status 400 for `valid = false`