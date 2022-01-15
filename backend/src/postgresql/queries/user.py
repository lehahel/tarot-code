from postgresql.utils.engine import get_pg_engine, pg_connection, get_table

from uuid import uuid4

@pg_connection
def create_user(login: str, email: str, first_name: str, last_name: str):
    user = get_table('User')
    user.insert().values(
        user,
        id=uuid4(),
        login=login,
        email=email,
        first_name=first_name,
        last_name=last_name,
    )
