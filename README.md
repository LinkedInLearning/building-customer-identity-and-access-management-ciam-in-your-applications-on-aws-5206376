# Building Customer Identity and Access Management (CIAM) in Your Applications on AWS
This is the repository for the LinkedIn Learning course Building Customer Identity and Access Management (CIAM) in Your Applications on AWS. The full course is available from [LinkedIn Learning][lil-course-url].

![lil-thumbnail-url]

## Course Description

Customer-facing applications need user management to allow customers to create accounts, sign in, and engage in business. Adding user management to applications requires several functionalities and is a security-sensitive component for any application. In this course, instructor Mahmoud Matouk shows you how to offload customer identity management to managed services from AWS. Learn how to integrate your application securely with these services to accelerate the development of user management, increasing your confidence in the security posture of your application. With hands-on demos, Mahmoud demonstrates how to securely provide access to resources through your application and how to monitor interactions while learning how to detect unusual patterns.

_See the readme file in the main branch for updated instructions and information._
## Instructions
This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches
The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter. 
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
	
    Add changes to git using this command: git add .
	Commit changes using this command: git commit -m "some message"

## Instructor

Mahmoud Matouk

Enterprise Security Architect, Identity and Access Management

[0]: # (Replace these placeholder URLs with actual course URLs)

[lil-course-url]: https://www.linkedin.com/learning/building-customer-identity-and-access-management-ciam-in-your-applications-on-aws
[lil-thumbnail-url]: https://media.licdn.com/dms/image/v2/D4E0DAQHw9DeSauOhyA/learning-public-crop_675_1200/B4EZei9mLCGwAY-/0/1750785745920?e=2147483647&v=beta&t=8SWODzGZvwAG-rij5kLER2pK0P-iYdG-5CfTkwD3oEI

