import dash
from PIL import Image  
import PIL  
from dash.exceptions import PreventUpdate
from dash.dependencies import Input, Output, State
import dash_core_components as dcc
import dash_html_components as html
from flask_stuff import server
from ml import google_classify
import base64
from io import BytesIO
from css import *

app = dash.Dash(
    __name__,
    server=server,
   
    routes_pathname_prefix='/images/'
)

app.layout = html.Div([
    
    html.Div(id='output-data-upload'),
    dcc.Upload(id='upload',
                children=html.Div([
                'Drag and Drop or ',
                html.A('Select Files')
        ]),
        style=upload_style)
        ]
)
@app.callback(Output('output-data-upload','children'),
            [Input('upload','contents')],
            [State('upload', 'filename')])
def save_image(image, filename):
    if image == None:
        raise PreventUpdate

    #xprint(base64.b64decode(image))
    decoded = base64.b64decode(image)
    #classify = google_classify(image)
    print(filename)
    return html.Div([
        html.Img(src=image, style=image_style)])