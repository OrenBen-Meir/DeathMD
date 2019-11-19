import sys
import json
import pandas as pd

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

ids = {"id": [subj["id"] for subj in subjects]}  # dictionary of ids

subj_sym_dic = ids.copy()  # dictionary of subjects and their symptoms
subj_diag_dic = ids.copy()  # dictionary of subjects and their diagnosis

for symptm in symptoms:  # create an uninitialized dictionary for subjects and symptoms
    subj_sym_dic[symptm['symptom_name']] = len(ids)*[0]

for condn in conditions:  # create an uninitialized dictionary for diagnosis
    subj_diag_dic[condn['condition_name']] = len(ids)*[0]


# dataframe of subject's symptoms
subj_sym_df = pd.DataFrame(data=subj_sym_dic)

# data frame for diagnosis
subj_diag_df = pd.DataFrame(data=subj_diag_dic)


for case in subj_sym:  # initialize dataframe of subject's symptoms

    # id of subject
    subj_id = case['subject_id']

    # index of subject
    index = subj_sym_df.index[subj_sym_df['id'] == subj_id].tolist()[0]

    # set intensity of subject's symptom
    subj_sym_df.iloc[index][case['symptom_name']] = case['intensity']

for case in diagnosis:  # initialize dataframe of subject's diagnosis

     # id of subject
    subj_id = case['subject_id']

    # index of subject
    index = subj_diag_df.index[subj_diag_df['id'] == subj_id].tolist()[0]

    # sets a condition for the subject
    subj_diag_df.iloc[index][case['condition_name']] = 1

print(subj_sym_df)
print(subj_diag_df)
print("done!")
