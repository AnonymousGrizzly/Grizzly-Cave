DELIMITER //
CREATE PROCEDURE logout_procedure (
    IN insert_time TIME,
    IN insert_user INT, 
    IN insert_storage BIGINT
)
BEGIN
    INSERT INTO details(overall_time, storage_size, user_id) VALUES(insert_time, insert_storage, insert_user);
END //
DELIMITER ;