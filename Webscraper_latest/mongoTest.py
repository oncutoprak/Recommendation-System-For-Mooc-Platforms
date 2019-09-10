from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
from urllib.parse import quote_plus
client = MongoClient(port=27017)
db=client.pathwaydb

#User login, implement this to login screen in webscraper.py later
username = input("Username: ")
pprint(username)
password = input("Password: ")
pprint(password)
if (db.users.find({"username": username, "password": password}).count() == 0):
    print("Access denied")
else:
    print("Hello " + username)
