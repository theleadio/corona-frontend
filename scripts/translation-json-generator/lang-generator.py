import numpy as np
import pandas as pd
import getopt, sys


full_cmd_arguments = sys.argv
argument_list = full_cmd_arguments[1:]
#print(sys.argv)

short_options = "ho:v"
long_options = ["help", "output=", "version"]


arguments, values = getopt.getopt(argument_list, short_options, long_options)
for current_argument, current_value in arguments:
    if current_argument in ("-v", "--version"):
        print ("version 0.9")
        sys.exit(2)
    elif current_argument in ("-h", "--help"):
        print ("Put input.csv which is exported from google sheets into same directory as this script and just run the script without any arguments")
        sys.exit(2)
    elif current_argument in ("-o", "--output"):
        print (("Enabling special output mode (%s)") % (current_value))
        sys.exit(2)

print("Parsing input.csv to output output.js")
#################################################
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