import { describe, expect, it } from 'vitest';
import {
  getAllInsuranceLocations,
  getAllInsurancePackages,
  getInsuranceCost,
  getPackageRate,
} from './utils';

describe('InsuranceModel Test Suite', () => {
  it('getInsuranceCost should returns correct cost', function () {
    const standardHongKongCost = getInsuranceCost({
      age: 10,
      insurancePackage: {
        id: 'test',
        name: 'standard',
        rate: 1,
      },
      location: {
        id: 'HK',
        currency: 'HKTest',
        name: 'Hong Kong',
        rate: 1,
      },
    });

    expect(standardHongKongCost[0]).toBe(100);
    expect(standardHongKongCost[1]).toBe('100HKTest');

    const superSafeUSACost = getInsuranceCost({
      age: 10,
      insurancePackage: {
        id: 'test',
        name: 'supersafe',
        rate: 1.75,
      },
      location: {
        id: 'US',
        currency: 'USD',
        name: 'USA',
        rate: 2,
      },
    });

    expect(superSafeUSACost[0]).toBe(350);
    expect(superSafeUSACost[1]).toBe('350USD');
  });

  it('Getting data methods should not throw any errors', function () {
    let e: Error | undefined;
    try {
      getAllInsurancePackages();
      getAllInsuranceLocations();
      getPackageRate('safe');
    } catch (err) {
      e = err as Error;
    }

    expect(e).toBe(undefined);
  });
});
