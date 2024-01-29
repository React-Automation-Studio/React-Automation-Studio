FROM python:3.12.1
# Install python dependencies
WORKDIR /usr/src/app

COPY mongoSetup/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY mongoSetup/*.py ./
CMD ["python","main.py"]