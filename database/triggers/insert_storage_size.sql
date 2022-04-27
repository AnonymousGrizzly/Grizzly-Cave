DELIMITER //
CREATE TRIGGER storage_size_check
BEFORE INSERT ON files
FOR EACH ROW
    BEGIN
        DECLARE storage_size bigint;
        SELECT SUM(filesize) INTO storage_size FROM files WHERE user_id = NEW.user_id;
        IF (storage_size + NEW.filesize)  > 100000000 THEN
        SIGNAL SQLSTATE '02' SET MESSAGE_TEXT = 'Storage space used up.';
        END IF;
    END //
DELIMITER ;

