import random

from sequences import get_next_value

from .models import User





def get_unique_username(name: str) -> str:
    _name = "".join(name.split(' '))
    username =  str(_name) + str(get_next_value('sequential_user'))
    print('unique username: ', username)
    return username




def get_username(name):
    username = "".join(name.split(' ')).lower()
    if not User.objects.filter(username=username).exists():
        return username
    else:
        random_username = username + str(random.randint(0, 1000))
        return get_unique_username(random_username)
