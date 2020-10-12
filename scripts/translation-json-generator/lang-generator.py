# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
import getopt, sys


column = []
for x in [chr(i) for i in range(ord('a'),ord('z')+1)]:
    column.append(x)

dicts = {}
keys = range(0, len(column))

for i in keys:
    dicts[column[i]] = i


extend_columns = list(map(chr, range(97, 123)))#create array of characters a to z
extend_dicts = {}

#Create an array of dicts for aa to az
extended_idx = 0
for char in extend_columns:
    extend_dicts['a' + char] = len(dicts) + extended_idx
    extended_idx += 1

dicts.update(extend_dicts)

full_cmd_arguments = sys.argv
argument_list = full_cmd_arguments[1:]
#print(sys.argv)

short_options = "lhvc:"
long_options = ["list","help", "version", "column"]

input_file = 'CoronaTracker - Translation - Sheet1.csv'

try:
    data = pd.read_csv(input_file)
except FileNotFoundError:
    print(input_file + " not found")
    sys.exit(2)

arguments, values = getopt.getopt(argument_list, short_options, long_options)
for current_argument, current_value in arguments:
    if current_argument in ("-v", "--version"):
        print ("version 1.0")
        sys.exit(2)
    elif current_argument in ("-l", "--list"):
        print("1) --help : Show instructions on how to use this script")
        print("2) --version : Show version number")
        print("3) --column : Start extraction of language to user specified .js file")
        sys.exit(2)
    elif current_argument in ("-h", "--help"):
        print ("1) Put " + input_file + " which is exported from google sheets into same directory as this script")
        print ("2) Run it with the -c flag and 2 arguments. 1) Column id and 2) output filename")
        print ("3) Column index must be the column id. Example : a, g, k, f")
        print ("4) Output filename must have extension .js")
        print ("5) Example : python lang-generator.py -c g en.js")
        print ("6) This commands means extract language strings from column 'g' of " + input_file + " and save it into en.js")
        print ("7) We use ISO 639-1 standard for the filenames. For more info, refer to https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes")
        sys.exit(2)
    elif current_argument in ("-c", "--column"):
        #print (("Enabling special output mode (%s)") % (current_value))
        position = 1
        column = 1
        filename = "output.js"
        args = len(sys.argv) - 1
        if args == 3:
            try:
                column_id = sys.argv[2].lower()
                column = dicts[column_id]
                filename = sys.argv[3]
                print("Getting language text from column "+str(column_id)+" of exported "+input_file)
                # print("Starting to export language file to file "+filename)
            except:
                print ("Column id needs to be a character. Example : a, f, d, h")
                sys.exit(2)
        else:
            print ("You need put the column index of the language to extract and the file name to extract to. Example -c 4 output.js")
            sys.exit(2)

# if int(column) < 1:
#     print("Column value must be greater than 1")
#     sys.exit(2)
if filename.find(".js") == -1:
    print("Filename must have .js extension")
    sys.exit(2)


#################################################
# Export CoronaTracker-Translation into CSV and load it here.



# Select your language.
# 1: Bahasa, 2: 简体中文， ...
target_column = int(column)

translate_key = data.iloc[:,2]
translate_default_text = data.iloc[:,1]
translate_value = data.iloc[:,target_column]

# translated_language = str(translate_key[0]);
# print("Language :" + translated_language)
print("Input File :" + input_file)
print("Output File :" + filename)
#print("Extracting translation for " + translated_language +" from "+input_file+" to output file "+filename)

rows = len(translate_key) # Number of rows

# If you want to skip processing some rows,
# you can enter the row wrt. google spread sheet.
row_to_ignore = []
row_to_ignore = np.array(row_to_ignore) - 2 # Index offset adjustment

# Menu translation index
menu_final_index = 9
menu_final_index -= 1 # Index offset adjustment

f = open(filename, "w") # Output file

# Javascript export default structure
f.write('export default {\n')

# Menu translation
f.write('  "menu": {\n')

for i in range(menu_final_index+1):
    if(not(pd.isnull(translate_key[i])) and not(i in row_to_ignore)):
        f.write('    "{}": '.format(translate_key[i].strip()))

        if(not pd.isnull(translate_value[i])):
            f.write('"{}",\n'.format(translate_value[i].strip()))
        else:
            f.write('"{}",\n'.format(translate_default_text[i].strip()))

f.write('  },\n')

# Other translation
for i in range(menu_final_index+1, rows):
    if(not(pd.isnull(translate_key[i])) and not(i in row_to_ignore)):
        f.write('  "{}": '.format(translate_key[i].strip()))

        if(not pd.isnull(translate_value[i])):
            f.write('"{}",\n'.format(translate_value[i].strip()))
        else:
            f.write('"{}",\n'.format(translate_default_text[i].strip()))

f.write('};\n')
f.close()
# print("Translation of "+translated_language+" exported to "+filename+" file completed.")
print("Translation exported to "+filename+" file completed.")
print("Please transfer it over to the \\lang folder of the project.")
