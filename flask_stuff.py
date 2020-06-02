import flask

server = flask.Flask(__name__)

@server.route('/')
def index():
    return 'Hello Flask app'

@server.route('/test')
def test():
    return '''Hello Flask app'''


