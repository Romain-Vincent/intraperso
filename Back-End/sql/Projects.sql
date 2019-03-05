
CREATE SCHEMA IF NOT EXISTS `Projects` DEFAULT CHARACTER SET utf8 ;
USE `Projects` ;

-- -----------------------------------------------------
-- Table `Projects`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Projects`.`Users` ;

CREATE TABLE IF NOT EXISTS `Projects`.`Users` (
  `U_ID` INT,
  `U_Name` VARCHAR(45) ,
  `U_Email` VARCHAR(45),
  `U_Password` VARCHAR(45) ,
  `U_Type` CHAR(1),
  `U_Picture` LONGBLOB, 
  PRIMARY KEY (`U_ID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `S_ID_UNIQUE` ON `Projects`.`Users` (`U_ID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `Projects`.`Projects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Projects`.`Projects` ;

CREATE TABLE IF NOT EXISTS `Projects`.`Projects` (
  `P_ID` INT NOT NULL,
  `P_Name` VARCHAR(45) NOT NULL ,
  `P_Description` LONGTEXT NOT NULL ,
  `P_Created` DATE NOT NULL ,
  `P_Validated` TINYINT NOT NULL, 
  PRIMARY KEY (`P_ID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `P_ID_UNIQUE` ON `Projects`.`Projects` (`P_ID` ASC) VISIBLE;

-- -----------------------------------------------------
-- Table `Projects`.`StudentsOfProject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Projects`.`StudentsOfProject` ;

CREATE TABLE IF NOT EXISTS `Projects`.`StudentsOfProject` (
  `P_ID` INT NOT NULL,
  `U_ID` INT NOT NULL,
  `IsProjectLeader` TINYINT NOT NULL,
  PRIMARY KEY (`P_ID`, `U_ID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `SOP_P_UNIQUE` ON `Projects`.`StudentsOfProject` (`P_ID` ASC) VISIBLE;
CREATE UNIQUE INDEX `SOP_U_UNIQUE` ON `Projects`.`StudentsOfProject` (`U_ID` ASC) VISIBLE;

-- -----------------------------------------------------
-- Table `Projects`.`StatusPoints`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Projects`.`StatusPoints` ;

CREATE TABLE IF NOT EXISTS `Projects`.`StatusPoints` (
  `SP_Date` DATETIME NOT NULL ,
  `SP_Text` LONGTEXT NOT NULL ,
  `Projects_P_ID` INT NOT NULL,
  PRIMARY KEY (`SP_Date`, `Projects_P_ID`))
ENGINE = InnoDB;


