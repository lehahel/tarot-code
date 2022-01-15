from importlib.metadata import requires
from tokenize import Token
from django.db.models import fields, manager
from rest_framework import serializers
from .models import *

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "username", "email", "first_name",
            "last_name", "is_active",
        ]
        read_only_field = ['is_active']


class UserCodeSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(write_only=True, required=False)
    score = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = UserCode
        fields = ["id", "user_id", "name", "code", "score"]

    def create(self, validated_data):
        print(validated_data)
        user_code = UserCode.objects.create_user_code(**validated_data)
        return user_code


class RatingTableObjectSerializer(serializers.ModelSerializer):
    # user = UserSerializer(many=True)
    user_id = serializers.SlugRelatedField(
        # queryset=UserCode.objects.all(),
        read_only=True,
        slug_field='username',
    )
    class Meta:
        model = UserCode
        fields = ['id', 'name', 'score', 'user_id']


class CardInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardInfo
        fields = ["id", "image_link", "description"]


class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data

class RegisterSerializer(UserSerializer):
    password = serializers.CharField(
        max_length=128, write_only=True, required=True
    )
    email = serializers.CharField(
        max_length=128, write_only=True, required=True
    )
    id = serializers.UUIDField(
        write_only=True, required=False
    )

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password',
            'is_active', 'first_name', 'last_name'
        ]

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user
