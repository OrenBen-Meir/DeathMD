-- create deathmd tables and initialize data

-- For development purposes, droping all tables
DROP TABLE IF EXISTS Subjects;
DROP TABLE IF EXISTS Symptoms;
DROP TABLE IF EXISTS Conditions;
DROP TABLE IF EXISTS SubjectSymptoms;
DROP TABLE IF EXISTS DiagnosisData;

-- For development purposes, creating all tables
CREATE TABLE Subjects( 
    id INTEGER PRIMARY KEY, 
    added BOOLEAN
);

CREATE TABLE Symptoms(
    id INTEGER PRIMARY KEY, 
    symptom_name VARCHAR(255)
);

CREATE TABLE Conditions(
    id INTEGER PRIMARY KEY, 
    condition_name VARCHAR(255)
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

-- dummy data for Symptoms

-- dummy data for Conditions

-- dummy data for SubjectSymptoms

-- dummy data for DiagnosisData