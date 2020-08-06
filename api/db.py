import pymysql
from flaskext.mysql import MySQL

from api import config
from api.helpers import helper

mysql = MySQL()

def init_db(app):
    app.config['MYSQL_DATABASE_HOST'] = config.DB_HOST
    app.config['MYSQL_DATABASE_USER'] = config.DB_USER
    app.config['MYSQL_DATABASE_PASSWORD'] = config.DB_PASS
    app.config['MYSQL_DATABASE_DB'] = config.DB_NAME

    mysql.init_app(app)

def db_select(query):
    results = []
    conn = None
    cur = None

    try:
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute(query)
        rows = cur.fetchall()
        results = rows
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()

    return results

def db_insert(table, new_data, conditions = ''):
    conn = None
    cur = None
    result = False

    try:
        conn = mysql.connect()
        cur = conn.cursor()

        fields = ','.join(list(new_data.keys()))
        values = helper.format_values_before_save(new_data.values())
        query = "INSERT INTO " + table + " (" + fields + ") VALUES (" + values + ") " + conditions

        result = cur.execute(query)
        conn.commit()
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()
    
    return result