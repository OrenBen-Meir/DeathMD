import sklearn
import numpy as np

class Doctor:
    """
    Doctor class is a
    machine learning class 
    where you train it using medical 
    data of symptoms and diagnosis
    of each subject
    """
    
    
    def __init__(self, symptoms_data = None, diagnosis_data = None, symptoms = None, conditions = None):
        """
        If all arguments are not null, the doctor object
        will initially be sert up with training data.
        symptoms_data is for symptom data and
        diagnosis_data is diagnosis data.
        Both data must be numpy arrays(matrices to 
        be more accurate) sharing the same amount of rows.
        In addition, a list of symptoms and conditions
        are needed. This is so that the indices of symptoms
        correspond with symptoms_data, for example, symptom[0]
        represents the column 0 in symptoms_data. The same 
        relationship applies to conditions and diagnosis_data.
        """
        self.symptoms = []
        self.conditions = []
        self.clfs = {}
        if(symptoms_data != None and diagnosis_data != None and symptoms != None and conditions != None):
            self.train(symptoms_data, diagnosis_data, symptoms, conditions)

    def train(self, symptoms_data, diagnosis_data, symptoms, conditions):
        """
        trains doctor from scratch
        symptoms_data is for symptom data and
        diagnosis_data is for diagnosis data.
        Both data must be numpy arrays(matrices 
        to be more accurate) sharing the same 
        amount of rows.
        """
        pass

    
    def update(self, sym_data, con_data):
        """
        updates doctor by appending data
        symptoms_data is for symptom data and
        diagnosis_data is for diagnosis data.
        Both data must be numpy arrays(matrices to 
        be more accurate) sharing the same 
        amount of rows.
        In addition, a list of symptoms and conditions
        are needed. This is so that the indices of symptoms
        correspond with symptoms_data, for example, symptom[0]
        represents the column 0 in symptoms_data. The same 
        relationship applies to conditions and diagnosis_data
        """
        pass

    def diagnose(self, symptom_info):
        """
        Performs a medical diagnosis using
        symptom_info (stands for symptom info).
        Symptom info is a 1D numpy array.
        The result is a corresponding dictionary of
        diagnosis values.
        """
        pass
