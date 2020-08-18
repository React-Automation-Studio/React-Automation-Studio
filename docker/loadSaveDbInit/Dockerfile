FROM python:3.7.5


ADD ./loadSaveDbInit loadSaveDbInit
WORKDIR /loadSaveDbInit

RUN pip install -r requirements.txt



ENTRYPOINT ["python"]

CMD ["-u","initDB.py"]

EXPOSE 27017
