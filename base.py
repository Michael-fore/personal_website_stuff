
from flask import Flask, request, render_template
from flask_cors import CORS
import base64
from PIL import Image
from io import BytesIO
from ml import google_classify

server = Flask(__name__,
                template_folder='./react-front/public')

cors = CORS(server, resources={r"/*": {"origins": "*"}})

@server.after_request
def add_headers(resp):
    #resp.headers['Access-Control-Allow-Origin'] = '*'
    #resp.headers['Access-Control-Allow-Headers'] = '*'
    return resp

@server.route('/')
def index():
    return render_template('index.html')

@server.route('/test')
def test():
    return '''Hello Flask app'''


@server.route('/analyze', methods = ['POST'])
def recieve():
    
    data = request.get_json()
    image = data['image'].rsplit(',')[1]
    print(type(image))
    
    with open('text.png','wb') as f:
        f.write(base64.b64decode(bytes(image+'=','utf-8')))

    image = Image.open(BytesIO(base64.b64decode(bytes(image+'=','utf-8')))).convert('RGB')
    
    classification = google_classify(image)
    print(type(classification))
    categories = list(classification['Category'].values)
    confidence = classification['Confidence Prediction'].values.tolist()
    image.save('test.png')

    return {'message':'success',
            'status':200,
            'categories' : categories,
            'confidence':confidence}

# route to recieve and classify image
# react canvas recieves image and alters in client, on classify sends to server
# server classifyies and returns relevant data
