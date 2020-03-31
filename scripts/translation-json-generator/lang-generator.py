import numpy as np
import pandas as pd
import getopt, sys


full_cmd_arguments = sys.argv
argument_list = full_cmd_arguments[1:]
#print(sys.argv)

short_options = "lhvc:"
long_options = ["list","help", "version", "column"]


arguments, values = getopt.getopt(argument_list, short_options, long_options)
for current_argument, current_value in arguments:
    if current_argument in ("-v", "--version"):
        print ("version 0.9")
        sys.exit(2)
    elif current_argument in ("-l", "--list"):
        print("1) --help : Show instructions on how to use this script")
        print("2) --version : Show version number")
        print("3) --column : Start extraction of language to user specified .js file")
        sys.exit(2)
    elif current_argument in ("-h", "--help"):
        print ("1) Put input.csv which is exported from google sheets into same directory as this script")
        print ("2) Run it with the -c flag and 2 arguments. 1) Column index and 2) output filename")
        print ("3) Column index must be greater than 0")
        print ("4) Output filename must have extension .js")
        print ("5) Example : python lang-generator.py -c 3 en.js")
        print ("6) This commands means extract language strings from column 3 of input.csv and save it into en.js")
        sys.exit(2)
    elif current_argument in ("-c", "--column"):
        #print (("Enabling special output mode (%s)") % (current_value))
        position = 1
        column = 1
        filename = "output.js"
        args = len(sys.argv) - 1
        if args == 3:
            column = sys.argv[2]
            filename = sys.argv[3]
            print("Getting language text from column "+str(column)+" of exported input.csv")
            # print("Starting to export language file to file "+filename)
        else:
            print ("You need put the column index of the language to extract and the file name to extract to. Example -c 4 output.js")
            sys.exit(2)

if int(column) < 1:
    print("Column value must be greater than 1")
    sys.exit(2)
elif filename.find(".js") == -1:
    print("Filename must have .js extension")
    sys.exit(2)


#################################################
# Export CoronaTracker-Translation into CSV and load it here.
data = pd.read_csv('input.csv', header=None)



# Select your language.
# 1: Bahasa, 2: 简体中文， ... 
target_column = int(column)

translate_key = data.iloc[:,0]
translate_value = data.iloc[:,target_column]

translated_language = translate_value[0];
print("Language :" + translated_language)
print("Input File :" + "input.csv")
print("Output File :" + filename)
#print("Extracting translation for " + translated_language +" from input.csv to output file "+filename)

rows = len(translate_key) # Number of rows

# Please enter the row wrt. google spread sheet.
# E.g. Row 10 for 'Home-https://www.coronatracker.com/'
row_to_ignore = [2,10,39,43,46,49,61,96,110,]
row_to_ignore = np.array(row_to_ignore) - 2 # Index offset adjustment

# Menu translation index
menu_final_index = 8
menu_final_index -= 2 # Index offset adjustment

f = open(filename, "w") # Output file

# Javascript export default structure
f.write('export default {\n')

# Menu translation
f.write('\t"menu": {\n')

for i in range(menu_final_index+1):
    if(not(pd.isnull(translate_key[i])) and not(i in row_to_ignore)):
        f.write('\t\t"{}": '.format(translate_key[i].strip()))

        if(not pd.isnull(translate_value[i])):
            f.write('"{}",\n'.format(translate_value[i].strip()))
        else:
            f.write('"{}",\n'.format(translate_key[i].strip()))

f.write('\t},\n')

# Other translation
for i in range(menu_final_index+1, rows):
    if(not(pd.isnull(translate_key[i])) and not(i in row_to_ignore)):
        f.write('\t"{}": '.format(translate_key[i].strip()))

        if(not pd.isnull(translate_value[i])):
            f.write('"{}",\n'.format(translate_value[i].strip()))
        else:
            f.write('"{}",\n'.format(translate_key[i].strip()))

f.write('};')
f.close()
print("Translation of "+translated_language+" exported to "+filename+" file completed.")
print("Please transfer it over to the \\lang folder of the project.")