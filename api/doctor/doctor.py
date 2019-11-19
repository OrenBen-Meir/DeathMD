from sklearn.svm import SVC
import numpy as np

class Doctor:
    """
    Doctor class is a
    machine learning class 
    where you train it using medical 
    data of symptoms and diagnosis
    of each subject
    """
    
    
    def __init__(self, symptoms_data = np.array([]), diagnosis_data = np.array([]), symptoms = [], conditions = []):
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
        self._symptoms = [] # array of symptoms
        self._classifiers = {} # dictionary of classifiers where a key represents the condition it is classifying for

        if(len(symptoms_data) and len(diagnosis_data) and len(symptoms) and len(conditions)):
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
        self._symptoms = symptoms.copy() # set self._symptoms to be a copy of the symptoms list
        diagnosis_data = np.transpose(diagnosis_data) # transposes diagnosis data (which is a matrix)

        for i in range(len(conditions)):
            condition = conditions[i] # extracts condition string from condition array

            # sets a classifier such that it's hashed by condition string and uses the gamma kernel
            self._classifiers[condition] = SVC(kernel='rbf', gamma='auto') 
            # fits the classifier with symproms data and ith row of diagnosis data which corresponds with the ith value of conditions
            self._classifiers[condition].fit(symptoms_data, diagnosis_data[i]) 
    
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
