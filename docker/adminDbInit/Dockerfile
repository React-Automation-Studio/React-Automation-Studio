FROM python:3.12.4


ADD ./adminDbInit adminDbInit
WORKDIR /adminDbInit

RUN pip install -r requirements.txt



ENTRYPOINT ["python"]

CMD ["-u","initDB.py"]

EXPOSE 27017
