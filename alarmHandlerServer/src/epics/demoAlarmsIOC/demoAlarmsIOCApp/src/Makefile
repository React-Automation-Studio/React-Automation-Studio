TOP=../..

include $(TOP)/configure/CONFIG
#----------------------------------------
#  ADD MACRO DEFINITIONS BELOW HERE

# xxxRecord.h will be created from xxxRecord.dbd
DBDINC += xxxRecord

# Install xxxSupport.dbd into <top>/dbd
DBD += xxxSupport.dbd

# Build an IOC support library
LIBRARY_IOC += demoAlarmsIOCSupport

# Compile and add the code to the support library
demoAlarmsIOCSupport_SRCS += xxxRecord.c
demoAlarmsIOCSupport_SRCS += devXxxSoft.c

# Link locally-provided code into the support library,
# rather than directly into the IOC application.
# This is required for Windows DLL builds.
demoAlarmsIOCSupport_SRCS += dbSubExample.c
demoAlarmsIOCSupport_SRCS += demoAlarmsIOCHello.c
demoAlarmsIOCSupport_SRCS += initTrace.c

demoAlarmsIOCSupport_LIBS += $(EPICS_BASE_IOC_LIBS)


# Build the IOC application
PROD_IOC = demoAlarmsIOC

# demoAlarmsIOC.dbd will be created and installed
DBD += demoAlarmsIOC.dbd

# demoAlarmsIOC.dbd will include these files:
demoAlarmsIOC_DBD += base.dbd
demoAlarmsIOC_DBD += xxxSupport.dbd
demoAlarmsIOC_DBD += dbSubExample.dbd
demoAlarmsIOC_DBD += demoAlarmsIOCHello.dbd
demoAlarmsIOC_DBD += initTrace.dbd

# demoAlarmsIOC_registerRecordDeviceDriver.cpp derives from demoAlarmsIOC.dbd
demoAlarmsIOC_SRCS += demoAlarmsIOC_registerRecordDeviceDriver.cpp

# Build the main IOC entry point where needed
demoAlarmsIOC_SRCS_DEFAULT += demoAlarmsIOCMain.cpp
demoAlarmsIOC_SRCS_vxWorks += -nil-

# Link in the code from our support library
demoAlarmsIOC_LIBS += demoAlarmsIOCSupport

# To build SNL programs, SNCSEQ must be defined
# in the <top>/configure/RELEASE file
ifneq ($(SNCSEQ),)
    # Build sncExample into demoAlarmsIOCSupport
    sncExample_SNCFLAGS += +r
    demoAlarmsIOC_DBD += sncExample.dbd
    # A .stt sequence program is *not* pre-processed:
    demoAlarmsIOCSupport_SRCS += sncExample.stt
    demoAlarmsIOCSupport_LIBS += seq pv
    demoAlarmsIOC_LIBS += seq pv

    # Build sncProgram as a standalone program
    PROD_HOST += sncProgram
    sncProgram_SNCFLAGS += +m
    # A .st sequence program *is* pre-processed:
    sncProgram_SRCS += sncProgram.st
    sncProgram_LIBS += seq pv
    sncProgram_LIBS += $(EPICS_BASE_HOST_LIBS)
endif

# Finally link IOC to the EPICS Base libraries
demoAlarmsIOC_LIBS += $(EPICS_BASE_IOC_LIBS)

include $(TOP)/configure/RULES
#----------------------------------------
#  ADD EXTRA GNUMAKE RULES BELOW HERE

