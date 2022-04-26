DELIMITER //
CREATE PROCEDURE logout_procedure (
    IN insert_time TIME,
    IN insert_user INT, 
    IN insert_storage INT,
    IN insert_num_of_files INT
)
BEGIN
    INSERT INTO details(overall_time, storage_size, user_id, num_of_files) VALUES(insert_time, insert_storage, insert_user, num_of_files);
END //
DELIMITER ;