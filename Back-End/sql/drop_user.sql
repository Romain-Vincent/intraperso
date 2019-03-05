/*
** Stored procedure drop_user: remove a student from a project.
** It return -1 if there is an error and a message or 0 if everythng is fine
*/


CREATE PROCEDURE `drop_user`(project varchar(255), email varchar(255))
proc_label:BEGIN
	DECLARE _data VARCHAR(255) DEFAULT NULL;
	DECLARE _p_id INT DEFAULT NULL;
	DECLARE _u_id INT DEFAULT NULL;
	DECLARE _exist_u_id INT DEFAULT NULL;
	DECLARE _is_leader BOOLEAN DEFAULT NULL;

	/* check if the project exists*/
	SELECT P_Name, P_ID INTO _data, _p_id FROM Projects.Projects	WHERE P_Name = project;

	IF isnull(_data)
	THEN
	    SELECT -1 AS Res, CONCAT (project, " does not exist!") AS Msg;
	    LEAVE proc_label;
	ELSE
	    /* check the email of the user */
	    SELECT U_Name, U_ID INTO _data, _u_id FROM Projects.Users WHERE U_Email = email;

	    IF isnull(_u_id)
	    THEN
		SELECT -1 AS Res, CONCAT ("Unknown user ", email) AS Msg;
		LEAVE proc_label;
	    ELSE
		/* Check if the user is not already part of that project */
		SELECT U_ID, IsProjectLeader INTO _exist_u_id, _is_leader
		       FROM Projects. StudentsOfProject
		       WHERE U_ID = _u_id;

		/* Check if the student is a member of the project */
		IF isnull(_exist_u_id)
		THEN
			SELECT -1 AS Res, CONCAT(" User: ", email, " is not a member of ",
			       	     	  	   project, "!") AS Msg;
			LEAVE proc_label;
		ELSE
			/* check that the student is not the leader of the project */
			IF _is_leader = TRUE
			THEN
				SELECT -1 AS Res, CONCAT(" User: ", email, " is the leader of ",
			       	     	  	   project, "!") AS Msg;
				LEAVE proc_label;
			ELSE
				/* all checks done, insert the new user in the project */

				DELETE FROM Projects.StudentsOfProject
			       	       WHERE P_ID = _p_id AND
			       	       U_ID = _u_id;
				     
				SELECT 0 AS Res, CONCAT ("User: ", email, " deleted from ",
				       	    	 	project, "!") AS Msg;
			END IF;
		END IF;
	    END IF;
	END IF;    
END;
