from django.db import models
from django.db.models.aggregates import Count

from random import randint

from django.db.models.manager import BaseManager
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from uuid import uuid4

class UserManager(BaseUserManager):

    def create_user(
        self,
        username,
        email,
        password=None,
        first_name=None,
        last_name=None,
        **kwargs
    ):
        if username is None:
            raise TypeError('User must have a username')
        if email is None:
            raise TypeError('User must have an email')
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            id = uuid4(),
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        if password is None:
            raise TypeError('Superusers must have a password')
        if email is None:
            raise TypeError('Superusers must have an email')
        if username is None:
            raise TypeError('Superusers must have a username')
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(max_length=128, primary_key=True)
    username = models.CharField(max_length=128)
    email = models.CharField(max_length=128, unique=True)
    first_name = models.CharField(max_length=128, null=True)
    last_name = models.CharField(max_length=128, null=True)

    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    objects = UserManager()

    def __str__(self) -> str:
        return (
            f'{self.id} {self.username} {self.email} '
            f'{self.first_name} {self.last_name}'
        )


class UserCodeManager(models.Manager):
    def create_user_code(self, user_id, name, code):
        user_code = UserCode(
            id = uuid4(),
            user_id = user_id,
            name = name,
            code = code,
            score = randint(0, 5000)
        )
        user_code.save(using=self._db)
        return user_code


class UserCode(models.Model):
    id = models.UUIDField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    code = models.TextField()
    score = models.IntegerField()

    objects = UserCodeManager()

    def __str__(self) -> str:
        return f'{self.id} {self.user_id} {self.code} {self.score}'


class CardManager(models.Manager):
    def get(self, count: int):
        size = self.aggregate(count=Count('id'))['count']
        assert size >= count
        index_set = []
        result = []
        random_index = randint(0, size - 1)
        for _ in range(count):
            random_index = randint(0, size - 1)
            if random_index in index_set:
                continue
            index_set.append(random_index)
            result.append(self.all[random_index])
        return result


class CardInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    image_link = models.CharField(max_length=128)
    description = models.TextField()

    objects = models.Manager()
    random_objects = CardManager()

    def __str__(self) -> str:
        return f'{self.id} {self.image_link} {self.description}'
