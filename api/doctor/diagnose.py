import sys
import json
import numpy as np 
from doctor import Doctor
from joblib import load
from helper_functions import doctor_filename

my_doctor = load(doctor_filename()) # loads doctor object
symptom_data = json.loads(sys.argv[1]) # dictionary with key being a symptom and its value the intensity
symptoms = my_doctor.symptoms # list of symptoms

# Array of symptom intensities, initialized to zero.
symptom_data_array = np.array(len(symptom_data)*[0]) 

# This for loop make it such is such that symptom_data_array[i] 
# corresponds with symptoms[i] based on the idea that 
# symptom_data[symptoms[i]] == symptom_data_array[i].
for i in range(len(symptoms)):
    symptom_data_array[i] = symptom_data[symptoms[i]]

diagnosis = my_doctor.diagnose(symptom_data_array) # diagnoses based on symptom data

print(json.dumps(diagnosis)) # serializes diagnosis into a json string and ouputs to stdout