# Use the official image as a parent image
FROM python:3

# Set the working directory
#WORKDIR /Users/mahale/Documents/Punam/MSC/Cloud Computing Applications/MP3/classify.py

ADD classify.py /

RUN pip install 'numpy==1.14.3'

RUN pip install 'torch==1.4.0'

RUN pip install 'torchvision==0.5.0'

ENV DATASET='mnist'

ENV TYPE='ff'

CMD [ "python", "./classify.py" ]

