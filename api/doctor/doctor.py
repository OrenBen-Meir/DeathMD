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
    
    
    def __init__(self, sym_data, con_data, symptoms, conditions):
        """
        initially sets up doctor with training data.
        sym_data is short for symptom data and
        con_data is short for condition data.
        Both data must be numpy arrays(matrices to 
        be more accurate) sharing the same amount of rows.
        In addition, a list of symptoms and conditions
        are needed. This is so that the indices of symptoms
        correspond with sym_data, for example, symptom[0]
        represents the column 0 in sym_data. The same 
        relationship applies to conditions and con_data
        """
        self.clfs = {}
        pass

    def train(self, sym_data, con_data):
        """
        trains doctor from scratch
        sym_data is short for symptom data and
        con_data is short for condition data.
        Both data must be numpy arrays(matrices 
        to be more accurate) sharing the same 
        amount of rows.
        """
        pass

    
    def retrain(self, sym_data, con_data):
        """
        retrains doctor by appending data
        sym_data is short for symptom data and
        con_data is short for condition data.
        Both data must be numpy arrays(matrices to 
        be more accurate) sharing the same 
        amount of rows.
        """
        pass

    def diagnose(self, sym_info):
        """
        Performs a medical diagnosis using
        sym_info (short for symptom info).
        Symptom info is a 1D numpy array.
        The result is a corresponding array of
        symptom values.
        """
        pass
