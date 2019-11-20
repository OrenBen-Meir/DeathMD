from sklearn.svm import SVC
import numpy as np
from helper_functions import incr_digit_list

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
    def symptoms(self):
        """
        returns all symptoms
        """
        return self._symptoms.copy()

    @property 
    def conditions(self):
        """
        returns all conditions
        """
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
            clf = SVC(kernel=self._kernel, gamma=self._gamma, probability=True) # sets a support vector machine classifier using the gaussian kernel
            clf.fit(symptoms_data,  diagnosis_data[i]) # fits the classifier with symptoms data and ith row of diagnosis data
            # The ith row of diagnosis data corresponds with the ith condition in the conditions list
            self._classifiers[condition] = clf # Stores clf in a _classifiers dictionary whose key is the condition

    def diagnose(self, symptom_info):
        """
        Performs a medical diagnosis using symptom_info (stands for symptom info).
        Symptom info is a 1D numpy array. The result is a corresponding dictionary of
        diagnosis values whose key is a condition and its value is another dictionary.
        That dictionary has a key called 'has_condition' which tells you if you have the
        condition based on a boolean value. The key 'confidence' represents
        the confidence that you have the condition.
        """
        symptom_info = np.array([symptom_info])
        diagnosis = {}
        for condition in self._classifiers:
            clf = self._classifiers[condition]
            has_condition = clf.predict(symptom_info)[0]
            if has_condition == 0:
                probability_correct = clf.predict_proba(symptom_info)[0][0]
            else:
                probability_correct = clf.predict_proba(symptom_info)[0][1]
            diagnosis[condition] = {'has_condition': bool(has_condition), 'confidence': probability_correct}
        return diagnosis
    
    def avg_confidence(self):
        """
        Returns average confidence for each condition for doctor
        """
        intensity_limit = 6
        total_tests = intensity_limit**3
        conditions_list = self.conditions
        confidence_sums = len(conditions_list)*[0]
        test_symptoms = len(self.symptoms)*[0]
        test_done = True
        while test_done:
            test_symptoms_array = np.array(test_symptoms)
            res = self.diagnose(test_symptoms_array)
            for i in range(len(conditions_list)):
                condition = conditions_list[i]
                confidence_sums[i] += res[condition]['confidence']
            test_done = incr_digit_list(test_symptoms, base=intensity_limit)
        confidence_values = {}
        for i in range(len(conditions_list)):
            con = conditions_list[i]
            confidence_values[con] = confidence_sums[i]/total_tests
        return confidence_values

    
