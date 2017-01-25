##Data Models
* User:
  * Username
  * First Name
  * Last Name
  * Email
  * Password
  * Feedback
* Feedback:
  * Subject
  * Detail 
  * Resolve
  * Sort
    * Postive
    * Negative
    
##Data as Javascript Objects
* var user = {
  * Username: String,
  * First Name: String,
  * Last Name: String,
  * Email: String,
  * Password: String,
  * Feedback: []
  }
* var feedback = {
  * Subject: String,
  * Text: String,
  * Resolve: Boolean,
  }
* var sort = {
  * Postive: Boolean,
  * Negative: Bolean
  }

##Setting up Relationships
Example User
var exampleUser = {
  username = IAMaUser,
  first Name = Ellen,
  last Name = DeGeneres,
  email = Ellen@DeGeneres.com,
  password = IHaveAPassword,
  feedback = ["Coffee was done"]
  }
Example Feedback
 var feedback = {
   subject = String,
   text = String,
   resolve= Boolean,
   sort = [{
     postive = Boolean,
     negative = Bolean
     }]
  }
