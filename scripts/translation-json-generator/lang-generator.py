import numpy as np
import pandas as pd

# Export CoronaTracker-Translation into CSV and load it here.
data = pd.read_csv('input.csv')

# Select your language.
# 1: Bahasa, 2: 简体中文， ... 
target_column = 11

translate_key = data.iloc[:,0]
translate_value = data.iloc[:,target_column]

rows = len(translate_key) # Number of rows

# Please enter the row wrt. google spread sheet.
# E.g. Row 10 for 'Home-https://www.coronatracker.com/'
row_to_ignore = [2,10,39,43,46,49,61,96,110,]
row_to_ignore = np.array(row_to_ignore) - 2 # Index offset adjustment

# Menu translation index
menu_final_index = 8
menu_final_index -= 2 # Index offset adjustment

f = open("output.js", "w") # Output file

# Javascript export default structure
f.write('export default {\n')

# Menu translation
f.write('\t"menu": {\n')

for i in range(menu_final_index+1):
    if(not(pd.isnull(translate_key[i])) and not(i in row_to_ignore)):
        f.write('\t\t"{}": '.format(translate_key[i]))

        if(not pd.isnull(translate_value[i])):
            f.write('"{}",\n'.format(translate_value[i]))
        else:
            f.write('"{}",\n'.format(translate_key[i]))

f.write('\t},\n')

# Other translation
for i in range(menu_final_index+1, rows):
    if(not(pd.isnull(translate_key[i])) and not(i in row_to_ignore)):
        f.write('\t"{}": '.format(translate_key[i]))

        if(not pd.isnull(translate_value[i])):
            f.write('"{}",\n'.format(translate_value[i]))
        else:
            f.write('"{}",\n'.format(translate_key[i]))

f.write('};')
f.close()