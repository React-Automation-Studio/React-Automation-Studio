#!../../bin/linux-x86_64/demoAlarmsIOC

## You may have to change demoAlarmsIOC to something else
## everywhere it appears in this file

< envPaths

cd "${TOP}"

## Register all support components
dbLoadDatabase "dbd/demoAlarmsIOC.dbd"
demoAlarmsIOC_registerRecordDeviceDriver pdbbase

## Load record instances
dbLoadRecords "db/demoAlarms.db"

## Set this to see messages from mySub
#var mySubDebug 1

## Run this to trace the stages of iocInit
#traceIocInit

cd "${TOP}/iocBoot/${IOC}"
iocInit

## Start any sequence programs
#seq sncExample, "user=j254"
