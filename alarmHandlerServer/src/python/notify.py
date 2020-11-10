from pymongo import MongoClient
import os
import numpy as np
import re
from time import sleep
import subprocess
import _thread
from epics import PV
from datetime import datetime

def notifyEmail():
    pass


def disconnectNotifyPVs():
    print("Disconnecting notify PVs")


def setNotifyBuffer(notifyBuffer):
    for entry in notifyBuffer:
        print(entry)
