import flask

server = flask.Flask(__name__)

@server.route('/')
def index():
    return 'Hello Flask app'


