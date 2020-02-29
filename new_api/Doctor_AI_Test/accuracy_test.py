# using Symptom_checker dataset form kaggle.
# url: https://www.kaggle.com/rabisingh/symptom-checker?fbclid=IwAR0mOjchzT1BJEQOew-fDYht1WP8KF30Jrjy2JyGHGvJixRUmD36XblaFTk

import pandas as pd
import numpy as np
from sklearn import preprocessing
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics
from sklearn.metrics import classification_report
from doctor import Doctor
 

# create dataframes from csv files
df = pd.read_csv('./Training.csv') # training data df
df_test = pd.read_csv('./Testing.csv') # testing data df
#print(df)
#print(df_test)


# encode prognosis values and store them
le = preprocessing.LabelEncoder()
le.fit(pd.concat([df['prognosis'], df_test['prognosis']]))
encoded_prognosis = le.transform(df['prognosis'])

# initialize and train doctor
doctor = Doctor()
doctor.train(df)

# get diagnosis with testing data
y_diagnosis = doctor.diagnose(df_test[df_test.columns.difference(['prognosis'])])
y_pred = [diagnosis_entry["diagnosis_code"] for diagnosis_entry in y_diagnosis] # predicted encoded diagnosis values
y_proba = [diagnosis_entry["probability"] for diagnosis_entry in y_diagnosis] # probability vakues for each preciction

# compare your prediction with actual values
y_true = doctor.diagnosis_encoder.transform(df_test['prognosis'])

print("Accuracy:",metrics.accuracy_score(y_true, y_pred))
print("Classification Report:")
print(classification_report(y_true, y_pred, target_names=df_test['prognosis']))

print("\nTesting Data Results")
test_res = []
for i in range(len(y_diagnosis)):
    test_res.append({
        "Expected Prognosis": np.array(df_test['prognosis'])[i],
        "Expected Value": y_true[i],
        "Predicted Value": y_pred[i],
        "Prediction Chance": str(y_proba[i]*100)+"%"
    })

df_test_res = pd.DataFrame(test_res)
print(df_test_res)








