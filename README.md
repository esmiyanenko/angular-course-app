## Clone

```
git clone https://github.com/esmiyanenko/angular-course-app
```

## Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `vendor` - contains the angular framework files

## Run the Application

We have preconfigured the project with a simple development web server and [grunt][gruntjs] tasks

### Starting the app

```
grunt up
```

Now browse to the app at `http://localhost:9999/`