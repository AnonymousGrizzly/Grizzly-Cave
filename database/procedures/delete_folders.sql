DELIMITER //
CREATE PROCEDURE delete_files (
    IN wanted_user INT
)
BEGIN
    DELETE FROM folders WHERE user_id = wanted_user;
END //
DELIMITER ;