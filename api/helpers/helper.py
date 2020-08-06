import re

def validate_request(required_fields, request):
    is_valid = True
    for key in required_fields:
        if key not in request:
            is_valid = False
            break

    return is_valid

def camelcase_to_snakecase(request_fields):
    request_fields = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', request_fields)

    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', request_fields).lower()

def format_values_before_save(values):
    return ', '.join('"{0}"'.format(v) for v in values)