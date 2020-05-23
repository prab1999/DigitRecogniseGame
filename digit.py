from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.models import load_model
import cv2
from PIL import Image
import tensorflow as tf
graph = tf.get_default_graph()

# load and prepare the image
def load_image(img):
    # convert to array
    target_size=(28, 28)
    if img.size != target_size:
        img = img.resize(target_size, Image.LANCZOS)
    
    img = img_to_array(img)
    
    # reshape into a single sample with 1 channel
    img = img.reshape(1, 28, 28, 1)
    # prepare pixel data
    img = img.astype('float32')
    img = img / 255.0
    return img

model = load_model('model/final_model.h5')

def predict_digit(img):
    img=load_image(img)   
    with graph.as_default():
     return model.predict_classes(img)
    

