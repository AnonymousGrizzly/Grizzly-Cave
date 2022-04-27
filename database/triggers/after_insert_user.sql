DELIMITER $$
CREATE TRIGGER after_create_user
AFTER INSERT ON users BEGIN
    INSERT INTO details(overall_time, user_id, num_of_files) 
    VALUES(0, NEW.user_id, 0);
END $$
DELIMITER ;