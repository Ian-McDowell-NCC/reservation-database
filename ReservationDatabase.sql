IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'database_name')
BEGIN
  CREATE DATABASE ReservationDatabase;
END;
GO

USE ReservationDatabase;

DROP TABLE IF EXISTS SystemUser;
DROP TABLE IF EXISTS RestaurantTable;
DROP TABLE IF EXISTS WaitStaff;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Restaurant;


CREATE TABLE SystemUser (
 UserID INT,
 UserFirstName VARCHAR(15),
 UserLastName VARCHAR(15),
 UserPhone VARCHAR(20),
 UserEmail VARCHAR(50),
 UserRole CHAR(3),
 PRIMARY KEY (UserID)
 );

 CREATE TABLE Restaurant(
 RestaurantID INT,
 RestaurantName VARCHAR(50) NOT NULL,
 RestaurantAddress VARCHAR(50) NOT NULL,
 SeatingCapacity INT NOT NULL,
 FloorPlan VARBINARY(max),
 Menu VARBINARY(max),
 PRIMARY KEY (RestaurantID)
 );

 CREATE TABLE Reservation (
 ReservationID INT,
 ResDate DATE NOT NULL, 
 ResTime TIME NOT NULL,
 PartySize INT NOT NULL,
 PartyName VARCHAR(30) NOT NULL,
 ResPhone VARCHAR(20),
 ResEmail VARCHAR(30),
 OptIns BIT NOT NULL,
 ResStatus CHAR(10) DEFAULT 'IN FUTURE' NOT NULL,
 DateCreated SMALLDATETIME NOT NULL,
 Comments VARCHAR(max),
 RestaurantAt INT,
 AssignedToTable INT DEFAULT NULL,
 PRIMARY KEY (ReservationID),
 FOREIGN KEY (RestaurantAt) REFERENCES Restaurant (RestaurantID)
 );

 CREATE TABLE RestaurantTable(
 TableNumber INT,
 RestaurantID INT NOT NULL,
 NumOfSeats INT NOT NULL,
 TableType CHAR(3) NOT NULL,
 TableSection INT,
 PRIMARY KEY (TableNumber, RestaurantID),
 FOREIGN KEY (RestaurantID) REFERENCES Restaurant (RestaurantID)
 );

 CREATE TABLE WaitStaff(
 WaiterID INT,
 WaiterFirstName VARCHAR(15),
 WaiterLastName VARCHAR(15),
 WaiterSection INT,
 WorksAt INT,
 PRIMARY KEY (WaiterID),
 FOREIGN KEY (WorksAt) REFERENCES Restaurant (RestaurantID)
 );

 /* SystemUser (UserID INT, UserFirstName VARCHAR(15), UserLastName VARCHAR(15), UserPhone VARCHAR(20), UserEmail VARCHAR(50), UserRole CHAR(3)) */
 INSERT INTO SystemUser VALUES
 (115102704, 'Ian', 'McDowell', '+1 (484)-983-1943', 'ian.mcdowell@gmail.gmail', 'EMP');
  INSERT INTO SystemUser VALUES
 (101121232, 'Rodolfo', 'Eduardo', NULL, 'raymond.castro@student.northampton.edu', 'MGR');
  INSERT INTO SystemUser VALUES
 (127498344, NULL, NULL, NULL, NULL, 'GST');
  INSERT INTO SystemUser VALUES
 (364748384, 'Sapphire', NULL, '+1 (484)-123-4567', NULL, 'EMP');
  INSERT INTO SystemUser VALUES
 (120938743, NULL, 'Graver', '+1 (484)-987-1234', 'bg@email.org', 'EMP');
  INSERT INTO SystemUser VALUES
 (987123654, 'Kieran', 'Culkin', NULL, 'KieranCulkin@hollywood.edu', 'MGR');
  INSERT INTO SystemUser VALUES
 (123948173, NULL, NULL, NULL, NULL, 'GST');

 /* Restaurant (RestaurantID INT, RestaurantName VARCHAR(50) NN, RestaurantAddress VARCHAR(50) NN, SeatingCapacity INT NN, FloorPlan VARBINARY(max), Menu VARBINARY(max)) */
INSERT INTO Restaurant VALUES
(110293012, 'Team Green''s Greens Bethlehem', '3835 Green Pond Road, Bethlehem PA, 18020', 20, NULL, NULL);
INSERT INTO Restaurant VALUES
(102030405, 'Team Green''s Greens Poconos', '2411 Rt 715, Tannersville, PA 18372', 16, NULL, NULL);

 /* Reservation (ReservationID INT, ResDate DATE NN,  ResTime TIME NN, PartySize INT NN, PartyName VARCHAR(30) NN, ResPhone VARCHAR(20), ResEmail VARCHAR(30), OptIns BIT NN, ResStatus CHAR(10) NN, DateCreated SMALLDATETIME NN, Comments VARCHAR(max), RestaurantAt INT, AssignedToTable INT DEFAULT NULL) */
 INSERT INTO Reservation VALUES
 (324293838, '2026-03-29', '13:30:00', 2, 'Martha M', '+1 (727)-382-9823', 'MarthaMango@gmail.com', 0, 'IN FUTURE', '2026-03-24 21:38:43', NULL, 110293012, NULL);
  INSERT INTO Reservation VALUES
 (192334532, '2026-04-05', '16:00:00', 8, 'Angel Verdugo', NULL, NULL, 0, 'IN FUTURE', '2026-02-24 11:20:03', NULL, 110293012, NULL);
  INSERT INTO Reservation VALUES
 (132034111, '2026-04-05', '15:15:00', 4, 'LAURIE', NULL, 'laurieshotmail@hotmail.com', 1, 'IN FUTURE', '2026-03-20 20:08:14', 'Booth please', 102030405, NULL);
  INSERT INTO Reservation VALUES
 (129486949, '2026-04-04', '19:45:00', 2, 'Harold Corvin', '+1 (610)-332-2332', 'hcorvthemorv@gmail.com', 1, 'IN FUTURE', '2026-03-04 14:13:42', 'Need an allergen menu - Allergic to seafood', 102030405, NULL);
  INSERT INTO Reservation VALUES
 (102938465, '2026-03-20', '19:30:00', 2, 'Ramirez', '+1 (610)-610-6100', NULL, 1, 'FINISHED', '2026-02-24 12:08:34', NULL, 110293012, NULL);
  INSERT INTO Reservation VALUES
 (374583749, '2026-03-25', '17:00:00', 3, 'Bryson Stott', NULL, NULL, 0, 'WAITING', '2026-03-24 21:48:23', '32nd Birthday and 3rd Anniversary', 102030405, NULL);
  INSERT INTO Reservation VALUES
 (102938457, '2026-03-25', '13:30:00', 5, 'Martha M', NULL, NULL, 0, 'SEATED', '2026-03-01 08:59:01', NULL, 102030405, NULL);

/* RestaurantTable (TableNumber INT, RestaurantID INT NN, NumOfSeats INT NN, TableType CHAR(3) NN, TableSection INT) */
INSERT INTO RestaurantTable VALUES
(1, 110293012, 8, 'BTH', 1);
INSERT INTO RestaurantTable VALUES
(2, 110293012, 2, 'BTH', 1);
INSERT INTO RestaurantTable VALUES
(3, 110293012, 4, 'TBL', 2);
INSERT INTO RestaurantTable VALUES
(4, 110293012, 4, 'TBL', 2);
INSERT INTO RestaurantTable VALUES
(5, 110293012, 2, 'BTH', 2);
INSERT INTO RestaurantTable VALUES
(1, 102030405, 4, 'BTH', 1);
INSERT INTO RestaurantTable VALUES
(2, 102030405, 4, 'TBL', 1);
INSERT INTO RestaurantTable VALUES
(3, 102030405, 4, 'BTH', 2);
INSERT INTO RestaurantTable VALUES
(4, 102030405, 4, 'TBL', 2);

/* WaitStaff (WaiterID INT, WaiterFirstName VARCHAR(15), WaiterLastName VARCHAR(15), WaiterSection INT, WorksAt INT) */
INSERT INTO WaitStaff VALUES
(102114783, 'Ian', 'McDowell', 2, 110293012);
INSERT INTO WaitStaff VALUES
(103493824, 'Yari', 'Perez', 1, 110293012);
INSERT INTO WaitStaff VALUES
(119283920, 'Brandon', 'Graver', 1, 102030405);
INSERT INTO WaitStaff VALUES
(183274928, 'Kuri', 'Edwards', 2, 102030405);
INSERT INTO WaitStaff VALUES
(123567890, 'Luke', 'Merlino', NULL, 102030405);
INSERT INTO WaitStaff VALUES
(147898654, 'Persephone', 'Harshbarger', NULL, 110293012);

/*----------------QUERIES-------------------
Everything beginning with @ is an example/placeholder variable
*/

-- Assign table to reservation
DECLARE @UpdateReservationID INT = 192334532
DECLARE @UpdateReservationTable INT = 1 
UPDATE Reservation
SET AssignedToTable = @UpdateReservationTable
WHERE ReservationID = @UpdateReservationID

-- Update status for reservation
DECLARE @UpdateReservationStatusID INT = 192334532
DECLARE @UpdateReservationStatus CHAR(10) = 'WAITING'
UPDATE Reservation
SET ResStatus = @UpdateReservationStatus
WHERE ReservationID = @UpdateReservationStatusID

-- View reservations for a specific date
DECLARE @SearchDate DATE = GETDATE()
SELECT *
FROM Reservation
WHERE ResDate = @SearchDate
ORDER BY ResTime

-- View all reservations that are not finished
SELECT *
FROM Reservation
WHERE ResStatus != 'FINISHED'

-- View reservation by ID
DECLARE @SearchResID INT = 324293838 
SELECT *
FROM Reservation
WHERE ReservationID = @SearchResID

-- Find table details for reservation
DECLARE @SearchReservationID INT = 192334532
DECLARE @SearchReservationTable INT
DECLARE @SearchReservationRestaurant INT 
SELECT @SearchReservationRestaurant = RestaurantAt, @SearchReservationTable = AssignedToTable
FROM Reservation
WHERE ReservationID = 192334532
SELECT * 
FROM RestaurantTable
WHERE RestaurantID = @SearchReservationRestaurant AND TableNumber = @SearchReservationTable