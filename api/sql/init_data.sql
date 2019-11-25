-- create deathmd tables and initialize data
-- For development purposes, droping all tables
DROP TABLE IF EXISTS SubjectSymptoms;
DROP TABLE IF EXISTS DiagnosisData;
DROP TABLE IF EXISTS Subjects;
DROP TABLE IF EXISTS Symptoms;
DROP TABLE IF EXISTS Conditions;
-- For development purposes, creating all tables
CREATE TABLE Subjects(id INTEGER PRIMARY KEY, added BOOLEAN);
CREATE TABLE Symptoms(
  id INTEGER PRIMARY KEY,
  symptom_name VARCHAR(255) UNIQUE
);
CREATE TABLE Conditions(
  id INTEGER PRIMARY KEY,
  condition_name VARCHAR(255) UNIQUE
);
CREATE TABLE SubjectSymptoms(
  subject_id INTEGER,
  symptom_id INTEGER,
  intensity INTEGER CHECK(
    intensity >= 0
    and intensity <= 5
  ),
  PRIMARY KEY(subject_id, symptom_id),
  FOREIGN KEY (subject_id) REFERENCES Subjects(id) ON DELETE CASCADE,
  FOREIGN KEY (symptom_id) REFERENCES Symptoms(id) ON DELETE CASCADE
);
CREATE TABLE DiagnosisData(
  subject_id INTEGER,
  condition_id INTEGER,
  PRIMARY KEY(subject_id, condition_id),
  FOREIGN KEY (subject_id) REFERENCES Subjects(id) ON DELETE CASCADE,
  FOREIGN KEY (condition_id) REFERENCES Conditions(id) ON DELETE CASCADE
);
-- Inserting Dummy Data
-- dummy data for Symptoms
INSERT INTO Symptoms(id, symptom_name)
VALUES(1, "Coughing");
INSERT INTO Symptoms(id, symptom_name)
VALUES(2, "Erectile Dysfunction");
INSERT INTO Symptoms(id, symptom_name)
VALUES(3, "Constipation");
-- dummy data for Conditions
INSERT INTO Conditions(id, condition_name)
VALUES(1, "Flu");
INSERT INTO Conditions(id, condition_name)
VALUES(2, "Hgh Blood Pressure");
INSERT INTO Conditions(id, condition_name)
VALUES(3, "Colon Cancer");
-- dummy data for subjects, their symptoms, and diagnosis
  -- subject 1 --
INSERT INTO Subjects(id, added)
VALUES(1, False);
-- subject 1 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(1, 1, 4);
-- subject 1 diagnosis
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(1, 1);
-- ---------------------------------------------------------------
  -- subject 2 --
INSERT INTO Subjects(id, added)
VALUES(2, False);
-- subject 2 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(2, 1, 1);
-- subject 2 diagnosis
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(2, 2);
-- ---------------------------------------------------------------
  -- subject 3 --
INSERT INTO Subjects(id, added)
VALUES(3, False);
-- subject 3 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(3, 3, 5);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(3, 1, 2);
-- subject 3 diagnosis
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(3, 3);
-- ---------------------------------------------------------------
  -- subject 4 --
INSERT INTO Subjects(id, added)
VALUES(4, False);
-- subject 4 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(4, 1, 0);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(4, 2, 5);
-- subject 4 diagnosis
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(4, 2);
-- ---------------------------------------------------------------
  -- subject 5 --
INSERT INTO Subjects(id, added)
VALUES(5, False);
-- subject 5 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(5, 1, 5);
-- subject 5 diagnosis
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(5, 1);
-- ---------------------------------------------------------------
  -- subject 6 --
INSERT INTO Subjects(id, added)
VALUES(6, False);
-- subject 6 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(6, 1, 3);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(6, 2, 2);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(6, 3, 3);
-- subject 6 diagnosis
  -- ---------------------------------------------------------------
  -- subject 7 --
INSERT INTO Subjects(id, added)
VALUES(7, False);
-- subject 7 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(7, 1, 0);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(7, 2, 0);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(7, 3, 0);
-- subject 7 diagnosis
  -- ---------------------------------------------------------------
  -- subject 8 --
INSERT INTO Subjects(id, added)
VALUES(8, False);
-- subject 8 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(8, 1, 5);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(8, 2, 5);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(8, 3, 4);
-- subject 8 diagnosis
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(8, 1);
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(8, 2);
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(8, 3);
-- ---------------------------------------------------------------
  -- subject 9 --
INSERT INTO Subjects(id, added)
VALUES(9, False);
-- subject 9 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(9, 1, 3);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(9, 2, 4);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(9, 3, 5);
-- subject 9 diagnosis
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(9, 1);
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(9, 2);
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(9, 3);
-- ---------------------------------------------------------------
  -- subject 10 --
INSERT INTO Subjects(id, added)
VALUES(10, False);
-- subject 10 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(10, 1, 5);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(10, 2, 3);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(10, 3, 0);
-- subject 10 diagnosis
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(10, 1);
-- ---------------------------------------------------------------
  -- subject 11 --
INSERT INTO Subjects(id, added)
VALUES(11, False);
-- subject 11 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(11, 1, 4);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(11, 2, 2);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(11, 3, 3);
-- subject 10 diagnosis
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(11, 1);
-- ---------------------------------------------------------------
  -- subject 12 --
INSERT INTO Subjects(id, added)
VALUES(12, False);
-- subject 11 symptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(12, 1, 5);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(12, 2, 1);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity)
VALUES(12, 3, 3);
-- subject 10 diagnosis
INSERT INTO DiagnosisData(subject_id, condition_id)
VALUES(12, 1);
-- -------------
