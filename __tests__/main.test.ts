import * as semver from 'semver';
import * as util from '../src/util';

test('Bump major version', async () => {
  console.log('asdasd:1.0.0:zzzz'.match(/^(?<prefix>[A-z0-9]+:)(?<version>.*.?)(?<suffix>:[A-z0-9]+)$/));
  console.log(semver.inc('1.0.0', 'major'));
});

describe('Prefix & Suffix', () => {
  test('🚛 Get Prefix', async () => {
    const given = 'prefix_name:1.0.0';

    const result = util.version(given);

    expect(result)
    .toStrictEqual({
      prefix: 'prefix_name',
      version: '1.0.0',
      suffix: null
    });
  });

  test('🚛 Get Suffix', async () => {
    const given = '1.0.0:suffix_name';

    const result = util.version(given);

    expect(result)
    .toStrictEqual({
      prefix: null,
      version: '1.0.0',
      suffix: 'suffix_name'
    });
  });

  test('🚛 Get Prefix & Suffix', async () => {
    const given = 'prefix_name:1.0.0:suffix_name';

    const result = util.version(given);

    expect(result)
    .toStrictEqual({
      prefix: 'prefix_name',
      version: '1.0.0',
      suffix: 'suffix_name'
    });
  });

  test('🚛 Get Prefix with underbar', async () => {
    const given = 'prefix_name:1.0.0';

    const result = util.version(given);

    expect(result)
    .toStrictEqual({
      prefix: 'prefix_name',
      version: '1.0.0',
      suffix: null
    });
  });

  test('🚛 Get Prefix with dash', async () => {
    const given = 'prefix-name:1.0.0';

    const result = util.version(given);

    expect(result)
    .toStrictEqual({
      prefix: 'prefix-name',
      version: '1.0.0',
      suffix: null
    });
  });

  test('🚛 Get Suffix with dash', async () => {
    const given = '1.0.0:suffix-dash';

    const result = util.version(given);

    expect(result)
    .toStrictEqual({
      prefix: null,
      version: '1.0.0',
      suffix: 'suffix-dash'
    });
  });

  test('🚛 Get Special characters in version with prefix', async () => {
    const given = 'prefix_special-name:1.0.0-alpha.0';

    const result = util.version(given);

    expect(result)
    .toStrictEqual({
      prefix: 'prefix_special-name',
      version: '1.0.0-alpha.0',
      suffix: null,
    });
  });
})

test('Result null check', () => {
  const given = 'prefix_special-name:1.0.0-alpha.0';

  const result = util.result(util.version(given), {
    prefix: true,
    suffix: false
  });

  expect(result)
  .toStrictEqual('prefix_special-name:1.0.0-alpha.0');
});

test('Result full', () => {
  const given = 'prefix:1.2.1:suffix';

  const extracted = util.version(given);

  expect( util.result({
    prefix: extracted.prefix as string,
    suffix: extracted.suffix,
    version: extracted.version
  }, {prefix: true, suffix: true}))
  .toStrictEqual('prefix:1.2.1:suffix');
})
