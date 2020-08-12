API-Backend
======

Install
-------

Create a virtualenv and activate it

    $ python3 -m venv venv
    $ . venv/bin/activate

Install project dependencies
    
    $ pip3 install -r api/requirements.txt

Run
---

    $ export FLASK_APP=api
    $ export FLASK_ENV=development
    $ flask run