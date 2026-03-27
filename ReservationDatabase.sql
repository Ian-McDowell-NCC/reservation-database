IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'database_name')
BEGIN
  CREATE DATABASE ReservationDatabase;
END;
GO

-- Create a SQL Server login
CREATE LOGIN ian WITH PASSWORD = 'securepassword';

USE ReservationDatabase;
GO

-- Create a user in the BookStore database
CREATE USER ian FOR LOGIN ian;
GO

-- Grant the user db_owner role for full permissions on the BookStore database
ALTER ROLE db_owner ADD MEMBER ian;
GO

DROP TABLE IF EXISTS SystemUser;
DROP TABLE IF EXISTS RestaurantTable;
DROP TABLE IF EXISTS WaitStaff;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Restaurant;


CREATE TABLE SystemUser (
 UserID int,
 UserFirstName varchar(15),
 UserLastName varchar(15),
 UserPhone varchar(20),
 UserEmail varchar(50),
 UserRole char(3),
 PRIMARY KEY (UserID)
 );

 CREATE TABLE Restaurant(
 RestaurantID int,
 RestaurantName varchar(50) NOT NULL,
 RestaurantAddress varchar(50) NOT NULL,
 SeatingCapacity int NOT NULL,
 FloorPlan varbinary(max),
 Menu varbinary(max),
 PRIMARY KEY (RestaurantID)
 );

 CREATE TABLE Reservation (
 ReservationID int,
 ResDate date NOT NULL, 
 ResTime time NOT NULL,
 PartySize int NOT NULL,
 PartyName varchar(30) NOT NULL,
 ResPhone varchar(20),
 ResEmail varchar(30),
 OptIns bit NOT NULL,
 ResStatus char(10) DEFAULT 'IN FUTURE' NOT NULL,
 DateCreated smalldatetime NOT NULL,
 Comments varchar(max),
 RestaurantAt int,
 AssignedToTable int DEFAULT NULL,
 PRIMARY KEY (ReservationID),
 FOREIGN KEY (RestaurantAt) REFERENCES Restaurant (RestaurantID)
 );

 CREATE TABLE RestaurantTable(
 TableNumber int,
 RestaurantID int NOT NULL,
 NumOfSeats int NOT NULL,
 TableType char(3) NOT NULL,
 TableSection int,
 PRIMARY KEY (TableNumber, RestaurantID),
 FOREIGN KEY (RestaurantID) REFERENCES Restaurant (RestaurantID)
 );

 CREATE TABLE WaitStaff(
 WaiterID int,
 WaiterFirstName varchar(15),
 WaiterLastName varchar(15),
 WaiterSection int,
 WorksAt int,
 PRIMARY KEY (WaiterID),
 FOREIGN KEY (WorksAt) REFERENCES Restaurant (RestaurantID)
 );

 /* SystemUser (UserID int, UserFirstName varchar(15), UserLastName varchar(15),UserPhone varchar(20), UserEmail varchar(50), UserRole char(3)) */
 insert into SystemUser values
 (115102704, 'Ian', 'McDowell', '+1 (484)-983-1943', 'ian.mcdowell@student.northampton.edu', 'EMP');
  insert into SystemUser values
 (101121232, 'Raymond', 'Castro', NULL, 'raymond.castro@student.northampton.edu', 'MGR');
  insert into SystemUser values
 (127498344, NULL, NULL, NULL, NULL, 'GST');
  insert into SystemUser values
 (364748384, 'Crimson', NULL, '+1 (484)-123-4567', NULL, 'EMP');
  insert into SystemUser values
 (120938743, NULL, 'Graver', '+1 (484)-987-1234', 'brandon.graver@student.northampton.edu', 'EMP');
  insert into SystemUser values
 (987123654, 'Kiran', 'Mistry', NULL, 'kmistry@northampton.edu', 'MGR');
  insert into SystemUser values
 (123948173, NULL, NULL, NULL, NULL, 'GST');

 /* Restaurant (RestaurantID int, RestaurantName varchar(50) NN, RestaurantAddress varchar(50) NN, SeatingCapacity int NN, FloorPlan varbinary(max), Menu varbinary(max)) */
insert into Restaurant values
(110293012, 'Team Green''s Greens Bethlehem', '3835 Green Pond Road, Bethlehem PA, 18020', 20, NULL, NULL);
insert into Restaurant values
(102030405, 'Team Green''s Greens Poconos', '2411 Rt 715, Tannersville, PA 18372', 16, NULL, NULL);

 /*Reservation (ReservationID int, ResDate date NN,  ResTime time NN, PartySize int NN, PartyName varchar(30) NN, ResPhone varchar(20), ResEmail varchar(30), OptIns bit NN, ResStatus char(10) NN, DateCreated smalldatetime NN, Comments text, RestaurantAt int, AssignedToTable int DEFAULT NULL)*/
 insert into Reservation values
 (324293838, '2026-03-29', '13:30:00', 2, 'Martha M', '+1 (717)-382-9823', 'MarthaMango@gmail.com', 0, 'IN FUTURE', '2026-03-24 21:38:43', NULL, 110293012, NULL);
  insert into Reservation values
 (192334532, '2026-04-05', '16:00:00', 8, 'Angel Villalona', NULL, NULL, 0, 'IN FUTURE', '2026-02-24 11:20:03', NULL, 110293012, NULL);
  insert into Reservation values
 (132034111, '2026-04-05', '15:15:00', 4, 'LAURIE', NULL, 'laurieshotmail@hotmail.com', 1, 'IN FUTURE', '2026-03-20 20:08:14', 'Booth please', 102030405, NULL);
  insert into Reservation values
 (129486949, '2026-04-04', '19:45:00', 2, 'Harold Corvin', '+1 (610)-332-2332', 'hcorvthemorv@gmail.com', 1, 'IN FUTURE', '2026-03-04 14:13:42', 'Need an allergen menu - Allergic to seafood', 102030405, NULL);
  insert into Reservation values
 (102938465, '2026-03-20', '19:30:00', 2, 'Ramirez', '+1 (610)-610-6100', NULL, 1, 'FINISHED', '2026-02-24 12:08:34', NULL, 110293012, NULL);
  insert into Reservation values
 (374583749, '2026-03-25', '17:00:00', 3, 'Bryson Stott', NULL, NULL, 0, 'WAITING', '2026-03-24 21:48:23', '32nd Birthday and 3rd Anniversary', 102030405, NULL);
  insert into Reservation values
 (102938457, '2026-03-25', '13:30:00', 5, 'Martha M', NULL, NULL, 0, 'SEATED', '2026-03-01 08:59:01', NULL, 102030405, NULL);

/* RestaurantTable (TableNumber int, RestaurantID int NN, NumOfSeats int NN, TableType char(3) NN, TableSection int) */
insert into RestaurantTable values
(1, 110293012, 8, 'BTH', 1);
insert into RestaurantTable values
(2, 110293012, 2, 'BTH', 1);
insert into RestaurantTable values
(3, 110293012, 4, 'TBL', 2);
insert into RestaurantTable values
(4, 110293012, 4, 'TBL', 2);
insert into RestaurantTable values
(5, 110293012, 2, 'BTH', 2);
insert into RestaurantTable values
(1, 102030405, 4, 'BTH', 1);
insert into RestaurantTable values
(2, 102030405, 4, 'TBL', 1);
insert into RestaurantTable values
(3, 102030405, 4, 'BTH', 2);
insert into RestaurantTable values
(4, 102030405, 4, 'TBL', 2);

/*WaitStaff (WaiterID int, WaiterFirstName varchar(15), WaiterLastName varchar(15), WaiterSection int, WorksAt int)*/
insert into WaitStaff values
(102114783, 'Ian', 'McDowell', 2, 110293012);
insert into WaitStaff values
(103493824, 'Yari', 'Perez', 1, 110293012);
insert into WaitStaff values
(119283920, 'Brandon', 'Graver', 1, 102030405);
insert into WaitStaff values
(183274928, 'Kuri', 'Edwards', 2, 102030405);
insert into WaitStaff values
(123567890, 'Luke', 'Merlino', NULL, 102030405);
insert into WaitStaff values
(147898654, 'Persephone', 'Harshbarger', NULL, 110293012);



/*----------------QUERIES-------------------
everything beginning with @ are example/placeholder variables
sorry for the confusing names haha*/

--Assign table to reservation
DECLARE @UpdateReservationID int = 192334532
DECLARE @UpdateReservationTable int = 1 
UPDATE Reservation
SET AssignedToTable = @UpdateReservationTable
WHERE ReservationID = @UpdateReservationID

--Update Status for reservation
DECLARE @UpdateReservationStatusID int = 192334532
DECLARE @UpdateReservationStatus char(10) = 'WAITING'
UPDATE Reservation
SET ResStatus = @UpdateReservationStatus
WHERE ReservationID = @UpdateReservationStatusID

--View Reservations for a specific date
DECLARE @SearchDate DATE = GETDATE()
SELECT *
FROM Reservation
WHERE ResDate = @SearchDate
ORDER BY ResTime

--View all reservations that are not finished 
SELECT *
FROM Reservation
WHERE ResStatus != 'FINISHED'

--View Reservation by ID
DECLARE @SearchResID int = 102938465 
SELECT *
FROM Reservation
WHERE ReservationID = @SearchResID

--Find table details for reservation
DECLARE @SearchReservationID int = 192334532
DECLARE @SearchReservationTable int
DECLARE @SearchReservationRestaurant int 
SELECT @SearchReservationRestaurant = RestaurantAt, @SearchReservationTable = AssignedToTable
FROM Reservation
WHERE ReservationID = 192334532
SELECT * 
FROM RestaurantTable
WHERE RestaurantID = @SearchReservationRestaurant AND TableNumber = @SearchReservationTable
