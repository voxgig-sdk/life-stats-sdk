# LifeStats SDK exists test

import pytest
from lifestats_sdk import LifeStatsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LifeStatsSDK.test(None, None)
        assert testsdk is not None
