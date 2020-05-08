<h2>App Intro: </h2>
  <br>Team
<br>Don - Leading Man
<br>Brian
<br>Tom
<br>Kimo
<br>Vibha

<h3> The Goal</h3>
<p>The goal was to create a Check-in App that balanced data privacy and ease of use. 
In addition, administration capabilities in a separate App/Portal.</p>

This App has the capability to operate independently of the ERM API.
Specific tech details will be discussed by Don shortly.

To achieve this in the:

<UL><b>Front-End Portals</b>
  
<li>Check-in</li>
<li>Client-admin </li>
<li>System-admin</li>
<li>Terminal view</li>
</UL>
 

<UL><b>Back-End</b>
<li>Mongo Databases</li>
<li>Swagger interface</li>
<li>Report API</li>
</UL>

<b>Secure Check-In (Terminal Front-End)</b>

Each terminal has a security check prior to startup to ensure no unwanted terminal log-ins.

<b>Landing page for Patient check-in </b>
<UL>
<li>provides only generic information, protecting any data which may be seen as sensitive, until patient identity is confirmed.</li>
<li>Only appointments within 15min +/- with pending status show</li>
<li>Current default setting of max per page is 5 (this can be customized)</li>
</UL>

<b>Checkin-Verification fields</b>
<UL>
<li>can be enabled/disabled and overall what verification is required can be customized.</li>
<li>Swagger interface</li>
<li>Report API</li>
</UL>
 
 <b>Confirmation Details</b>
<UL>
<li>Once a patient has passed check-in, details are revealed to confirm and incorrect details can be addressed.</li>
</UL>
Patient input has been limited to control data integrity.

<b>Client-Admin Portal</b>
Client Admin has access to appointments and check-in terminals.

  <b>Appointments</b>
<UL>
<li>Search by Name</li>
<li>Sort by Name</li>
<li>Sort by Time</li>
  <li>Sort by Doctor</li>
  <li>Sort by Status</li>
  <li>Pagination feature (max 10 per page)</li>
  <li><b>Appointment Action</b>
<UL>
<li>Provides details of appointment</li>
<li>Allows staff to add appointment comments</li>
<li>Allows for appointment status override</li>
</UL></li>
</UL>

<b>Terminals</b>
<UL>
<li>Search by Name </li>
<li>Sort by Name </li>
<li>Sort by Status </li>
  <li>Token field provides Terminal startup login token (security PIN) </li>
<li><b>Terminal Info/Settings</b>
<UL>
<li>Toggle Terminal Enable/Disable </li>
<li>DELETE Terminal (preserves data in Database) </li>
<li>Toggle Security verifications on Terminal *Only if Terminal is Enabled </li>
</UL> </li>
</UL>


<b>System-Admin Portal</b>
System Admin portal is meant for an overall System Administration and has limited access to appointment data.
This is to create segregation of duties and data.  As a System Admin may be an IT technician and not be medical staff.  However, if required System Admin can create a Client Admin account for maintenance.

<b>Create Account</b>
<UL>
<li>Search by Name </li>
<li>Sort by Name </li>
<li>Report </li>
  <li>Sort by Status </li>
  <li>Token field provides Terminal startup login token (security PIN) </li>
  
  <li><b> Terminal Info/Settings</b>
  <UL>
<li>Toggle Terminal Enable/Disable  </li>
<li>DELETE Terminal (preserves data in Database) </li>
<li>Toggle Security verifications on Terminal *Only if Terminal is Enabled </li>
</UL> </li>
</UL>

<b>Account List</b>
<UL>
<li>Search by First Name </li>
<li>Search by Last Name </li>
<li>Search by Email </li>
  <li>Sort by First Name </li>
<li>Sort by Last Name </li>
<li>Sort by Role </li>
  <li><b>Client Info/Settings</b>
<UL>
<li>Account User Details </li>
<li>Reset Password </li>
<li>Toggle Enable/Disable  </li>
</UL>
 </li>
</UL>



<h2>Quick Start: </h2>

### Please make sure backend is running before starting 

### `npm i`

### `npm start`

<h2>Configure Backend Connection: </h2>
<p>
  If you want to connent to a different backend URL, please change the URL in App.js to

</p>

### `const baseURL = "http://localhost:3333/api/"`

to

### `const baseURL = [YOUR_URL]`
  
<h2>Default Access Path for Different Users: </h2>

<h4> System Admin:</h4> 

### `http://localhost:3000/login`

<h4> Client Admin:</h4> 

For Managing Appointments and Terminals:

### `http://localhost:3000/login`

For Login into Terminals:

### `http://localhost:3000`

<h4> Patient:</h4> 

### `http://localhost:3000`
<h2>Use Case Diagram: </h2>

![Use Case Diagram](https://raw.githubusercontent.com/xdc811/porton-health-industry-project-frontend/master/use%20case.png?token=AI5BWR7HIHWHPAVPVTQYUJS6X3RIW)

<h2>Wireframe: </h2>

[Wireframe can be seen here](https://xd.adobe.com/view/983b094b-89e7-46ce-760d-65839e1bd7ce-ee0a/)

<h2>Development Accounts: </h2>

<h4> system admin:</h4>
<p>
email: testsys@gmail.com
</p>
<p>
password: 123456
</p>

</br>

<h4>
client admin with seeded data:
</h4>
<p>
email: w@w.com
</p>
<p>
password: password
</p>

</br>

<h4>
client admin:
</h4>
<p>
email: test123@gmail.com
</p>
<p>
password: 1234567
</p>



</br>
</br>
</br>
</br>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
