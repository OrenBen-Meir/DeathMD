import sys
import json
import pandas as pd
import numpy as np 
from doctor import Doctor

subjects = json.loads(sys.argv[1])
symptoms = json.loads(sys.argv[2])
conditions = json.loads(sys.argv[3])
subj_sym = json.loads(sys.argv[4])
diagnosis = json.loads(sys.argv[5])

# Printing all queries, may be deleted later
print('subjects :\n', subjects, '\n')
print('symptoms :\n', symptoms, '\n')
print('conditions :\n', conditions, '\n')
print('subj_sym :\n', subj_sym, '\n')
print('diagnosis :\n', diagnosis, '\n')

symptoms_list = [sym_entry['symptom_name'] for sym_entry in symptoms] # list of symptoms
conditions_list = [con_entry['condition_name'] for con_entry in conditions] # list of conditions

ids = {"id": [subj["id"] for subj in subjects]}  # dictionary of ids
num_subjects = len(ids['id'])

subj_symptoms_dic = ids.copy()  # dictionary of subjects and their symptoms
diagnosis_dic = ids.copy()  # dictionary of subjects and their diagnosis

for sym in symptoms_list:  # create an uninitialized dictionary for subjects and symptoms
    subj_symptoms_dic[sym] = num_subjects*[0]

for con in conditions_list:  # create an uninitialized dictionary for diagnosis
    diagnosis_dic[con] = num_subjects*[0]

subj_symptoms_df = pd.DataFrame(data=subj_symptoms_dic) # dataframe of subject's symptoms
diagnosis_df = pd.DataFrame(data=diagnosis_dic) # data frame for diagnosis


for case in subj_sym:  # initialize dataframe of subject's symptoms
    subj_id = case['subject_id'] # id of subject
    index = subj_symptoms_df.index[subj_symptoms_df['id'] == subj_id].tolist()[0] # index of subject
    subj_symptoms_df.iloc[index][case['symptom_name']] = case['intensity'] # set intensity of subject's symptom

for case in diagnosis:  # initialize dataframe of subject's diagnosis
    subj_id = case['subject_id'] # id of subject
    index = diagnosis_df.index[diagnosis_df['id'] == subj_id].tolist()[0] # index of subject
    diagnosis_df.iloc[index][case['condition_name']] = 1 # sets a condition for the subject

# Dropping id for both dataframes as they are no longer needed
subj_symptoms_df.drop(columns=['id'], inplace=True)
diagnosis_df.drop(columns=['id'], inplace=True)

print(subj_symptoms_df)
print(diagnosis_df)
print("done!")
