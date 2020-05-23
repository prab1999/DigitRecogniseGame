from flask import Flask,render_template,request
import logging
import cv2
from PIL import Image
import base64
from io import BytesIO
import numpy as np
import digit
import pickle
import cv2
app=Flask(__name__)


@app.route("/")
def hello():
    return render_template('main.html')

@app.route("/test",methods=['GET', 'POST'])
def test():
    print("Image recieved")
    data_url = request.values['imageBase64']
    
   
    data_url=data_url.replace('data:image/png;base64,','')
    # Decoding base64 string to bytes object
    img_bytes = base64.b64decode(data_url)
    img = Image.open(BytesIO(img_bytes))
    img=img.convert("L")
    return str(digit.predict_digit(img)[0])
    

if __name__=='__main__':
    app.run()