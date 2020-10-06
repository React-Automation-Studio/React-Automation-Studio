import bcrypt

class AuthRequest:
    def __init__(self, email, password):
        self.email = email
        self.password = password

    def to_dict(self):
        return {
            'email': self.email,
            'password': self.password
        }


class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def to_dict(self):
        return {
            'username': self.username,
            'password': self.hash
        }


class Group:
    def __init__(self, usernames, rules):
        self.usernames = usernames if usernames is not None else '*'
        self.rules = rules if rules is not None else []

    def to_dict(self):
        return {
            'usernames': self.usernames,
            'rules': [rule.to_dict() for rule in self.rules]
        }


class Rule:
    def __init__(self, rule, read=False, write=False):
        self.rule = rule
        self.read = read
        self.write = write

    def to_dict(self):
        return {
            'rule': self.rule,
            'read': self.read,
            'write': self.write
        }
