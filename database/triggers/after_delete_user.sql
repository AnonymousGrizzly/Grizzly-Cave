DELIMITER //
CREATE TRIGGER after_delete_user
AFTER DELETE ON users
FOR EACH ROW
    BEGIN
        CALL delete_files(OLD.user_id);
        CALL delete_folders(OLD.user_id);
    END //
DELIMITER ;