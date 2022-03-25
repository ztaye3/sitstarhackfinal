# docker/backend/Dockerfile

# Lightweight linux  distribution for fast build
FROM python:3.6
ENV PYTHONUNBUFFERED=1

# Create code directory and copy req. deocument
WORKDIR /code
ADD ./backend/requirements.txt /code/backend/

# Install necessary packages
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

# Copy backend source code at the end of build for increasing performance
ADD ./docker /code/docker
ADD ./backend /code/backend