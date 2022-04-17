DELIMITER //
CREATE PROCEDURE delete_packets (
    IN wanted_user INT
)
BEGIN
    DELETE FROM packets WHERE receiver_id = wanted_user;
    DELETE FROM packets WHERE sender_id = wanted_user;
END //
DELIMITER ;