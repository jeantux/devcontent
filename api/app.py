from db import channels
from flask import Flask
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def _index():
    return '''
            <h1> DevContent API </h1>
    '''

@app.route('/channels')
def _channels():
    return jsonify({ 'channels': channels })

app.run(port=3000, debug=False, use_reloader=True)
