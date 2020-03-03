import pandas as pd
import numpy as np
from sklearn import preprocessing
from sklearn.ensemble import RandomForestClassifier
import copy

class Doctor:
    """
    Doctor class is a machine learning class where you train it using medical 
    data of symptoms and diagnosis of each subject
    """
    
    def __init__(self):
        """
        Initialize the doctor AI
        """
        self._diagnosis_encoder = preprocessing.LabelEncoder() # used to encode the symptoms 
        self._symptoms = [] # an array of symptoms
        self._model = RandomForestClassifier() # will server as a classifier that will be trained
        
    @property
    def symptoms(self):
        """
        a list of all symptoms
        """
        return self._symptoms.copy()
    
    @property 
    def conditions(self):
        """
        a list of all conditions
        """
        return list(self._diagnosis_encoder.classes_)

    @property
    def diagnosis_encoder(self):
        """
        a LabelEncoder for diagnosis, please refer to the documentation for the LabelEncoder in scikit-learn 
        """
        return copy.deepcopy(self._diagnosis_encoder)
    
    def train(self, df, prognosis_column='prognosis'):
        """
        takes in a dataframe and a class column (which will store our classifiers)
        and trains this AI object
        """
        symptom_column_labels = df.columns.difference([prognosis_column])
        self._symptoms = list(symptom_column_labels)
        self._diagnosis_encoder.fit(df[prognosis_column])
        encoded_prognosis = self._diagnosis_encoder.transform(df[prognosis_column])
        self._model.fit(df[symptom_column_labels], encoded_prognosis)
        
    def diagnose(self, symptom_info):
        """
        predicts what diagnosis you have and its accuracy using a 2D array called symptom_info. 
        symptom info can be any datatype convertable to a numpy array, just be sure the
        symptoms for each indioces in symptom_info's row matches the symptoms property.
        The function returns a list of diagnosis entries where each entry is a dictionary
        with a "diagnosis_code" key for a diagnosis code, "diagnosis" key for a diagnosis 
        string and a "probability" key which determines the probability the diagnosis is correct.
        """
        symptom_info = np.array(symptom_info)
        diagnosis_vals = self._model.predict(symptom_info)
        diagnosis_proba = self._model.predict_proba(symptom_info)
        result = []
        for i in range(len(diagnosis_vals)):
            result.append({
                "diagnosis_code": diagnosis_vals[i],
                "diagnosis": self._diagnosis_encoder.inverse_transform([diagnosis_vals[i]])[0],
                "probability": np.amax(diagnosis_proba[i])
            })
        return result
        
        
