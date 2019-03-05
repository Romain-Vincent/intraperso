/*
** Stored procedure: is_valid_user: Check the existence of a user when trying to login
** It return -1 if there is an error and a message or 0 if everythng is fine
*/
CREATE PROCEDURE `is_valid_user`(username varchar(255), passwd varchar(255))
BEGIN

	DECLARE _user VARCHAR(255) DEFAULT NULL;
	DECLARE	_passwd VARCHAR(255) DEFAULT NULL;

	/* Get the details of the user - if it exists */
	SELECT U_Name, U_Password
	INTO _user, _passwd
	FROM Projects.Users
	WHERE U_Email = username;
    
	IF isnull(_user)
	THEN
		SELECT -1 AS Res, "Unknown user" AS Msg;
	ELSE
		/* the user exists, check the proposed password */
		IF _passwd != passwd
        	THEN
			SELECT -1 AS Res, "Invalid password" AS Msg;
		ELSE 
			SELECT 0 AS Res, "Validated credentials" AS Msg;
		END IF;
	END IF;
END
