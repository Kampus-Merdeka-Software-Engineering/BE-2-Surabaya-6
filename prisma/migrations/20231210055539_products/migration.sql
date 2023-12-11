-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `place` VARCHAR(100) NOT NULL,
    `detail` VARCHAR(400) NOT NULL,
    `price` VARCHAR(100) NOT NULL,
    `image1` VARCHAR(50) NOT NULL,
    `image2` VARCHAR(50) NOT NULL,
    `image3` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `email` TO `Users_email_key`;
