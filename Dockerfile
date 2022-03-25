# syntax=docker/dockerfile:1
FROM python:3.6
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip3 install requests
RUN pip install -r requirements.txt
COPY . /code/

