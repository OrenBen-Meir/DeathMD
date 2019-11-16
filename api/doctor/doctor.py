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
    
    
    __init__(self, sym_data, con_data):
        """
        initially sets up doctor with training data.
        sym_data is short for symptom data and
        con_data is short for condition data.
        Both data must be numpy arrays(matrices to 
        be more accurate) sharing the same amount of rows.
        """
        self.clfs = []
        pass

    train(self, sym_data, con_data):
        """
        trains doctor from scratch
        sym_data is short for symptom data and
        con_data is short for condition data.
        Both data must be numpy arrays(matrices 
        to be more accurate) sharing the same 
        amount of rows.
        """
        pass

    
    retrain(self, sym_data, con_data):
        """
        retrains doctor by appending data
        sym_data is short for symptom data and
        con_data is short for condition data.
        Both data must be numpy arrays(matrices to 
        be more accurate) sharing the same 
        amount of rows.
        """
        pass

   diagnose(self, sym_info):
       """
       Performs a medical diagnosis using
       sym_info (short for symptom info).
       Symptom info is a 1D numpy array.
       The result is a corresponding array of
       symptom values.
       """
       pass
