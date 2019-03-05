/*
** Stored procedure: add_status_point: add a status point on a project
** It return -1 if there is an error and a message or 0 if everythng is fine
*/

CREATE PROCEDURE `add_status_point`(the_name VARCHAR(255), the_date DATE, the_desc longtext)
proc_label:BEGIN
	DECLARE _p_id INT DEFAULT NULL;
	DECLARE _date DATE DEFAULT NULL;

	/* Check if the specified project exists */
	SELECT P_ID INTO _p_id FROM Projects.Projects WHERE P_Name = the_name;

	IF isnull(_p_id)
	THEN
		/* test if the project does not exist */
		SELECT -1 AS Res, CONCAT("Project: ", the_name, " does not exist") AS Msg;
		LEAVE proc_label;
	END IF;

	/* test that there is not already a status point at that date */
	IF EXISTS (SELECT SP_Date FROM Projects.StatusPoints WHERE SP_P_ID = _p_id AND SP_Date = the_date)
	THEN
		SELECT -1 AS Res, CONCAT("There is already a Status Check for ", the_name, " on that date!") AS Msg;
		LEAVE proc_label;
	END IF;

	/* everything is fine - let's insert the new status point in the table */
	INSERT INTO Projects.StatusPoints VALUES (_p_id, the_date, the_desc);

	SELECT 0 AS Res, "New Status Point successfully inserted" AS Msg;
END
