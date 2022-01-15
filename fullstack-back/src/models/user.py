from uuid import uuid4
import typing

from sqlalchemy import Column, Text, sql, table, insert
import sqlalchemy
from sqlalchemy.orm import Session


USER_DB = table('user') # TODO: place to config


class User:
    __tablename__ = 'user'

    id = Column(Text, nullable=False, primary_key=True)
    first_name = Column(Text, nullable=False)
    last_name = Column(Text, nullable=False)
    login = Column(Text, nullable=False)
    email = Column(Text, nullable=False)


def create_user(
    id: str,
    first_name: str,
    last_name: str,
    login: str,
    email: str,
    session: Session
):
    query = insert(USER_DB).values(
        id=id,
        first_name=first_name,
        last_name=last_name,
        login=login,
        email=email,
    )
    print(query)
#     session.execute(query)

create_user('a', 'b', 'c', 'd', 'e', Session())