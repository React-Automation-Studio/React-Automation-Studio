from pvServer_test_case import PvServerTestCase
import unittest
import authenticate
import time
import bcrypt
from auth_structs import *


class TestAuthenticate(PvServerTestCase):
    @staticmethod
    def del_auth_attr(name):
        if hasattr(authenticate, name):
            delattr(authenticate, name)

    @classmethod
    def setUpClass(cls):
        cls.DEFAULT_USERS = [
            User('john.doe@somewhere.else', 'johndoe'),
            User('jane.doe@somewhere.else', 'janedoe'),
            User('joe.q.public@somewhere.else', 'joeqpublic')
        ]

        cls.DEFAULT_GROUPS = {
        }

    def setUp(self):
        super().setUp()
        authenticate.SECRET_PWD_KEY = '1234567890'
        self.enable_login()

    def disable_login(self):
        authenticate.REACT_APP_DisableLogin = False
        self.del_auth_attr('users')
        self.del_auth_attr('access')
        self.del_auth_attr('UAGS')
        self.del_auth_attr('knownUsers')

    def enable_login(self, users=None, user_groups=None, timestamp=None):
        timestamp = str(timestamp if timestamp is not None else int(time.time()))
        if users is None:
            users = [u.to_dict() for u in self.DEFAULT_USERS]

        authenticate.REACT_APP_DisableLogin = True
        authenticate.users = {
            'users': users,
            'timestamp': timestamp
        }
        authenticate.access = {
            'userGroups': user_groups if user_groups is not None else self.DEFAULT_GROUPS,
            'timestamp': timestamp
        }
        authenticate.UAGS = {
            'users': authenticate.users['users'],
            'userGroups': authenticate.access['userGroups'],
            'timestamp': '{}{}'.format(authenticate.users['timestamp'], authenticate.access['timestamp'])
        }
        authenticate.knownUsers = authenticate.createJTWUserIDs(authenticate.UAGS)

    def auth_user(self, username):
        for user in self.DEFAULT_USERS:
            if user.username == username:
                record = authenticate.AuthenticateUser(
                    AuthRequest(
                        email=user.username,
                        password=user.password).to_dict())
                return record['JWT']
        self.fail(f'User "{username}" not found.')

    def test_AuthenticateUser__reject_unknown_username(self):
        emails = [
            'johndone@unknown.place.on.earth',
            '@unknown',
            'johndoe',
            'johndoe@',
            'johndoe@unknown@a',
            'johndoe@....',
            ''
        ]
        for email in emails:
            self.assertIsNone(authenticate.AuthenticateUser(
                AuthRequest(email=email, password='johndoe').to_dict()))

    def test_AuthenticateUser__reject_wrong_password(self):
        record = authenticate.AuthenticateUser(
            AuthRequest(
                email='john.doe@somewhere.else',
                password='otherjohndoe').to_dict())
        self.assertIsNone(record)

    def test_AuthenticateUser__accept_known_user(self):
        record = authenticate.AuthenticateUser(
            AuthRequest(
                email='john.doe@somewhere.else',
                password='johndoe').to_dict())
        self.assertEqual('john.doe@somewhere.else', record.get('username', None))
        self.assertEqual([], record.get('roles', None))
        self.assertIsNotNone(record.get('JWT', None))

    def test_AutheriseUserAndPermissions__match_default_group_if_no_other_group_matches(self):
        self.enable_login(user_groups={
            'DEFAULT': Group(['*'], [
                    Rule('.*', read=False, write=False)
                ]).to_dict(),
            'NOT-DEFAULT-TEAM': Group(['john.doe@somewhere.else'], [
                    Rule('^pva://hyper:.*', read=True, write=False)
                ]).to_dict()
        })
        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('joe.q.public@somewhere.else'),
            pvname='pva://hyper:acceleration')
        self.assertTrue(record['userAuthorised'])
        self.assertFalse(record['permissions']['read'])
        self.assertFalse(record['permissions']['write'])

        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('john.doe@somewhere.else'),
            pvname='pva://hyper:acceleration')
        self.assertTrue(record['userAuthorised'])
        self.assertTrue(record['permissions']['read'])
        self.assertFalse(record['permissions']['write'])

    def test_AutheriseUserAndPermissions__match_group_if_alone(self):
        self.enable_login(user_groups={
            'B-TEAM': Group(['john.doe@somewhere.else'], [
                    Rule('^pva://hyper:.*', read=True, write=True)
                ]).to_dict(),
        })
        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('john.doe@somewhere.else'),
            pvname='pva://hyper:acceleration')
        self.assertTrue(record['userAuthorised'])
        self.assertTrue(record['permissions']['read'])
        self.assertTrue(record['permissions']['write'])

    def test_AutheriseUserAndPermissions__match_group_if_listed_among_others(self):
        self.enable_login(user_groups={
            'B-TEAM': Group(['jane.doe@somewhere.else', 'john.doe@somewhere.else'], [
                    Rule('^pva://hyper:.*', read=True, write=True)
                ]).to_dict(),
        })
        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('john.doe@somewhere.else'),
            pvname='pva://hyper:acceleration')
        self.assertTrue(record['userAuthorised'])
        self.assertTrue(record['permissions']['read'])
        self.assertTrue(record['permissions']['write'])

    def test_AutheriseUserAndPermissions__no_access_if_not_authenticated(self):
        self.enable_login(user_groups={
            'B-TEAM': Group(['*'], [
                    Rule('^pva://hyper:.*', read=True, write=True)
                ]).to_dict(),
        })
        record = authenticate.AutheriseUserAndPermissions(
            JWT='1234567890',
            pvname='pva://hyper:acceleration')
        self.assertFalse(record['userAuthorised'])
        self.assertIsNone(record.get('permissions', None))

    def test_AutheriseUserAndPermissions__no_access_if_not_in_any_group(self):
        self.enable_login(user_groups={
            'B-TEAM': Group(['jane.doe@somewhere.else'], [
                    Rule('^pva://hyper:.*', read=True, write=True)
                ]).to_dict(),
        })
        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('john.doe@somewhere.else'),
            pvname='pva://hyper:acceleration')
        self.assertTrue(record['userAuthorised'])
        self.assertFalse(record['permissions']['read'])
        self.assertFalse(record['permissions']['write'])

    def test_AutheriseUserAndPermissions__no_access_if_no_rule_matches(self):
        self.enable_login(user_groups={
            'B-TEAM': Group(['john.doe@somewhere.else'], [
                    Rule('^pva://hyper:.*', read=True, write=True)
                ]).to_dict()
        })
        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('john.doe@somewhere.else'),
            pvname='pva://hyper:power')
        self.assertTrue(record['userAuthorised'])
        self.assertTrue(record['permissions']['read'])
        self.assertTrue(record['permissions']['write'])

        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('john.doe@somewhere.else'),
            pvname='pva://photon:power')
        self.assertTrue(record['userAuthorised'])
        self.assertFalse(record['permissions']['read'])
        self.assertFalse(record['permissions']['write'])

    def test_AutheriseUserAndPermissions__later_rule_overrides_earlier(self):
        self.enable_login(user_groups={
            'B-TEAM': Group(['john.doe@somewhere.else'], [
                    Rule('^pva://hyper:.*', read=True, write=False),
                    Rule('^pva://hyper:acc:.*', read=False, write=True),
                    Rule('^pva://hyper:acc:off', read=True, write=True)
                ]).to_dict()
        })
        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('john.doe@somewhere.else'),
            pvname='pva://hyper:counter')
        self.assertTrue(record['userAuthorised'])
        self.assertTrue(record['permissions']['read'])
        self.assertFalse(record['permissions']['write'])

        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('john.doe@somewhere.else'),
            pvname='pva://hyper:acc:serial')
        self.assertTrue(record['userAuthorised'])
        self.assertFalse(record['permissions']['read'])
        self.assertTrue(record['permissions']['write'])

        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('john.doe@somewhere.else'),
            pvname='pva://hyper:acc:off')
        self.assertTrue(record['userAuthorised'])
        self.assertTrue(record['permissions']['read'])
        self.assertTrue(record['permissions']['write'])

    def test_AutheriseUserAndPermissions__use_first_group_by_name_if_in_multiple_groups(self):
        self.enable_login(user_groups={
            'B-TEAM': Group(['john.doe@somewhere.else'], [
                    Rule('^pva://hyper:.*', read=True, write=True)
                ]).to_dict(),
            'A-TEAM': Group(['john.doe@somewhere.else'], [
                    Rule('^pva://hyper:.*', read=False, write=False)
                ]).to_dict()
        })
        record = authenticate.AutheriseUserAndPermissions(
            JWT=self.auth_user('john.doe@somewhere.else'),
            pvname='pva://photon:power')
        self.assertTrue(record['userAuthorised'])
        self.assertFalse(record['permissions']['read'])
        self.assertFalse(record['permissions']['write'])

if __name__ == '__main__':
    unittest.main()
