
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LifeStatsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LifeStatsSDK.test()
    equal(testsdk instanceof LifeStatsSDK, true,
      'LifeStatsSDK.test() must return a client synchronously')
  })

})
