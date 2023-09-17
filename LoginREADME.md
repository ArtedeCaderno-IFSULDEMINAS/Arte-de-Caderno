### Login

Parameter | Type | Required | Observation
-----|------|-----|-----
username | string | yes | corresponds to the CPF
password | string | yes
accessType | string | yes | can be 'professor' or 'student'

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