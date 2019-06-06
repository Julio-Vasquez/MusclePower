use musclepower;

DROP PROCEDURE IF EXISTS `Insert_Category`;

DELIMITER $$
CREATE PROCEDURE `Insert_Category`
(
    IN `Category` VARCHAR(150)
)
BEGIN
    IF(LENGTH( `Category` ) BETWEEN 4 AND 150)
    AND ( NOT EXISTS (SELECT `id` FROM `Category` WHERE `name` = `Category`))
    THEN
        INSERT INTO 
            `Category`
            (
                `name`,
                `State`
            )
        VALUES
            (
                `Category`,
                'Activo'
            );
    END IF;
END;
$$
DELIMITER;

DROP PROCEDURE IF EXISTS `Insert_Trademark`;

DELIMITER $$
CREATE PROCEDURE `Insert_Trademark`
(
    
)
BEGIN
END;
$$
DELIMITER;