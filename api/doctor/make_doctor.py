import sys
import json
import pandas as pd 

print([json.loads(elem) for elem in sys.argv[1:]])

print("done!")