from django.urls import path
from .views import *

urlpatterns = [
    path("get_card/<int:id>", CardApiView.as_view()),
    path("top_codes/", TopCodesList.as_view()),
    path("code/create/", UserCodeViewSet.as_view({'post': 'create'}))
]