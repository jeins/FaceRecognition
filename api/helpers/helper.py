import re

def validate_request(required_fields, request):
    is_valid = True
    for key in required_fields:
        if key not in request:
            is_valid = False
            break

    return is_valid

def camelcase_to_snakecase(text):
    text = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', text)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', text).lower()

def snakecase_to_camelcase(text):
    components = text.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])

def format_values_before_save(values):
    return ', '.join('"{0}"'.format(v) for v in values)