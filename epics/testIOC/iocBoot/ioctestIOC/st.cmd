#!../../bin/linux-x86_64/testIOC

## You may have to change testIOC to something else
## everywhere it appears in this file

< envPaths
epicsEnvSet EPICS_CA_SERVER_PORT 8001
cd "${TOP}"

## Register all support components
dbLoadDatabase "dbd/testIOC.dbd"
testIOC_registerRecordDeviceDriver pdbbase

## Load record instances
dbLoadRecords "db/test.db", "device=testIOC"
dbLoadRecords "db/system.db", "device=testIOC"
dbLoadRecords "db/dynamicPvFieldTest.db", "device=testIOC"
dbLoadRecords "db/PowerSupply.db", "device=testIOC:PS1"
dbLoadRecords "db/PowerSupply.db", "device=testIOC:PS2"
dbLoadRecords "db/PowerSupply.db", "device=testIOC:PS3"
dbLoadRecords "db/PowerSupply.db", "device=testIOC:PS4"
dbLoadRecords "db/PowerSupply.db", "device=testIOC:STR1:X"
dbLoadRecords "db/PowerSupply.db", "device=testIOC:STR1:Y"
dbLoadRecords "db/PowerSupply.db", "device=testIOC:STR2:X"
dbLoadRecords "db/PowerSupply.db", "device=testIOC:STR2:Y"
dbLoadRecords "db/PowerSupply.db", "device=testIOC:STR3:Y"
dbLoadRecords "db/PowerSupply.db", "device=testIOC:STR4:X"

dbLoadRecords "db/SlitSim.db", "device=testIOC:SLITXY1:X"
dbLoadRecords "db/SlitSim.db", "device=testIOC:SLITXY1:Y"
dbLoadRecords "db/SlitSim.db", "device=testIOC:SLITXY2:X"
dbLoadRecords "db/SlitSim.db", "device=testIOC:SLITXY2:Y"
dbLoadRecords "db/SlitSim.db", "device=testIOC:SLITXY3:X"
dbLoadRecords "db/SlitSim.db", "device=testIOC:SLITXY3:Y"


dbLoadRecords "db/Harp.db", "device=testIOC:Harp1old"
dbLoadRecords "db/HarpSim.db", "device=testIOC:Harp1, axis=x, desc=Harp 1"
dbLoadRecords "db/HarpSim.db", "device=testIOC:Harp1, axis=y, desc=Harp 1"
dbLoadRecords "db/HarpSim.db", "device=testIOC:Harp2, axis=x, desc=Harp 2"
dbLoadRecords "db/HarpSim.db", "device=testIOC:Harp2, axis=y, desc=Harp 2"
dbLoadRecords "db/HarpSim.db", "device=testIOC:Harp3, axis=x, desc=Harp 3"
dbLoadRecords "db/HarpSim.db", "device=testIOC:Harp3, axis=y, desc=Harp 3"
dbLoadRecords "db/HarpSim.db", "device=testIOC:Harp4, axis=x, desc=Harp 4"
dbLoadRecords "db/HarpSim.db", "device=testIOC:Harp4, axis=y, desc=Harp 4"

dbLoadRecords "db/Harp.db", "device=testIOC:Harp2old"
dbLoadRecords "db/Harp.db", "device=testIOC:Harp3old"
dbLoadRecords "db/FC.db", "device=testIOC:FC1"
dbLoadRecords "db/FC.db", "device=testIOC:FC2"
dbLoadRecords "db/FC.db", "device=testIOC:FC3"
dbLoadRecords "db/FC.db", "device=testIOC:FC4"
dbLoadRecords "db/Beamline.db", "device=testIOC:BeamlineA"
dbLoadRecords "db/Beamline.db", "device=testIOC:BeamlineB"
dbLoadRecords "db/Beamline.db", "device=testIOC:BeamlineC"
dbLoadRecords "db/Beamline.db", "device=testIOC:BeamlineD"
dbLoadRecords "db/Beamline.db", "device=testIOC:BeamlineE"
dbLoadRecords "db/BeamPosition.db", "device=testIOC"
dbLoadRecords "db/3DExperiments.db", "device=testIOC:Cube1"
dbLoadRecords "db/ithembaFCSim.db", "fcup=testIOC:FC1sim, desc=FC1sim"
dbLoadRecords "db/ithembaFCSim.db", "fcup=testIOC:FC2sim, desc=FC2sim"
dbLoadRecords "db/ithembaFCSim.db", "fcup=testIOC:FC3sim, desc=FC3sim"
dbLoadRecords "db/ithembaFCSim.db", "fcup=testIOC:FC4sim, desc=FC4sim"
dbLoadRecords "db/demoMultipleTextUpdates.db", "device=testIOC"

dbLoadRecords "db/BeamSweepSim.db", "device=testIOC:BeamSweepSim"

dbLoadRecords "db/demoAlarms.db", "device=demoAlarmsIOC"


## Set this to see messages from mySub
#var mySubDebug 1

## Run this to trace the stages of iocInit
#traceIocInit

cd "${TOP}/iocBoot/${IOC}"
iocInit
dbpf testIOC:Harp1:put-outIn 1
dbpf testIOC:Harp2:put-outIn 1
dbpf testIOC:FC1sim:put-outIn 1
dbpf testIOC:BeamlineA:BeamOn 1

## Start any sequence programs
#seq sncExample, "user=william"
