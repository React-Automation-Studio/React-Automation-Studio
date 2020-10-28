#!../../bin/linux-x86_64/alarmIOC

## You may have to change alarmIOC to something else
## everywhere it appears in this file

< envPaths
# epicsEnvSet EPICS_CA_SERVER_PORT 8001
cd "${TOP}"

## Register all support components
dbLoadDatabase "dbd/alarmIOC.dbd"
alarmIOC_registerRecordDeviceDriver pdbbase

## Load record instances
dbLoadTemplate "db/Alarms.substitutions"
dbLoadTemplate "db/Areas.substitutions"
dbLoadRecords "db/Global.db"

## Set this to see messages from mySub
#var mySubDebug 1

## Run this to trace the stages of iocInit
#traceIocInit

cd "${TOP}/iocBoot/${IOC}"
iocInit

## Start any sequence programs
#seq sncExample, "user=j254"
