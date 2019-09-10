import matplotlib.pyplot as plt
import numpy as np
import pandas
import sys
import operator
import os
from pathlib import Path

def remove(value, deletechars):
    for c in deletechars:
        value = value.replace(c,'')
    return value

def CheckEmptyCourse(course):
    if course.inherit != 0:
        return False
    if course.polymorphism != 0:
        return False
    if course.abstract != 0:
        return False
    if course.network != 0:
        return False
    if course.thread != 0:
        return False
    if course.string != 0:
        return False
    if course.exception != 0:
        return False
    if course.generics != 0:
        return False
    if course.synch != 0:
        return False
    if course.serial != 0:
        return False
    if course.collection != 0:
        return False
    if course.jdbc != 0:
        return False
    if course.servlet != 0:
        return False
    if course.jsp != 0:
        return False
    if course.spring != 0:
        return False
    if course.struts != 0:
        return False
    if course.jsf != 0:
        return False
    return True


class Course:
    def __init__(self, id, courseName, inherit, polymorphism, abstract, network, thread, string, exception, generics, synch, serial, collection, jdbc, servlet, jsp, spring, struts, jsf, total):
        self.id = id
        self.courseName = courseName
        self.inherit = inherit
        self.polymorphism = polymorphism
        self.abstract = abstract
        self.network = network
        self.thread = thread
        self.string = string
        self.exception = exception
        self.generics = generics
        self.synch = synch
        self.serial = serial
        self.collection = collection
        self.jdbc = jdbc
        self.servlet = servlet
        self.jsp = jsp
        self.spring = spring
        self.struts = struts
        self.jsf = jsf
        self.total = total

inputFile = sys.argv[1]

courses = []
df = pandas.read_csv(inputFile)

for index, row in df.iterrows():
    if row["courseId"] not in courses:
        courses.append(Course(row["courseId"], row["courseName"], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0))
    course = next((x for x in courses if row["courseId"] == x.id))
    if row["inherit"] == True:
        course.inherit += 1
        course.total += 1
    if row["polymorph"] == True:
        course.polymorphism += 1
        course.total += 1
    if row["abstract"] == True:
        course.abstract += 1
        course.total += 1
    if row["network"] == True:
        course.network += 1
        course.total += 1
    if row["thread"] == True:
        course.thread += 1
        course.total += 1
    if row["string"] == True:
        course.string += 1
        course.total += 1
    if row["except"] == True:
        course.exception += 1
        course.total += 1
    if row["generic"] == True:
        course.generics += 1
        course.total += 1
    if row["synch"] == True:
        course.synch += 1
        course.total += 1
    if row["serial"] == True:
        course.serial += 1
        course.total += 1
    if row["collect"] == True:
        course.collection += 1
        course.total += 1
    if row["jdbc"] == True:
        course.jdbc += 1
        course.total += 1
    if row["servlet"] == True:
        course.servlet += 1
        course.total += 1
    if row["jsp"] == True:
        course.jsp += 1
        course.total += 1
    if row["spring"] == True:
        course.spring += 1
        course.total += 1
    if row["strut"] == True:
        course.struts += 1
        course.total += 1
    if row["jsf"] == True:
        course.jsf += 1
        course.total += 1

try:
    print('Creating output folder...')
    os.makedirs('output')
except FileExistsError:
    print('Folder already exists.')
try:
    print('Create folder for courses with a significiant amount of clusters...')
    os.makedirs('output//significiant')
except FileExistsError:
    print('Folder already exists.')
try:
    print('Create folder for courses with an insignificiant amount of clusters...')
    os.makedirs('output//insignificiant')
except FileExistsError:
    print('Folder already exists.')
    
for course in courses:
    if CheckEmptyCourse(course) == False:
        height = [course.inherit, course.polymorphism, course.abstract, course.network,
            course.thread, course.string, course.exception, course.generics, course.synch,
		    course.serial, course.collection, course.jdbc, course.servlet, course.jsp,
		    course.spring, course.struts, course.jsf, course.total]
        y_pos = np.arange(len(height))

        tick_label = ['Inheritance', 'Polymorphism', 'Abstraction', 'Networking', 'Thread', 'String', 'Exception', 'Generics', 'Synch',
				'Serialization', 'Collection', 'JDBC', 'Servlet', 'JSP', 'Spring', 'Struts', 'JSF', 'Total']

        plt.bar(y_pos, height, alpha = 0.5, color = 'blue', align = 'edge')
        plt.xticks(y_pos, tick_label, rotation='vertical')
        plt.subplots_adjust(bottom=0.30)
        plt.xlabel('Keywords')
        plt.ylabel('Number of Clustered Comments')
        plt.title(course.courseName)

        output = course.courseName.replace(' ', '')
        output = remove(output, '\/:*?"<>|,') + ".png"
        if course.total <= 10:
            path = Path("output//insignificiant")
            path = path / output
            plt.savefig(path)
        else:
            path = Path("output//significiant")
            path = path / output
            plt.savefig(path)
        plt.close()