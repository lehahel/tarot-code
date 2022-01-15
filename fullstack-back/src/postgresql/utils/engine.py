from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, Sequence
from sqlalchemy.schema import CreateSchema

def get_pg_engine():
    return create_engine(
        'postgresql+psycopg2://postgres:bubaboba@localhost/postgres',
        pool_pre_ping=True,
        connect_args={'options': '-csearch_path=TarotCode'}
    )

def pg_connection(func):
    def wrapper(*args, **kwargs):
        conn = get_pg_engine().connect()
        query = func(*args, **kwargs)
        return conn.execute(query)
    return wrapper

def get_table(name: str):
    meta = MetaData()
    meta.reflect(get_pg_engine())
    return meta.tables[name]
