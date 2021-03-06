/*
** Stored procedure: add_user - add a student to an existing project
** It return -1 if there is an error and a message or 0 if everythng is fine
*/

CREATE PROCEDURE `add_user`(project varchar(255), email varchar(255))
proc_label:BEGIN
	DECLARE _data VARCHAR(255) DEFAULT NULL;
	DECLARE _p_id INT DEFAULT NULL;
	DECLARE _u_id INT DEFAULT NULL;
	DECLARE _exist_u_id INT DEFAULT NULL;

	/* check if the project exists */
	SELECT P_Name, P_ID INTO _data, _p_id FROM Projects.Projects	WHERE P_Name = project;

	IF isnull(_data)
	THEN
	    SELECT -1 AS Res, CONCAT (project, " does not exist!") AS Msg;
	    LEAVE proc_label;
	ELSE
	    /* check if the email of the student exists in the Users table */
	    SELECT U_Name, U_ID INTO _data, _u_id FROM Projects.Users WHERE U_Email = email;

	    IF isnull(_u_id)
	    THEN
		SELECT -1 AS Res, CONCAT ("Unknown user ", email) AS Msg;
		LEAVE proc_label;
	    ELSE
		/* Check if the user is not already part of that project */
		SELECT U_ID INTO _exist_u_id FROM Projects. StudentsOfProject
		       WHERE U_ID = _u_id;

		IF NOT(isnull(_exist_u_id))
		THEN
			SELECT -1 AS Res, CONCAT(" User: ", email, " is already a member of ",
			       	     	  	   project, "!") AS Msg;
		ELSE
			/* all checks done, insert the new user in the project */
			INSERT Projects.StudentsOfProject VALUES (_p_id, _u_id, false);
			SELECT 0 AS Res, CONCAT ("User: ", email, " added to ", project, "!") AS Msg;
		END IF;
	    END IF;
	END IF;    
END;
