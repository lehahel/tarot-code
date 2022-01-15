from django.core.checks.messages import Error
from django.db import models
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.serializers import Serializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import filters
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework.pagination import LimitOffsetPagination

from datetime import date

from .models import *
from .serializers import *


def get_cards_by_birth_date(birth_date):
    return CardInfo.random_objects.get(2)


def test_code(code: str, language: str, birth_date: date):
    result = get_cards_by_birth_date(birth_date)    # Not used yet
    return CardInfo.random_objects.get(3)


def get_user_rating(request):
    return HttpResponse('<h1>Hello!</h1>')


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['username']
    ordering = ['username']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]
        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)
        return obj


class UserCodeViewSet(viewsets.ModelViewSet):
    serializer_class = UserCodeSerializer
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user_code = serializer.save()
        return Response({
            "user_code": serializer.data,
        }, status=status.HTTP_201_CREATED)


class CardApiView(generics.RetrieveAPIView, mixins.RetrieveModelMixin):
    queryset = CardInfo.objects.all()
    serializer_class = CardInfoSerializer
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class UserCodePagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 1000


class TopCodesList(generics.ListAPIView):
    queryset = UserCode.objects.order_by('-score').filter().select_related('user_id')
    print(queryset.query)
    serializer_class = RatingTableObjectSerializer
    pagination_class = UserCodePagination
