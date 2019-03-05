CREATE PROCEDURE `get_status_points`(the_project VARCHAR(255))
BEGIN
	SELECT DATE_FORMAT(SP.SP_Date, '%Y-%m-%d') AS date, SP.SP_Text AS text
	       FROM Projects.StatusPoints SP, Projects.Projects P
	       WHERE SP.SP_P_ID = P.P_ID
	       	     AND P_Name = the_project;	
END
