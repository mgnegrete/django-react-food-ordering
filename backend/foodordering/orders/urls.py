from django.urls import path
from .views import ActiveDropView, PreOrderCreateView, kitchen_display

urlpatterns = [
    path('drops/active/', ActiveDropView.as_view(), name='active-drop'),
    path('orders/', PreOrderCreateView.as_view(), name='preorder-create'),
    path('kitchen/<str:secret>/', kitchen_display, name='kitchen-display'),
]
