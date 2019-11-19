from sklearn.svm import SVC
import numpy as np

class Doctor:
    """
    Doctor class is a machine learning class where you train it using medical 
    data of symptoms and diagnosis of each subject
    """
    
    
    def __init__(self, kernel='rbf', gamma='auto'):
        """
        Initialize doctor with an option for kernel and gamme as it uses
        support vector machines.
        """
        self._symptoms = [] # array of symptoms
        self._classifiers = {} # dictionary of classifiers where a key represents the condition it is classifying for
        self._kernel = kernel
        self._gamma = gamma
    
    @property
    def symptoms(self): # returns all symptoms
        return self._symptoms.copy()

    @property 
    def conditions(self): # returns all conditions
        return [condition for condition in self._classifiers]

    def train(self, symptoms_data, diagnosis_data, symptoms, conditions):
        """
        trains doctor from scratch symptoms_data is for symptom data and diagnosis_data 
        is for diagnosis data. Both data must be numpy arrays (matrices to be more accurate) 
        sharing the same amount of rows. In addition, a list of symptoms and conditions are needed. 
        This is so that the indices of symptoms correspond with symptoms_data, for example, 
        symptom[0] represents the column 0 in symptoms_data. The same relationship applies to 
        conditions and diagnosis_data.
        """
        self._symptoms = symptoms.copy() # set self._symptoms to be a copy of the symptoms list
        diagnosis_data = np.transpose(diagnosis_data) # transposes diagnosis data (which is a matrix)

        for i in range(len(conditions)):
            condition = conditions[i] # extracts the ith condition string from condition array
            clf = SVC(kernel=self._kernel, gamma=self._gamma) # sets a support vector machine classifier using the gaussian kernel
            clf.fit(symptoms_data,  diagnosis_data[i]) # fits the classifier with symptoms data and ith row of diagnosis data
            # The ith row of diagnosis data corresponds with the ith condition in the conditions list
            self._classifiers[condition] = clf # Stores clf in a _classifiers dictionary whose key is the condition
    
    def update(self, sym_data, con_data):
        """
        Updates doctor by appending data. symptoms_data is for symptom data and
        diagnosis_data is for diagnosis data.Both data must be numpy arrays(matrices to 
        be more accurate) sharing the same amount of rows.
        """
        pass

    def diagnose(self, symptom_info):
        """
        Performs a medical diagnosis using symptom_info (stands for symptom info).
        Symptom info is a 1D numpy array. The result is a corresponding dictionary of
        diagnosis values whose key is a condition and its value is its diagnosis.
        """
        pass
    
