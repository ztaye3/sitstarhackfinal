from django.test import TestCase
from rest_framework.test import APITestCase
from ..utils import constant as const
from rest_framework import status
from django.core import mail


# Create your tests here.

# Email verification test
class EmailVerificationTest(APITestCase):
    # Test data
    signup_data = {
        "username": 'tester',
        "email": 'tester@gmail.com',
        "password": 'password'
    }

    login_data = {
        "email": 'tester@gmail.com',
        "password": 'password'
    }

    def test_register_with_email_verification(self):
        # Send signup request
        response = self.client.post(const.SIGNUP_USER_URL, self.signup_data, format="json")

        # Assert response
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Assert email verification, expect email sent
        self.assertEqual(len(mail.outbox), 1)

        # Filter token and token and uuid sent
        email = mail.outbox[0].body.splitlines()
        activation_link = [l for l in email if "/activate/" in l][0]
        uid, token = activation_link.split("/")[-2:]

        # Assert email verification and account activation
        data = {"uid": uid, "token": token}
        response = self.client.post(const.ACTIVATE_USER_URL, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Assert login user
        response = self.client.post(const.LOGIN_USER_URL, self.login_data, format="json")
        self.assertTrue("auth_token" in response.json())
        token = response.json()["auth_token"]

        # set token in the header
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        # Get user details
        response = self.client.get(const.GET_USER_DETAIL_URL, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["email"], self.signup_data["email"])
        self.assertEqual(response.json()[0]["username"], self.signup_data["username"])

