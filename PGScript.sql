DROP DATABASE DepozitDB;
CREATE DATABASE DepozitDB; 
USE DepozitDB;





CREATE TABLE tblFurnizori (
  idFurnizor SERIAL PRIMARY KEY ,
  nume VARCHAR(45) NOT NULL,
  prenume VARCHAR(45) NOT NULL,
  nr_tel VARCHAR(15) NOT NULL UNIQUE,
  adresa VARCHAR(100) NOT NULL
); 


CREATE TABLE tblCategorii (
  idCategorie SERIAL PRIMARY KEY ,
  nume VARCHAR(45) NOT NULL UNIQUE,
  furnizori VARCHAR(45),
  descriere VARCHAR (45)
);

CREATE TABLE tblPiese (
  idPiesa SERIAL PRIMARY KEY,
  idfurnizor SMALLINT NOT NULL,
  idcategorie SMALLINT NOT NULL,
  nume VARCHAR(45) NOT NULL,
  pret FLOAT NOT NULL,
  an_fabricatie INTEGER NOT NULL,
  CONSTRAINT fk_furnizor FOREIGN KEY (idfurnizor) 
		REFERENCES tblFurnizori(idFurnizor) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_categorie FOREIGN KEY (idcategorie) 
		REFERENCES tblCategorii(idCategorie) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TYPE enum_client AS ENUM('persoana_fizica','firma');

CREATE TABLE tblClienti (
  idClient SERIAL PRIMARY KEY,
  nume VARCHAR(45) NOT NULL,
  nr_tel VARCHAR(15) NOT NULL UNIQUE,
  mail VARCHAR(100) NOT NULL UNIQUE,
  tip_client enum_client
);


CREATE TABLE tblComenzi (
  idComanda SERIAL PRIMARY KEY,
  idpiesa SMALLINT NOT NULL,
  idclient INT NOT NULL,
  adresa_livrare VARCHAR(100) NOT NULL,
  CONSTRAINT fk_client FOREIGN KEY (idclient) 
		REFERENCES tblClienti(idClient) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_componente FOREIGN KEY (idpiesa) 
		REFERENCES tblPiese(idPiesa) ON DELETE CASCADE ON UPDATE CASCADE
);
  
	INSERT INTO tblFurnizori (nume, prenume, nr_tel, adresa) 
VALUES 
	('Popescu', 'Ion', '0712345678', 'Str. Industriei 1, Bucuresti'),
	('Ionescu', 'Maria', '0723456789', 'Str. Fabricii 10, Cluj'),
	('Dumitru', 'Ana', '0734567890', 'Str. Principala 25, Iasi'),
	('Marinescu', 'George', '0745678901', 'Str. Tineretului 5, Brasov'),
	('Vasile', 'Elena', '0756789012', 'Str. Victoriei 8, Constanta'),
	('Constantinescu', 'Mihai', '0767890123', 'Str. Pacii 12, Timisoara'),
	('Radu', 'Cristina', '0778901234', 'Str. Libertatii 9, Oradea'),
	('Enache', 'Andrei', '0789012345', 'Str. Universitatii 11, Galati'),
	('Georgescu', 'Laura', '0790123456', 'Str. Lalelelor 15, Ploiesti'),
	('Petrescu', 'Adrian', '0701234567', 'Str. Trandafirilor 18, Craiova');
    
	INSERT INTO tblCategorii (nume, furnizori, descriere) 
VALUES 
	('Filtre', 5, 'Curata aer/ulei'),
	('Baterii', 3, 'Energie electrica'),
	('Frane', 8, 'Oprire vehicul'),
	('Anvelope', 4, 'Aderenta drum'),
	('Sisteme de iluminat', 9, 'Vizibilitate noapte'),
	('Uleiuri', 2, 'Lubrifiere motor'),
	('Suspensii', 1, 'Confort stabilitate'),
	('Roti', 6, 'Miscare vehicul'),
	('Caroserii', 10, 'Structura exterior'),
	('Interior', 7, 'Confort pasageri');

    
    INSERT INTO tblClienti (nume, nr_tel, mail, tip_client) 
VALUES 
	('Andrei Munteanu', '0741234567', 'contact@autofix.ro', 'firma'),
	('Ion Popescu', '0729876543', 'ion.popescu@gmail.com', 'persoana_fizica'),
	('Cristi Dinu', '0749871234', 'office@cartech.ro', 'firma'),
	('Maria Ionescu', '0734567890', 'maria.ionescu@yahoo.com', 'persoana_fizica'),
	('Andrei Dumitru', '0712345678', 'andrei.dumitru@gmail.com', 'persoana_fizica'),
	('Marian Nicu', '0723456789', 'contact@servauto.ro', 'firma'),
	('Elena Vasile', '0767890123', 'elena.vasile@gmail.com', 'persoana_fizica'),
	('Costel Vulcanizare', '0701234567', 'sales@autoparts.ro', 'firma'),
	('Cristian Marin', '0789012345', 'cristian.marin@hotmail.com', 'persoana_fizica'),
	('Laura Radu', '0790123456', 'laura.radu@yahoo.com', 'persoana_fizica');
    
CREATE SEQUENCE tblpiese_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
CREATE SEQUENCE comanda_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 
SELECT * FROM tblCategorii;
SELECT * FROM tblClienti;
SELECT * FROM tblComenzi;
SELECT * FROM tblFurnizori;
SELECT * FROM tblPiese;




