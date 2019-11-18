import sys
import json
import pandas as pd 

subjects = json.loads(sys.argv[1]);
symptoms = json.loads(sys.argv[2]);
conditions = json.loads(sys.argv[3]);
subj_sym = json.loads(sys.argv[4]);
diagnosis = json.loads(sys.argv[5]);
print('subjects :\n', subjects, '\n')
print('symptoms :\n', symptoms, '\n')
print('conditions :\n', conditions, '\n')
print('subj_sym :\n', subj_sym, '\n')
print('diagnosis :\n', diagnosis, '\n')

print("done!")
