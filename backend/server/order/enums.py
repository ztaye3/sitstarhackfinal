from enum import Enum
from enumchoicefield import ChoiceEnum, EnumChoiceField

from django.utils.translation import ugettext_lazy as _


# Order status Enum
class OrderStatusEnum(ChoiceEnum):
    DELIVERED = 'DELIVERED'
    PAYMENT_SUCCESSFUL = 'PAYMENT_SUCCESSFUL'
    FAILED = 'FAILED'
    UNKNOWN = "UNKNOWN"



