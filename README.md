# arte-de-caderno-back
Backend application for 'Arte de Caderno' website

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


