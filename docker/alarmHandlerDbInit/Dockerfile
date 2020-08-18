FROM python:3.7.5

ADD ./alarmHandlerDbInit alarmHandlerDbInit
WORKDIR /alarmHandlerDbInit

RUN pip install -r requirements.txt

CMD ["python","main.py"]