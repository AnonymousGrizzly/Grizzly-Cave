DELIMITER //
CREATE PROCEDURE logout_procedure (
    IN insert_time INT,
    IN insert_user INT, 
    IN insert_storage INT,
    IN insert_num_of_files INT
)
BEGIN
    INSERT INTO `details` (`details_id`, `overall_time`, `last_time`, `storage_size`, `num_of_files`, `user_id`) 
    VALUES (NULL, insert_time, current_timestamp(), insert_storage, insert_num_of_files, insert_user);
END //
DELIMITER ;