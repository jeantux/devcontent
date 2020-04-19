# from db import channels
from config_pg import config
from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
cors = CORS(app)

conn = psycopg2.connect(
    host=config['host'],
    database=config['database'],
    user=config['user'],
    password=config['password'],
    port=config['port']
)

@app.route('/')
def _index():
    return '''
            <h1> DevContent API </h1>
            <h2> Seja muito bem vindo </h2>
    '''

@app.route('/channels')
def _channels():
    cur = conn.cursor()

    textsearch = request.args.get('filter')
    username = request.args.get('username')
    where = ''

    if (textsearch != '' and textsearch != None):
        where = """
            and (upper(c."name") like upper('%{textsearch}%')
             or  upper(c."desc") like upper('%{textsearch}%')
             or  upper(c.urlyoutube) like upper('%{textsearch}%')
             or  upper(c.usernamegit) like upper('%{textsearch}%')
             or  upper(c.tags) like upper('%{textsearch}%')
            )
        """.format(textsearch=textsearch)

    if (username != '' and username != None and where == ''):
        where = f" and c.usernamegit = '{username}'"

    cur.execute(""" select c."name",
                           c."desc",
                           c.urlyoutube,
                           c.usernamegit,
                           c.img,
                           c.tags,
                           t.name as type
                      from channels c
                      left join "types" t on (c.id_types = t.id)
                      where 1 = 1
                """ + where)

    columns = (
        "name", "desc", "urlyoutube", "usernamegit", "img", "tags", "type"
    )

    rows = cur.fetchall()
    channels = []

    for row in rows:
        channels.append(dict(zip(columns, row)))
    
    return jsonify({ 'channels': channels })

    conn.close()

@app.route('/topchannel')
def _topchannel():
    cur = conn.cursor()

    cur.execute(""" select c."name",
                           c."desc",
                           c.urlyoutube,
                           c.usernamegit,
                           c.img,
                           c.tags,
                           t.name as type
                      from channels c
                      left join "types" t on (c.id_types = t.id)
                      where c.id = 5
                """)

    columns = (
        "name", "desc", "urlyoutube", "usernamegit", "img", "tags", "type"
    )

    rows = cur.fetchall()
    channels = []

    for row in rows:
        channels.append(dict(zip(columns, row)))
    
    return jsonify({ 'channel': channels[0] })

    conn.close()

app.run(port=5000, use_reloader=True)
