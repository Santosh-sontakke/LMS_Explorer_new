

Process To Genrate apk file
to create universal apk comment split block from android/app/build.gradle
1> Open android studio -> Build -> generate signed apk 
2> choose keystore path of Demo.jks android-> app-> Demo.jks
3> enter alias as Demo
4> password is Santosh@123

if having issue enter below command on android directory ./gradlew assembleRelease
if build success then again genrate signed apk
click on build apk will be genrated at cd android/app/build/outputs/apk/release


Table of Contents
Features
Technologies Used
Setup Instructions
Using Redux

Setup Instructions
Clone the Repository:


bash
Copy code
npm install



bash
Copy code
npx react-native run-ios
For Android:

bash
Copy code
npx react-native run-android


