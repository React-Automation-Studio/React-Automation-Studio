FROM python:3.9.1

ADD ./alarmHandlerDbInit alarmHandlerDbInit
WORKDIR /alarmHandlerDbInit

RUN pip install -r requirements.txt

CMD ["python","main.py"]