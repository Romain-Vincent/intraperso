// Express initialisation
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

// MySQL initialisation and connection to the Projects database
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'nodejsuser',
    password: '',
    database: 'Projects',
    timezone: 'utc+0'
})
 
// Log any errors when connecting to the db
con.connect(function(err){
    if (err) throw err;
    console.log('Connected to the Projects database');
})

// Entry point to check the credentials of the user
app.get('/testuser/:name/:passwd', function (req, res) {
    console.log("\n==> /testuser called for name = '"
		+ req.params.name
		+ "' and password = '"
		+  req.params.passwd
		+ "'");

    /* call the stored procedure to check the existence of the user */
    var cmd = "CALL is_valid_user('" + req.params.name + "', '"
    cmd = cmd + req.params.passwd + "');";

    /* then send back the results to the front */
    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;

	var fresult = rows[ 0 ];
	var ffresult = fresult[ 0 ];
	console.log("rows[0] JSON = " + JSON.stringify(ffresult));
	res.send(JSON.stringify(ffresult));
    })  
})

// Entry point to get the list of the projects
app.get('/getprojects', function (req, res) {
    console.log("\n==> /getprojects");

    /* Get the projects list */
    var cmd = "SELECT P_Name,P_Validated from Projects.Projects";
    
    /* then send back the results to the front */
    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;

	console.log(rows);
	res.send(JSON.stringify(rows));
    })  
})

// Entry point to get the list of the projects beginning with a specific letter
app.get('/getprojects/:letter', function (req, res) {
    console.log("\n==> /getprojects/" + req.params.letter);

    // select the projects
    var cmd = "SELECT P_Name, P_Validated from Projects.Projects";
    cmd = cmd + " WHERE P_Name LIKE '" + req.params.letter + "%'";

    console.log("cmd = " +cmd);

    // send the results back to the front
    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;

	console.log(rows);
	res.send(JSON.stringify(rows));
    })  
})

// Entry point to get the details of one project
app.get('/getprojectdetails/:pname', function (req, res) {
    console.log("\n==> /getprojectdetails/" + req.params.pname);

    // get the description of the specified project
    var cmd = "SELECT P_Description from Projects.Projects"
	+" WHERE P_Name = '" + req.params.pname + "';";

    // and send it back to the front
    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;

	console.log(rows);
	res.send(JSON.stringify(rows));
    })  
})

// Entry point to get the students  of one project
app.get('/getprojectstudents/:pname/:option', function (req, res) {
    console.log("\n==> /getprojectstudents/"
		+ req.params.pname + "/"
		+ req.params.option);

    // get informations on the project - either emails, names or pictures (in the future).
    var cmd = "SELECT ";

    // build the SQL command
    if (req.params.option == "names"){
	cmd = cmd + " U_Name ";
    } else {
	if (req.params.option == "pictures") {
	    cmd = cmd + " U_Picture ";
	} else {
	    cmd = cmd + " U_Email ";
	}
    }
    
    cmd = cmd + "FROM Projects.Projects P, Projects.Users U, Projects.StudentsOfProject S"
	+ " WHERE P.P_Name = '" + req.params.pname + "'"
	+ " AND P.P_ID = S.P_ID "
	+ " AND S.U_ID = U.U_ID;"

    console.log("cmd = " + cmd);

    // execute the command and send the results back to the front
    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;

	console.log(rows);
	res.send(JSON.stringify(rows));
    })  
})

// Entry point to check the existence of a project
app.get('/projectexists/:pname', function (req, res) {
    console.log("\n==> /projectexist/" + req.params.pname);

    // build the SQL command
    var cmd = "SELECT P_Name from Projects.Projects"
	+" WHERE P_Name = '" + req.params.pname + "';";

    // execute the command and send the results back to the front
    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;

	console.log(rows);
	res.send(JSON.stringify(rows));
    })  
})

// Entry point for new project
app.get('/newproject/:pname/:leader/:users/:desc', function (req, res) {
    console.log("\n==> /newproject/" + req.params.pname
		+ "/" + req.params.leader
		+ "/" + req.params.users
		+ "/" + req.params.desc);

    // build the SQL command
    var cmd = "CALL is_valid_project('" + req.params.pname
	+ "', '" + req.params.leader
	+ "', '" + req.params.users
	+ "', '" + req.params.desc + "');";

    // execute and send the results back to the front
    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;

	var fresult = rows[ 0 ];
	var ffresult = fresult[ 0 ];
	console.log("rows[0] JSON = " + JSON.stringify(ffresult));
	res.send(JSON.stringify(ffresult));
    })  
})

// Entry point for updating a project
app.get('/updateproject/:pname/:what/:data', function (req, res) {
    console.log("\n==> /updateproject/" + req.params.pname
		+ "/" + req.params.what
		+ "/" + req.params.data);
    
    var cmd = "UPDATE Projects.Projects ";

    if(req.params.what == 'V') {
	cmd = cmd + "SET P_Validated = " + req.params.data + " ";
    }

    cmd = cmd + "WHERE P_Name = '" + req.params.pname + "'";
    
    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;

	console.log(rows);
	res.send(JSON.stringify(rows));
    })  
})


// Entry point to get all the status points for 1 project
app.get('/getstatuspoints/:pname', function (req, res) {
    console.log("\n==> getstatuspoints/" + req.params.pname);

    // get all the status points for a specific project
    var cmd = "CALL get_status_points ('" + req.params.pname + "');";

    console.log("cmd = " + cmd);

    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;
	
	console.log(rows);
	res.send(JSON.stringify(rows));
    })
})

//Entry point to insert a new status point for a project

app.get('/addstatuspoint/:pname/:date/:description', function (req, res) {
    console.log("\n==> /addstatuspoint" + req.params.pname
		+ "/" + req.params.date
		+ "/" + req.params.description);
    
    var cmd = "CALL add_status_point('"
	+ req.params.pname + "', '"
	+ req.params.date + "', '"
	+ req.params.description + "');";

    console.log("cmd = " + cmd);


    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;
	
	console.log(rows);
	res.send(JSON.stringify(rows));
    })
})

//Entry point to add a user to a project
app.get('/adduser/:pname/:user', function (req, res) {
    console.log("\n==> /adduser/" + req.params.pname
		+ "/" + req.params.user);
    
    var cmd = "CALL add_user('"
	+ req.params.pname + "', '"
	+ req.params.user + "');";

    console.log("cmd = " + cmd);


    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;
	
	var fresult = rows[ 0 ];
	var ffresult = fresult[ 0 ];
	console.log("rows[0] JSON = " + JSON.stringify(ffresult));
	res.send(JSON.stringify(ffresult));
    })
})

//Entry point to remove a user from a project
app.get('/dropuser/:pname/:user', function (req, res) {
    console.log("\n==> /dropuser/" + req.params.pname
		+ "/" + req.params.user);
    
    var cmd = "CALL drop_user('"
	+ req.params.pname + "', '"
	+ req.params.user + "');";

    console.log("cmd = " + cmd);


    con.query(cmd + "\n", function (err, rows, fields) {
	if (err) throw err;
	
	var fresult = rows[ 0 ];
	var ffresult = fresult[ 0 ];
	console.log("rows[0] JSON = " + JSON.stringify(ffresult));
	res.send(JSON.stringify(ffresult));
    })
})

app.listen(port, function(req, res) {
    console.log(`Example app listening on port ${port}!`);
})


