-- create deathmd tables and initialize data

-- For development purposes, droping all tables
DROP TABLE IF EXISTS SubjectSymptoms;
DROP TABLE IF EXISTS DiagnosisData;
DROP TABLE IF EXISTS Subjects;
DROP TABLE IF EXISTS Symptoms;
DROP TABLE IF EXISTS Conditions;

-- For development purposes, creating all tables
CREATE TABLE Subjects( 
    id INTEGER PRIMARY KEY, 
    added BOOLEAN
);

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
    intensity INTEGER CHECK(intensity >= 0 and intensity <= 5), 
    PRIMARY KEY(subject_id, symptom_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(id),
    FOREIGN KEY (symptom_id) REFERENCES Symptoms(id)
);

CREATE TABLE DiagnosisData(
    subject_id INTEGER, 
    condition_id INTEGER,
    PRIMARY KEY(subject_id, condition_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(id),
    FOREIGN KEY (condition_id) REFERENCES Conditions(id)
);

-- Inserting Dummy Data

-- dummy data for Subjects
INSERT INTO Subjects(id, added) VALUES(1, False);
INSERT INTO Subjects(id, added) VALUES(2, False);
INSERT INTO Subjects(id, added) VALUES(3, False);
INSERT INTO Subjects(id, added) VALUES(4, False);
INSERT INTO Subjects(id, added) VALUES(5, False);
-- dummy data for Symptoms
INSERT INTO Symptoms(id, symptom_name) VALUES(1, "Coughing");
INSERT INTO Symptoms(id, symptom_name) VALUES(2, "Itching");
INSERT INTO Symptoms(id, symptom_name) VALUES(3, "Constipation");
-- dummy data for Conditions
INSERT INTO Conditions(id, condition_name) VALUES(1, "Flu");
INSERT INTO Conditions(id, condition_name) VALUES(2, "Toe Fungus");
INSERT INTO Conditions(id, condition_name) VALUES(3, "Colon Cancer");
-- dummy data for SubjectSymptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity) VALUES(1, 1, 4);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity) VALUES(2, 2, 3);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity) VALUES(3, 3, 1);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity) VALUES(4, 2, 0);
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity) VALUES(5, 1, 1);
-- dummy data for 
INSERT INTO DiagnosisData(subject_id, condition_id) VALUES(1, 1);
INSERT INTO DiagnosisData(subject_id, condition_id) VALUES(2, 2);
INSERT INTO DiagnosisData(subject_id, condition_id) VALUES(3, 3);
INSERT INTO DiagnosisData(subject_id, condition_id) VALUES(4, 2);
INSERT INTO DiagnosisData(subject_id, condition_id) VALUES(5, 1);
