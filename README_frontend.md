# **Front-End Technology Description**

In this section, we will describe all technologies we had used in our project.

## **A brief view of technologies**

- ReactJS & NodeJS
- MaterialUI
- Others

We picked ReactJS as our front-end framework, all the front-end codes are based on this framework. And we picked MaterialUI as our style framework, it's similar with Bootstrap, but its style is Google material style which makes it differs to other common Bootstrap websites. Other technologies like Babel, webpack and JSX are integrated in React-scripts which is powered by npm for easier developing a ReactJS project.

## **Implementation detail**

This section we will describe how each component is created and how to integrate them into a completed functional website. Before movie to next step, we would like to introduce the basic architecture of our component's implementation: first of all we define the style class use MaterialUI `makeStyle()`, the style classes will be used by `className=classes.subComponent` in different component. Second, we create a ReactJS component class, which stores necessary states and data, if external data is needed before rendering this component, we will also implement `componentDidMount()` method inside the component class. Finally, we implement the `render()` method. Additionally, in order to pass the style classes to the component class, we use ReactJS Hook to wrap our component class.

### *Home.js*

This component includes three sub-components:

- movie trailer slider
- top 10 movies
- all movie genres

We implemented those sub-components in three functions: `showTrailerSlider()`, `showTopMovies()`, `showAllGenres()`. Then, we composed this sub-components at main component class `Home`'s `render()` function.

Next, because this component need to load data from database and we used `Fetch` to fetch data. So, we used `componentDidMount()` to access all movie genres, top 3 movie trailers and top 10 movie information from database, then render those data after this component was mounted to DOM.

Also, we defined different style class for different section, you can find in where `useStyle` is declared. Finally we use `Hook` to wrap the `Home` component to apply style classes.

### *Login.js*

This component displays a login avatar to indicate you can login there, also it provides two input fields for users to input their email and password respectively.

The most important part in this component is the login authentication function, named `login()`. It will read this component's state (contains email and password). First is to check if the email or password is empty and give corresponding error message. Second is to check if the formula is correct and give corresponding error message. If everything is correct in terms of format, then we will use the email and password to access server login endpoint, if login successful then we redirect to home page and set up `is_login`, `is_admin`, `token`, `name`, `email` to sessionStorage, if failure then throw error message and stay in login page.

We also defined different style classes for different sub-component.

Finally we wrapped the class `Login` with `Hook` in order to apply those style classes.

### *SignUp.js*

This component is similar with `Login` component, which includes sign up avatar, three input fields, i.e. email, password and user name. 

There is a `signup` function to process the sign up logic. Similar with `login` function, it will check if the input file is empty, if format is valid and then access the server's sign up endpoint. If sign up successfully, then we will do login procedure same as `login` function (after login successfully we store relevant information in sessionStorage). If sign up is failure, then throw out corresponding error message.

We also defined different style classes for different sub-component.

Finally we wrapped the class `Signup` with `Hook` in order to apply those style classes.

### *MovieDetail.js*

This component has two main sections:

- movie information section: movie basic information and movie trailer
- review section: add review and display all user review on this movie

We implemented `componentDidMount()` to fetch data from server then re-render data after the component was mounted to DOM.

For movie information section, we implemented `showMovieInfo()`, `showTrailer()` for generating the section elements. For review section, we used `showAddComment()`, `showAllComments()` for generating the section elements.

When user try to add review, we implemented `addReview()` to check: if user was login, if the user is not login then pop out the message that indicates user need to login to add review, otherwise it will pop out the success information from server.

We used `adminButton()` to check whether the user is admin, if true, then we will display the delete button after each review, so that the admin can delete any reviews if those reviews violate our usage policy.

When admin want to delete a specific review, we used `deleteReview()` to pass the movie id and current login user token to the server, and pop out the message from server. If delete successfully, it will refresh current movie detail page.

We also defined different style classes for different sub-component.

Finally we wrapped the class `MovieDetail` with `Hook` in order to apply those style classes.

### *MovieList.js*

This component is designed to show a list all movies in a card format. It accept a fetchURL props to tell this components which recourses you want to fetch, and after fetching, the return value should be a list of movies' information in a json format. This functionality is implemented in `componentDidMount()` so that it will load data from server and re-render the component after it was mounted to DOM. Also, to provide a beautiful interface when the fetching process takes a quite long time, it will render a "loading..." message in this page.

Also, we use `showMovies()` to generate movie information card elements.

We also defined different style classes for different sub-component.

Finally we wrapped the class `MovieList` with `Hook` in order to apply those style classes.

### *Navbar.js*

This component is implemented use `Hook` in ReactJS which allows us to use reactJS state in a non-class format.

This component implemented two versions, one for desktop and the other for mobile. Also we used anchor to handle opening and closing second menu. For example, `handleProfileMenuOpen()`, `handleProfileMenuClose()` to handle profile button on the right of navbar status. `handleNavMenuOpen()`, `handleNavMenuClose()` to handle mobile version menu button on the left of navbar status.

Also, we implemented the event when user logout use `handleLogoutButton()`. When user click logout, then we will clear the user login information in sessionStorage and redirect to the login page. `handleProfileButton()` to handle that when user click it then it will redirect to profile page.

Specially, we implemented the search button use `searchOperator()`. When user click that button, it will use `MovieList` component and pass a fetchURL to it, so that it can load the data which is fetched from server and display the result in a list format.

The navbar will display different button that depends on if user is login. If the user is login, then right button will display user profile button and logout button, otherwise display login button.

We also defined different style classes for different sub-component.

### *Profile.js*

This component includes two main sections:

- user information section: basic user information
- review section: all reviews by this user

We implemented `showWelcome()`, `showUserAvatar()`, `showUserInfo()`, `showReviews()` functions to generate corresponding elements and integrate them in `render()` function.

To avoid user try to access `/profile` page without login, we also implemented that when this component is rendered we will check if the user is login, if not then redirect to login page.

Because this page render the user information which need to fetch data from server first, so we implemented `componentDodMount()` to load data from server.

At each review, it will display a delete button so that user can delete its review on that specific movie in their profile page, which is more intuitive and easy to use.

We also defined different style classes for different sub-component.

Finally we wrapped the class `Profile` with `Hook` in order to apply those style classes.