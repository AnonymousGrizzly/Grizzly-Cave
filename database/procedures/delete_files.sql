DELIMITER //
CREATE PROCEDURE delete_files (
    IN wanted_user INT
)
BEGIN
    DELETE FROM files WHERE user_id = wanted_user;
END //
DELIMITER ;