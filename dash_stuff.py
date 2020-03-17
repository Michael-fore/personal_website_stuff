import dash
from PIL import Image  
import PIL  
from dash_canvas import DashCanvas
from dash.exceptions import PreventUpdate
from dash.dependencies import Input, Output, State
from dash_canvas.utils import array_to_data_url, parse_jsonstring
import dash_core_components as dcc
import dash_html_components as html
from flask_stuff import server
from ml import google_classify
import base64
from io import BytesIO
from css import *
import datetime as dt
import io, re

app = dash.Dash(
    __name__,
    server=server,
   
    routes_pathname_prefix='/images/'
)

app.layout = html.Div([
    
    html.Div(id='output-data-upload', style = {'display':'none'}),

    html.Div([DashCanvas(id='canvas_image',
               tool='line',
               lineWidth=5,
               lineColor='red'),
    html.Button(id='classify-button'),

    dcc.Loading(html.Div(id='classification'))]),

    dcc.Upload(id='upload',
                children=html.Div([
                'Drag and Drop or ',
                html.A('Select Files')
        ]),
        style=upload_style)
    ])
@app.callback([Output('output-data-upload','children'),
               Output('canvas_image','image_content')],
            [Input('upload','contents')],
            [State('upload', 'filename')])
def save_image(image, filename):
    prevent_update(image)

    write_to_file(image,filename)

    print(filename)
    return html.Div([
        html.Img(src=image, style=image_style)],
        style = {'width':'350px',
                 'height':'350px'}), image

@app.callback(Output('classification','children'),
                [Input('canvas_image','image_content')])
def classify(data):
    prevent_update(data)
    convert_base46(data)
    return str(google_classify(convert_base46(data)))





def write_to_file(image, filename):
    path = 'imgs/' + str(dt.datetime.now()) + filename 

    img = convert_base46(image)
 
    img.save(path)

    

def convert_base46(image):
    byte_data = base64.b64decode(re.sub('^data:image/.+;base64,', '', image))
    return Image.open(BytesIO(byte_data))

def prevent_update(input):
    if input == None:
        raise PreventUpdate

    else: pass
   
