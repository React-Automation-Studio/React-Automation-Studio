FROM python:3.12.1

ADD ./alarmHandlerDbInit alarmHandlerDbInit
WORKDIR /alarmHandlerDbInit

RUN pip install -r requirements.txt

CMD ["python","main.py"]