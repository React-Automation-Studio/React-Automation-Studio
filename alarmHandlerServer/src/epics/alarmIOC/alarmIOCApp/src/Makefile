TOP=../..

include $(TOP)/configure/CONFIG
#----------------------------------------
#  ADD MACRO DEFINITIONS BELOW HERE

# xxxRecord.h will be created from xxxRecord.dbd
DBDINC += xxxRecord

# Install xxxSupport.dbd into <top>/dbd
DBD += xxxSupport.dbd

# Build an IOC support library
LIBRARY_IOC += alarmIOCSupport

# Compile and add the code to the support library
alarmIOCSupport_SRCS += xxxRecord.c
alarmIOCSupport_SRCS += devXxxSoft.c

# Link locally-provided code into the support library,
# rather than directly into the IOC application.
# This is required for Windows DLL builds.
alarmIOCSupport_SRCS += dbSubExample.c
alarmIOCSupport_SRCS += alarmIOCHello.c
alarmIOCSupport_SRCS += initTrace.c

alarmIOCSupport_LIBS += $(EPICS_BASE_IOC_LIBS)


# Build the IOC application
PROD_IOC = alarmIOC

# alarmIOC.dbd will be created and installed
DBD += alarmIOC.dbd

# alarmIOC.dbd will include these files:
alarmIOC_DBD += base.dbd
alarmIOC_DBD += xxxSupport.dbd
alarmIOC_DBD += dbSubExample.dbd
alarmIOC_DBD += alarmIOCHello.dbd
alarmIOC_DBD += initTrace.dbd

# alarmIOC_registerRecordDeviceDriver.cpp derives from alarmIOC.dbd
alarmIOC_SRCS += alarmIOC_registerRecordDeviceDriver.cpp

# Build the main IOC entry point where needed
alarmIOC_SRCS_DEFAULT += alarmIOCMain.cpp
alarmIOC_SRCS_vxWorks += -nil-

# Link in the code from our support library
alarmIOC_LIBS += alarmIOCSupport

# To build SNL programs, SNCSEQ must be defined
# in the <top>/configure/RELEASE file
ifneq ($(SNCSEQ),)
    # Build sncExample into alarmIOCSupport
    sncExample_SNCFLAGS += +r
    alarmIOC_DBD += sncExample.dbd
    # A .stt sequence program is *not* pre-processed:
    alarmIOCSupport_SRCS += sncExample.stt
    alarmIOCSupport_LIBS += seq pv
    alarmIOC_LIBS += seq pv

    # Build sncProgram as a standalone program
    PROD_HOST += sncProgram
    sncProgram_SNCFLAGS += +m
    # A .st sequence program *is* pre-processed:
    sncProgram_SRCS += sncProgram.st
    sncProgram_LIBS += seq pv
    sncProgram_LIBS += $(EPICS_BASE_HOST_LIBS)
endif

# Finally link IOC to the EPICS Base libraries
alarmIOC_LIBS += $(EPICS_BASE_IOC_LIBS)

include $(TOP)/configure/RULES
#----------------------------------------
#  ADD EXTRA GNUMAKE RULES BELOW HERE

