<!doctype html>
<html lang="en" ng-app = "myApp">
<head>
  <meta charset="UTF-8">
  <title>Find the One</title>
  <meta name="viewport" content="width=device-width, user-scalable=no">
  <link href='https://fonts.googleapis.com/css?family=Lato:400,100,700,900' rel='stylesheet' type='text/css'>
  
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/navbar-fixed-top.css" rel="stylesheet">

  <script src="js/lib/angular/angular.min.js"></script>
  <script src="js/lib/angular/angular-route.min.js"></script>
  <script src="js/lib/angular/angular-animate.min.js"></script>

  <script src="https://www.gstatic.com/firebasejs/3.4.1/firebase.js"></script>
  <script src="https://cdn.firebase.com/libs/angularfire/2.1.0/angularfire.min.js"></script>

  <script src="js/app.js"></script>
  <script src="js/controllers/registration.js"></script>
  <script src="js/controllers/success.js"></script>
  <script src="js/controllers/inbox.js"></script>
  <script src="js/controllers/createUser.js"></script>
</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <!--<li class="active"><a href="#">Home</a></li>-->
          <ul class="nav navbar-nav navbar-right">
            <li>
                <form class="navbar-form" role="search">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search" name="q">
                      <div class="input-group-btn">
                      <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                      </div>
                  </div>
                </form>  
            </li>
            <li><a href="#/login">Friends</a></li>
            <li><a href="#/inbox">Messages</a></li>
            <li><a href="#/signUp">Sign Up</a></li>
            <li><a href="../navbar-static-top/">Skills</a></li>
            <li><a href="./">Me <span class="sr-only">(current)</span></a></li>        
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
<div class="page">
  <main class="cf" ng-view></main>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery</script>
    <script src="js/lib/bootstrap.min.js"></script>
</body>
</html>
