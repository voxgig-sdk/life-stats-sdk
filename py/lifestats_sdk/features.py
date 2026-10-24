# LifeStats SDK feature factory

from lifestats_sdk.feature.base_feature import LifeStatsBaseFeature
from lifestats_sdk.feature.ratelimit_feature import LifeStatsRatelimitFeature
from lifestats_sdk.feature.retry_feature import LifeStatsRetryFeature
from lifestats_sdk.feature.test_feature import LifeStatsTestFeature
from lifestats_sdk.feature.timeout_feature import LifeStatsTimeoutFeature


_FEATURES = {
    "base": lambda: LifeStatsBaseFeature(),
    "ratelimit": lambda: LifeStatsRatelimitFeature(),
    "retry": lambda: LifeStatsRetryFeature(),
    "test": lambda: LifeStatsTestFeature(),
    "timeout": lambda: LifeStatsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
