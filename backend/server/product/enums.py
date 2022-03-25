from enum import Enum
from enumchoicefield import ChoiceEnum, EnumChoiceField

from django.utils.translation import ugettext_lazy as _


# Product status Enum
class ProductTypeEnum(ChoiceEnum):
    HABESHA_CLOTH = 'HABESHA_CLOTH'
    HABESHA_INGREDIENT = 'HABESHA_INGREDIENT'
    DETERGENT = 'DETERGENT'
    SOFT_DRINK = 'SOFT_DRINK'
    UNKNOWN = "UNKNOWN"


# Product status Enum
class ProductStatusEnum(ChoiceEnum):
    AVAILABLE = 'AVAILABLE'
    NOT_AVAILABLE = 'NOT_AVAILABLE'


# Product Unit Enum
class ProductUnitEnum(ChoiceEnum):
    LITTER = 'LITTER'
    KILOGRAM = 'KILOGRAM'
    QUANTITY = 'QUANTITY'
