DELIMITER //
CREATE TRIGGER after_insert_details
AFTER INSERT ON details
FOR EACH ROW
    BEGIN
        DECLARE x int;                   
        DECLARE last_details int;
        SELECT COUNT(details_id) FROM details WHERE user_id = NEW.user_id INTO x;
        SELECT details_id FROM details WHERE user_id = NEW.user_id ORDER BY details_id ASC LIMIT 0, 1 INTO last_details;
        IF x > 5 THEN 
        DELETE FROM details WHERE details_id = last_details;
        END IF;
    END //
DELIMITER ;