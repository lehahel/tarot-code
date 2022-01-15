from sqlalchemy import Table, Column, Integer, String, MetaData, Sequence
from sqlalchemy.schema import CreateSchema
from postgresql.utils.engine import get_pg_engine

SCHEMA_NAME = 'TarotCode'

if __name__ == '__main__':
    engine = get_pg_engine()
    engine.execute(CreateSchema(SCHEMA_NAME))

    meta = MetaData(schema=SCHEMA_NAME)

    Table(
        'User',
        meta,
        Column('id', String, primary_key=True),
        Column('first_name', String),
        Column('last_name', String),
        Column('login', String),
        Column('email', String),
    )

    # More tables ?

    meta.create_all(engine)
