# MetKnow API

- Contents
  1. [Groups](#Groups)
  2. [Account](#Account)
  3. [Downloads](#Downloads)
  4. [Invite](#Invite)
  5. [Member](#Member)
  6. [Profile](#Profile)
  7. [Quiz](#Quiz)
  8. [Upload](#Upload)
  9. [User](#User)
  10. [Question](#Question)

## Allowed Requests

```
PUT     : To create resource
POST    : Update resource
GET     : Get a resource or list of resources
DELETE  : To delete resource
```

## Responses

- 200 `Ok` - The request was successfull
- 400 `Bad Request` - The request was not understood or parameters are wrong
- 401 `Unauthorized` - Authentication failed or user does not have proper permissions
- 403 `Forbidden` - Access denied
- 500 `Internal Server Error` - Backend error

## Groups

- Contents
  1. [CreateGroup](#CreateGroup)
  2. [EditGroup](#EditGroup)
  3. [SetGroupAvailability](#SetGroupAvailability)
  4. [MakeGroupEditable](#MakeGroupEditable)
  5. [DeleteGroup](#DeleteGroup)
  6. [GetGroups](#GetGroups)
  7. [GetGroupDetails](#GetGroupDetails)
  8. [SetUserAsOwner](#SetUserAsOwner)
  9. [RemoveUserFromOwners](#RemoveUserFromOwners)
  10. [GetOwners](#GetOwners)

### CreateGroup

---

CreateGroup is used for master and subgroups. If a masterGroupId is supplied, the group is considered a subgroup of that masterGroup.

---

```
  Sample Request:

          PUT api/Group/CreateGroup
          {
              "Name" : "Group name",
              "Description": "Some description",
              "MasterGroupId": "int id",
          }
```

- Attributes
  - Name(string) maxlength(30): User supplied name
  - Description(string) maxlength(50): User supplied description
  - MasterGroupId(int) optional: Id of master group if creating subgroup

### EditGroup

---

Used to make changes to Name or Description

---

```
    Sample Request:

         POST api/Group/EditGroup
         {
             "Id" : "1"
             "Name" : "Group name",
             "Description": "Some description"
         }
```

- Attributes
  - Id(int): Id of group for changes to be made on
  - Name(string) maxlength(30): New name of group
  - Description maxlenght(50): New description of group

### SetGroupAvailability

---

Used to change if group isPrivate

---

```
     Sample Request:

         POST api/Group/SetGroupAvailability
         {
             "Id" : 0
             "IsPrivate": false
         }
```

- Attributes
  - Id(int): Id of group for changes to be made on
  - IsPrivate(bool): value for IsPrivate

### MakeGroupEditable

---

Creates copy of group where current user will be 'Creator'.

---

```
     Sample Request:

         POST api/Group/MakeGroupEditable/0
```

- Attributes
  - groupId(int): Id of group to be made editable

### DeleteGroup

```
     Sample Request:

         DELETE api/Group/DeleteGroup/0
```

- Attributes
  - groupId(int): Id of group to be deleted

### GetGroups

---

Gets a list of groups in pagination

---

```
    Sample Request:

        GET api/Group/GetGroups?limit=25&offset=0
```

- Attributes
  - limit(int): number of groups to retrieve
  - offset(int): starting point of groups
  - masterGroupId(int) optional: used when getting subgroups

### GetGroupDetails

```
    Sample Request:

        GET api/Group/GetGroupDetails/0
```

- Attributes
  - Id(int): Id of group

## Account

- Contents

  1. [Register](#Register)
  2. [ConfirmEmail](#ConfirmEmail)
  3. [Login](#Login)
  4. [RegisterWithLinkedin](#RegisterWithLinkedin) (Deprecated)
  5. [LoginWithLinkedin](LoginWithLinkedin) (Deprecated)
  6. [Logout](#Logout)
  7. [RefreshToken](#RefreshToken)
  8. [ResetPassword](#ResetPassword)
  9. [ChangePassword](#ChangePassword)
  10. [CompleteTutorial](#CompleteTutorial)

### Register

---

Register a new user and generates a confirmation token.

---

```
Sample request:

    POST api/account/register
    {
        "Email" : "test@email.com",
        "Password" : "simplepassword",
        "ConfirmPassword" : "simplepassword"
    }
```

```
Sample Response:

    {
        "Id": 1,
        "Email": "example@example.com",
        "ShowTutorial": true,
        "Token":
        {
          "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
          "RefreshToken": "eyJhbGciOiJIUzI1NiIsIn...",
          "ExpireDate": "2018-09-10T23:07:59Z",
          "Type": "Bearer"
        }
    }
```

- Attributes
  - Email(string) maxLength(129), minLength(3): user supplied email
  - Password(string) minLength(3), maxLength(20): user supplied password
  - ConfirmPassword: used to check againster Password, must be identitcal

### ConfirmEmail

---

(Currently disabled)Used to submit the email as confirmed

---

```
Sample Request:

    POST api/account/ConfirmEmail
    {
        "UserId" : "1",
        "Token": "CfDJ8MyB9uuzOYRAqQy9aUwmFWa.."
    }
```

```
Sample Response:

    {
        "Id": 1,
        "Email": "example@example.com",
        "ShowTutorial": true,
        "Token":
        {
          "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
          "RefreshToken": "eyJhbGciOiJIUzI1NiIsIn...",
          "ExpireDate": "2018-09-10T23:07:59Z",
          "Type": "Bearer"
        }
    }
```

- Attributes
  - UserId(int): Id of user to be confirmed
  - Token(string): Token generated from registration process and sent to email

### Login

---

Logs user in and returns users info.

---

```
Sample request:

    POST api/account/login
    {
        "Email" : "test@email.com"
        "Password" : "simplepassword"
    }
```

```
Sample Response:

    {
        "Id": 1,
        "Email": "example@example.com",
        "ShowTutorial": true,
        "Token":
        {
          "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
          "RefreshToken": "eyJhbGciOiJIUzI1NiIsIn...",
          "ExpireDate": "2018-09-10T23:07:59Z",
          "Type": "Bearer"
        }
    }
```

- Attributes
  - Email(string) maxLength(129): User supplied email
  - Password(string) maxLength(50): User supplied password

### Logout

---

Used to log the user out. Returns 200 if logout was successful.

---

```
Sample request:

    DELETE api/account/logout
```

### RegisterWithLinkedin

- Deprecated

### LoginWithLinkedin

- Deprecated

### RefreshToken

---

Refreshes users access token.

---

```
  POST api/account/refreshToken
  {
      "RefreshToken" : "eyJhbGciOiJIUzI1NiIsIn..."
  }
```

```
  Sample Response:

    {
          "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
          "RefreshToken": "eyJhbGciOiJIUzI1NiIsIn...",
          "ExpireDate": "2018-09-10T23:07:59Z",
          "Type": "Bearer"
    }
```

- Attribute
  - RefreshToken(string): Token to be refreshed

### ResetPassword

---

Emails password reset token to user. Returns 200 if request was successful.

---

```
Sample request:

    POST api/account/resetpassword
    {
       "Email": "test@email.com"
    }
```

### ChangePassword

---

Changes users password. Returns 200 if request was successful.

---

```
Sample request:

    POST api/account/changePassword
    {
       "OldPassword": "qwerty",
       "Password": "111111",
       "ConfirmPassword": "111111"
    }
```

### CompleteTutorial

---

Mark the tutorial as compeleted for user.

---

```
Sample Request:

    POST api/account/CompleteTutorial
```

```
Sample Response:

    {
        "ShowTutorial": false
    }
```

---

## Download

- Contents
  - [DownloadFileByUrl](#DownloadFileByUrl)

### DownloadFileByUrl

---

Downloads file from specified URL. Used to download images from google.

---

```
GET /api/Download/DownloadFileByUrl/url
```

- Attributes
  - Url(string): string of file to be downloaded

---

## Invite

- Contents
  - [SendInvite](#SendInvite)
  - [SendMultipleInvites](#SendMultipleInvites)
  - [GetShareableLink](#GetShareableLink)
  - [CreateInviteByLink](#CreateInviteByLink)
  - [GetInvites](#GetInvites)
  - [AcceptInvite](#AcceptInvite)
  - [DeclineInvite](#DeclineInvite)

### SendInvite

---

Sends invite to join a group to a single user. Returns 200 if request successful.

---

```
Sample Request:

    PUT api/Invite/SendInvite
    {
        "Email": "some@email",
        "GroupId": 0
    }
```

- Attributes
  - Email(string) maxLength(129): email of user to invite
  - GroupId(int): Id of group

### SendMultipleInvites

---

Sends invites to an array of users. Returns 200 if response was successful.

---

```
Sample Request:

     PUT api/Invite/SendMultipleInvites
     {

         "Emails": ["some@email", "second@email"],
         "GroupId": 0
     }
```

- Attributes
  - Emails(string[]): string array of all emails of users to be invited
  - GroupId(int): Id of group

### GetShareableLink

---

Retrieves a link for indicated group that will allow users to join the group.

---

```
Sample Request:

    GET api/Invite/GetShareableLink?groupId=8
```

```
Sample Response:

    {
        "GroupdId": 2,
        "Link": "https://api.metknowapp.com/Group?hash=OFGSYQPYUU"
    }
```

- Attributes
  - GroupId(int): Id of group

### CreateInviteByLink

---

Creates Invite by shareable link

---

```
Sample Request:

    POST api/Invite/CreateInviteBylink
    {
        "Hash": "%3f%40%3f%3fd%3f)%3f%7b%3fU%3f%03%3f%08%18%1b%3f%3fu%3e%3e%3f%3f%3f%3f%3f%3fY%3fV%05"
    }
```

```
Sample Response:

    {
        "Id": 2,
        "GroupId": 4,
        "Name": "Sample group",
        "Description": "Another group",
        "MemberImages": [ "path/Image.jpg", "path/Image2.jpg" ],
        "MemberCount": 5,
        "DateOfLastUpdate": "018-09-10T23:07:59Z"
    }
```

- Attributes
  - Hash(string): string of hash

### GetInvites

---

Returns a list of user's invites

---

```
Sample Request:

    GET api/Invite/GetInvites
```

```
Sample Response:

    {
        "Invites":
        [
            {
                "Id": 2,
                "GroupId": 4,
                "Name": "Sample group",
                "Description": "Another group",
                "MemberImages": [ "path/Image.jpg", "path/Image2.jpg" ],
                "MemberCount": 5,
                "DateOfLastUpdate": "018-09-10T23:07:59Z"
            },
            {
                "Id": 4,
                "GroupId": 3,
                "Name": "Group 2",
                "Description": "Another group 2",
                "MemberImages": [ "path/Image.jpg", "path/Image2.jpg" ],
                "MemberCount": 7,
                "DateOfLastUpdate": "017-02-10T23:07:59Z"
            }
        ]
    }
```

### AcceptInvite

---

Accepts invite of supplied id. Returns 200 if successful.

---

```
Sample Request:

    POST api/Invite/AcceptInvite?inviteId=4
```

- Attributes
  - InviteId(int): id of invite to accept

### DeclineInvite

---

Declines invite of supplied id. Returns 200 if successful.

---

```
Sample Request:

    POST api/Invite/DeclineInvite?inviteId=0
```

- Attributes
  - InviteId(int): id of invite to decline

---

## Linkedin

(Deprecated)

## Member

- Contents
  - [CreateMember](#CreateMember)
  - [EditMember](#EditMember)
  - [DeleteMember](#DeleteMember)
  - [GetGroupMembers](#GetGroupMembers)
  - [GetMember](#GetMember)
  - [GoogleImageSearch](#GoogleImageSearch)
  - [EditMyNotes](#EditMyNotes)
  - [AddMyProfile](#AddMyProfile)

### CreateMember

---

Creates new member in specified group.

---

```
Sample Request:

    PUT api/Member/0/CreateMember
    {
        "FirstName": "Test",
        "LastName": "Test",
        "Email": "asdas@asda.co",
        "Phone": "1234561235",
        "Gender": "",
        "City": "City",
        "Title": "",
        "Company": "",
        "WhereWeMet": "",
        "MyNotes": "" ,
        "Public": "",
        "CreatedAt": "",
        "ImageContentId": 0
    }
```

```
Sample Response:

    {
        "id": 4,
        "imageContent":
        {
            "id": 2,
            "createdAt": 2018-09-10T23:07:59Z",
            "mediumImage": "path/mediumImage.jpg",
            "previewImage": "path/previewImage.jpg"

        }
        "createdAt": 2018-09-10T23:07:59Z",
        "userId": 5,
        "isEditable": false,
        "firstName": "Test",
        "lastName": "User",
        "email": "test@email.com",
        "phone": "5555555555",
        "gender": "Male",
        "city": "St. Louis,
        "title": "Sales Director,
        "company": "MetKnow",
        "whereWeMet": "T-Rex",
        "myNotes": null,
        "public": "Note everyone can see"
    }
```

### EditMember

---

Makes edits to member

---

```
Sample Request:

    POST api/Member/EditMember
    {
        "Id": 0,
        "FirstName": "Test",
        "LastName": "Test",
        "Gender": "",
        "Email": "asdas@asda.co",
        "Phone": "1234561235",
        "City": "City",
        "Title": "",
        "Company": "",
        "WhereWeMet": "",
        "MyNotes": "" ,
        "Public": "",
        "CreatedAt": "",
        "ImageContentId": 2
    }
```

```
Sample Response:

    {
        "id": 4,
        "imageContent":
        {
            "id": 2,
            "createdAt": 2018-09-10T23:07:59Z",
            "mediumImage": "path/mediumImage.jpg",
            "previewImage": "path/previewImage.jpg"

        }
        "createdAt": 2018-09-10T23:07:59Z",
        "userId": 5,
        "isEditable": false,
        "firstName": "Test",
        "lastName": "Test",
        "email": "asdas@asda.co",
        "phone": "1234561235",
        "gender": "",
        "city": "City",
        "title": "",
        "company": "",
        "whereWeMet": "",
        "myNotes": "",
        "public": ""
    }
```

### DeleteMember

---

Deletes member of specified group. Returns 200 if successful.

---

```
Sample Request:

    DELETE api/Member/DeleteMember?memberId=0
```

### GetGroupMembers

---

Retrieve group members in pagination

---

```
Sample Request:

    GET api/Member/GetGroupMembers?groupId=31&limit=25&offset=0
```

```
Sample Response:
[
    {
        "FirstName": "Test",
        "LastName": "Test",
        "Email": "asdas@asda.co",
        "Phone": "1234561235",
        "Gender": "",
        "City": "City",
        "Title": "",
        "Company": "",
        "WhereWeMet": "",
        "MyNotes": "" ,
        "Public": "",
        "CreatedAt": "",
        "ImageContentId": 0
    },
    {
        "FirstName": "Test2",
        "LastName": "Test2",
        "Email": "testsemail@asda.co",
        "Phone": "5555555555",
        "Gender": "",
        "City": "City",
        "Title": "",
        "Company": "",
        "WhereWeMet": "",
        "MyNotes": "" ,
        "Public": "",
        "CreatedAt": "",
        "ImageContentId": 0
    }
]
```

- Attributes
  - GroupId(int): Id of group
  - Limit(int): number of records to pull
  - Offset(int): how many entries to be skipped

### GetMember

---

Get info for specified member

---

```
Sample Request:

    GET api/Member/GetMember?memberId=2
```

```
Sample Response:

    {
        "id": 4,
        "imageContent":
        {
            "id": 2,
            "createdAt": 2018-09-10T23:07:59Z",
            "mediumImage": "path/mediumImage.jpg",
            "previewImage": "path/previewImage.jpg"

        }
        "createdAt": 2018-09-10T23:07:59Z",
        "userId": 5,
        "isEditable": false,
        "firstName": "Test",
        "lastName": "Test",
        "email": "asdas@asda.co",
        "phone": "1234561235",
        "gender": "",
        "city": "City",
        "title": "",
        "company": "",
        "whereWeMet": "",
        "myNotes": "",
        "public": ""
    }
```

- Attributes
  - MemberId(int): id of user to retrieve

### GoogleImageSearch

---

Gets images of keyword. Returns array of links for query.

---

```
Sample Request:

    GET api/Member/GoogleImageSearch?query=face&minCount=10
```

- Attributes
  - Query(string): string to search for
  - MinCount(int): Minimum number of results

### EditMyNotes

---

Changes 'MyNotes' field value in members` profile. Returns 200 if successful.

---

```
Sample Request:

     POST api/Member/EditMember
     {
        "Id": 0,
        "MyNotes": "Some text"
     }
```

- Attributes
  - Id(int): id of member to edit
  - MyNotes(string) maxLength(200): Text to replace current notes

### AddMyProfile

---

Adds profile of current user to specified group. Returns 200 if successful.

---

```
Sample Request:

    POST api/Member/AddMyProfile?groupId=5
```

- Attribute
  - GroupId(int): Add profile to this group

---

## Profile

- Contents
  1. [GetProfile](#GetProfile)
  2. [EditProfile](#EditProfile)

### GetProfile

---

Returns profile of current user

---

```
Sample Request

    GET api/Profile/GetProfile
```

```
Sample Response:

    {
        "imageContentId": 4,
        "imageContent":
        {
            "id": 4,
            "createdAt": 2018-09-10T23:07:59Z",
            "mediumImage": "path/mediumImage.jpg",
            "previewImage": "path/previewImage.jpg"

        }
        "firstName": "Test",
        "lastName": "Test",
        "email": "asdas@asda.co",
        "phoneNumber": "1234561235",
        "gender": "",
        "city": "City",
        "title": "",
        "organization": "",
        "aboutMe": "A little something"
    }
```

### EditProfile

---

Changes user's profile data

---

```
Sample Request:

    POST api/Profile/EditProfile
    {
       "firstName"      : "name",
       "lastName"       : "name",
       "gender"         : "male",
       "city"           : "city",
       "organization"   : "company",
       "title"          : "Some title",
       "aboutMe"        : "Some description",
       "ImageContentId" : 0
    }
```

```
Sample Response:
    {
        "ImageContentId": 4,
        "ImageContent":
        {
            "id": 4,
            "createdAt": 2018-09-10T23:07:59Z",
            "mediumImage": "path/mediumImage.jpg",
            "previewImage": "path/previewImage.jpg"

        }
        "firstName": "Test",
        "fastName": "Test",
        "email": "asdas@asda.co",
        "phoneNumber": "1234561235",
        "gender": "",
        "city": "City",
        "title": "",
        "organization": "",
        "aboutMe": "A little something"
    }
```

- Attributes
  - firstName(string) maxLength(30)
  - lastName(string) maxLength(30)
  - email(string) maxLength(129)
  - phoneNumber(string) maxLength(12)
  - gender(string)
  - city(string) maxLength(30)
  - organization(string) maxLength(50)
  - title(string) maxLength(50)
  - aboutMe(string) maxLength(200)

## Quiz

- Contents
  1. [GetQuiz](#GetQuiz)
  2. [SaveQuizResult](#SaveQuizResult)
  3. [GetQuizResult](#GetQuizResult)
  4. [GetFlashcards](#GetFlashcards)
  5. [GetQuizzesResults](#GetQuizzesResults)

### GetQuiz

---

Gets Quizzes for specified group. NOTE: will be renamed.

---

```
Sample Request:

    GET api/Quiz/GetQuiz?groupId=8
```

```
Sample Response:
[{
		"imageUrl": "http://s3.us-east-2.amazonaws.com/metknow-member-images/dev/mid4fdb0fc7-8035-4c0e-92af-e6e7d0d31ae8.jpg",
		"variants": {
			"3": "Another Post",
			"0": "Nathan Compton",
			"2": "Sam Hampton",
			"1": "Person 8"
		},
		"answerIndex": 3,
		"memberId": 5
	},
	{
		"imageUrl": "http://s3.us-east-2.amazonaws.com/metknow-member-images/dev/mid87f41455-2879-494b-b856-67cac0b5787a.jpg",
		"variants": {
			"1": "Person 8",
			"3": "Tyler Packard",
			"2": "Tony Smith",
			"0": "Drew Upton"
		},
		"answerIndex": 1,
		"memberId": 149
	},
	{
		"imageUrl": "http://s3.us-east-2.amazonaws.com/metknow-member-images/dev/mid7779ccb1-0db9-4e2d-bd18-8baab8dc47a8.jpg",
		"variants": {
			"0": "New  Dummie",
			"1": "Raymond Hawkins",
			"3": "Add  Another",
			"2": "Tony Smith"
		},
		"answerIndex": 0,
		"memberId": 70
	}
]
```

- Attributes
  - GroupId(int): id of group

### SaveQuizResult

---

Creates new quiz question.

---

```
Sample Request:

    POST api/Quiz/SaveQuizResult
    {
        "Id" : "0"
        "QuestionsNumber" : "10"
        "NumberOfRightAnswers" : "6"
        "CreatedAt" : ""
        "GroupId" : "0"
        "UserId" : "0",
        "WrongAnswers":
        {
            "Answer" : "Pikachu",
            "RightAnswer" : "Charmander"
        }
    }
```

```
Sample Response:

    {
        "Id" : "0"
        "QuestionsNumber" : "10"
        "NumberOfRightAnswers" : "6"
        "CreatedAt" : ""
        "GroupId" : "0"
        "UserId" : "0",
        "WrongAnswers":
        {
            "Answer" : "Pikachu",
            "RightAnswer" : "Charmander"
        }
    }
```

### GetQuizResult

---

Returns quiz result

---

```
Sample Request:

GET api/Quiz/GetQuizResult?groupId=1
```

```
Sample Response:

{
	"id": 8,
	"questionsNumber": 3,
	"numberOfRightAnswers": 2,
	"createdAt": "2018-09-17T23:05:44Z",
	"groupId": 1,
	"userId": 1,
	"wrongAnswers": [{
		"answer": "Tyler Packard",
		"rightAnswer": "Person 8"
	}]
}
```

### GetFlashcards

---

Used to get all available flashcards for a group

---

```
Sample Request:

GET api/Quiz/GetFlashcards?groupId=1
```

```
Sample Response:

 [{
 	"id": 149,
 	"imageContent": {
 		"id": 6,
 		"createdAt": "2018-09-14T21:18:55Z",
 		"mediumImage": "http://s3.us-east-2.amazonaws.com/metknow-member-images/dev/mid87f41455-2879-494b-b856-67cac0b5787a.jpg",
 		"previewImage": "http://s3.us-east-2.amazonaws.com/metknow-member-images/dev/prev87f41455-2879-494b-b856-67cac0b5787a.jpg"
 	},
 	"createdAt": "2018-09-14T18:18:03Z",
 	"userId": null,
 	"isEditable": false,
 	"firstName": "Person",
 	"lastName": "8",
 	"email": "",
 	"phone": "",
 	"gender": "male",
 	"city": "",
 	"title": "",
 	"company": "",
 	"whereWeMet": "",
 	"myNotes": "",
 	"public": ""
 }, {
 	"id": 5,
 	"imageContent": {
 		"id": 7,
 		"createdAt": "2018-09-14T21:19:45Z",
 		"mediumImage": "http://s3.us-east-2.amazonaws.com/metknow-member-images/dev/mid4fdb0fc7-8035-4c0e-92af-e6e7d0d31ae8.jpg",
 		"previewImage": "http://s3.us-east-2.amazonaws.com/metknow-member-images/dev/prev4fdb0fc7-8035-4c0e-92af-e6e7d0d31ae8.jpg"
 	},
 	"createdAt": "2018-09-10T22:23:39Z",
 	"userId": null,
 	"isEditable": false,
 	"firstName": "Another",
 	"lastName": "Post",
 	"email": "",
 	"phone": "",
 	"gender": "male",
 	"city": "",
 	"title": "",
 	"company": "",
 	"whereWeMet": "Met in another place",
 	"myNotes": "",
 	"public": "This person is a bad sign"
 }, {
 	"id": 70,
 	"imageContent": {
 		"id": 5,
 		"createdAt": "2018-09-14T21:18:07Z",
 		"mediumImage": "http://s3.us-east-2.amazonaws.com/metknow-member-images/dev/mid7779ccb1-0db9-4e2d-bd18-8baab8dc47a8.jpg",
 		"previewImage": "http://s3.us-east-2.amazonaws.com/metknow-member-images/dev/prev7779ccb1-0db9-4e2d-bd18-8baab8dc47a8.jpg"
 	},
 	"createdAt": "2018-09-13T03:10:04Z",
 	"userId": null,
 	"isEditable": false,
 	"firstName": "New ",
 	"lastName": "Dummie",
 	"email": "",
 	"phone": "",
 	"gender": "male",
 	"city": "",
 	"title": "",
 	"company": "",
 	"whereWeMet": "",
 	"myNotes": "",
 	"public": ""
 }]
```

### GetQuizzesResults

---

Deprecated

---

## Upload

## User
