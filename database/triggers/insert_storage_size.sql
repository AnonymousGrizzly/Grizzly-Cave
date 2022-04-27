DELIMITER //
CREATE TRIGGER storage_size_check
BEFORE INSERT ON files
FOR EACH ROW
    BEGIN
        DECLARE storage_size bigint;
        SELECT storage_size FROM details WHERE user_id = NEW.user_id ORDER BY details_id DESC LIMIT 0, 1 INTO storage_size;
        IF (storage_size - NEW.filesize)  <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Storage space used up.';
        END IF;
    END //
DELIMITER ;

