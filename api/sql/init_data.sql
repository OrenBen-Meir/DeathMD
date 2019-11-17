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
    intensity INTEGER NOT NULL CHECK(intensity >= 0 and intensity <= 5), 
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

-- dummy data for Symptoms
INSERT INTO Symptoms(id, symptom_name) VALUES(1, "Coughing");

-- dummy data for Conditions
INSERT INTO Conditions(id, condition_name) VALUES(1, "Flu");

-- dummy data for SubjectSymptoms
INSERT INTO SubjectSymptoms(subject_id, symptom_id, intensity) VALUES(1, 1, 4);

-- dummy data for 
INSERT INTO DiagnosisData(subject_id, condition_id) VALUES(1, 1);