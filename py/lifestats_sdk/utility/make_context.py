# LifeStats SDK utility: make_context

from lifestats_sdk.core.context import LifeStatsContext


def make_context_util(ctxmap, basectx):
    return LifeStatsContext(ctxmap, basectx)
