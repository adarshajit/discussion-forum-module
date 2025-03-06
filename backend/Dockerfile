# Use official Python image
FROM python:3.11

WORKDIR /app

# Install dependencies
COPY requirements.txt /app/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ENV DJANGO_ENV=local
