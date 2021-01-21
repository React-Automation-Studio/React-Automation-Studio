FROM python:3.9.1
VOLUME /users


ADD ./administrator/requirements.txt /requirements.txt

RUN pip install -r requirements.txt
ADD ./administrator/scripts /scripts
ENV PATH="/scripts/:${PATH}"



WORKDIR /administrator/


ENTRYPOINT ["/bin/bash"]
