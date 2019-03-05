/*
** Stored procedure: is_valid_project: add a status point on a projecta new project to the project list
** It return -1 if there is an error and a message or 0 if everythng is fine
*/

CREATE PROCEDURE `is_valid_project`(project varchar(255),
	  			     leader varchar(255),
				     users varchar(255),
				     description longtext)
proc_label:BEGIN
	DECLARE _data VARCHAR(255) DEFAULT NULL;
	DECLARE _temp varchar(255) DEFAULT NULL;
	DECLARE _str varchar(255) DEFAULT NULL;
	DECLARE _index INT DEFAULT 0;
	DECLARE _u_id INT DEFAULT NULL;
	DECLARE _id INT DEFAULT NULL;
	DECLARE _temp_id INT DEFAULT NULL;
	DECLARE _uname VARCHAR(255) DEFAULT NULL;

	/* check is the project doesn't exist */
	SELECT P_Name INTO _data FROM Projects.Projects	WHERE P_Name = project;

	IF NOT(isnull(_data))
	THEN
	    SELECT -1 AS Res, CONCAT ("The project:", project, " already exists!") AS Msg;
	    LEAVE proc_label;
	ELSE
	    /* check the email of the leader in the Users table*/
	    SELECT U_Name, U_ID INTO _data, _u_id FROM Projects.Users WHERE U_Email = leader;

	    IF isnull(_data)
	    THEN
		SELECT -1 AS Res, CONCAT ("Unknown user ", leader) AS Msg;
		LEAVE proc_label;
	    ELSE
		/* Transaction - all inserts done or none of them */
		START TRANSACTION;

		SELECT MAX(P_ID)+1 INTO _id FROM Projects.Projects;

		/* 
		insert the project in the Projects table 
		and the leader in the students of this new project 
		*/
		INSERT INTO Projects.Projects VALUES(_id, project, description, curdate(), FALSE);
		INSERT INTO Projects.StudentsOfProject VALUES(_id, _u_id, TRUE);

		/* loop the users list and check if each of them is known */
		IF users != " " /* if the list of users is empty - 1 space - then done  - the project has only 1 student*/
		THEN
    		    SET _temp = users;
		    WHILE NOT(isnull(_temp))
		    DO
			/* read the list of emails (separated by ;) en check the existence of each user */
		       SET _index = LOCATE(';', _temp);
       		       IF _index = 0
       		       THEN
			    SET _str = TRIM(_temp);
         	   	    SET _temp = NULL;
       		       ELSE
			    SET _str = TRIM(substring(_temp, 1,_index -1));
         	     	    SET _temp = substring(_temp, _index + 1);
       		       END IF;

		       /* check each user in the Users table */
		       SELECT U_Name, U_ID INTO _uname, _u_id FROM Projects.Users WHERE U_Email = _str;

		       IF isnull(_uname)
		       THEN
		           /* one user is not registered - Cancel all the inserts */
		           ROLLBACK;
		           SELECT -1 AS Res, CONCAT ("User: ", _str, "does not exist!") AS Msg;
		           LEAVE proc_label;
		       END IF;

		       /* check if the student is not already part of the project */
		       SELECT U_ID INTO _temp_id FROM Projects.StudentsOfProject
		   	      WHERE P_ID = _id AND U_ID = _u_id;
		       IF NOT isnull(_temp_id)
		       THEN
		       /* Cancel all the inserts */
		           ROLLBACK;
		           SELECT -1 AS Res, CONCAT ("User: ", _str, " twice in project ", project, "!") AS Msg;
		           LEAVE proc_label;
		       END IF;

		       /* Insert each student in the students of the project */
		       INSERT INTO Projects.StudentsOfProject VALUES (_id, _u_id, FALSE);
		    END WHILE;
	        END IF;
	    END IF;
	END IF;
	
	/* validate all the inserts*/
	COMMIT;
	SELECT 0 AS Res, CONCAT("New project '", project, "' created.") AS Msg; 
END;
