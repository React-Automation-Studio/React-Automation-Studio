import pymongo
import sys
import os
import configparser
import json
from time import sleep

path='savedConfig/'
sys.path.insert(0,path )
#######
##configs
usePvLabelsAsDescription=False
usePvUnits=True
##########
databaseName='testIOCSystems'
LOADSAVE_DATABASE=os.getenv('LOADSAVE_DATABASE')
replicaSet=str(os.getenv('LOADSAVE_DATABASE_REPLICA_SET_NAME'))
if (LOADSAVE_DATABASE is None) :
    print("Enviroment variable LOADSAVE_DATABASE is not defined, can't intialize: ",databaseName)
else:
    print("Enviroment variable LOADSAVE_DATABASE: ",LOADSAVE_DATABASE)
    print("Enviroment variable LOADSAVE_DATABASE_REPLICA_SET_NAME: ",replicaSet)
    myclient = pymongo.MongoClient("mongodb://"+str(LOADSAVE_DATABASE)+"/",replicaSet=replicaSet)
    # Wait for MongoClient to discover the whole replica set and identify MASTER!
    sleep(0.1)
    dbnames = myclient.list_database_names()
    if (databaseName in dbnames):
        print("LOADSAVE_DATABASE already intitialized, exiting")
    else:

        mydb = myclient[databaseName]



        folders = os.listdir('systems/')
        for folder in folders:
            print("###########")
            systemName=folder
            system={}
            system['name']=systemName
            system['keys']={}
            system['PVs']={}
            print("systemname: ",systemName)
            with open('systems/'+systemName+'/metadataConfig.json') as f:
                metadata = json.load(f)
                print("metadata",metadata)
            dict={}
            dict['metadata']=metadata
        
            with open('systems/'+systemName+'/process_variables.txt') as f:
                content = f.readlines()
                keys=[]

                for line in content:
                    line=line.replace("\n","")

                    key=line
                    newKey=line.replace(systemName+":","")
                    newKey=newKey.replace(systemName+"_RFM_","")
                    newKey=newKey.replace("_"," ")

                    newKey=newKey.replace(":"," ")
                    newKey=newKey.replace("."," ")
                    newKey=newKey.capitalize()
                    newKey=newKey.replace("Rf","RF")
                    newKey=newKey.replace("rf","RF")
                    newKey=newKey.replace("pid","PID")
                    newKey=newKey.replace("oroc","OROC")
                    newKey=newKey.replace("pa","PA")
                    newKey=newKey.replace("dbm","dBm")
                    newKey=newKey.replace("kp","Kp")
                    newKey=newKey.replace("ki","Ki")
                    newKey=newKey.replace("kd","Kd")
                    system['keys'][newKey]=newKey
                    system['PVs'][newKey]={}
                    system['PVs'][newKey]['pv']=str(line)
                    system['PVs'][newKey]['label']=newKey
                    system['PVs'][newKey]['usePvLabel']=usePvLabelsAsDescription
                    system['PVs'][newKey]['usePvUnits']=True
                    system['PVs'][newKey]['units']=""


                dict['process_variables']=system['PVs']
            mycol = mydb[systemName+'_PVs']
            x = mycol.insert_one(dict)     
        