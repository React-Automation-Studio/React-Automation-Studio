FROM python:3.8.7

ADD ./alarmHandlerDbInit alarmHandlerDbInit
WORKDIR /alarmHandlerDbInit

RUN pip install -r requirements.txt

CMD ["python","main.py"]