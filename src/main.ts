import * as core from '@actions/core'
import * as semver from 'semver';
import {version as versionExtractor, result} from './util';
import {ReleaseType} from "semver";

async function run(): Promise<void> {
  try {
    const version = core.getInput('version', {required: false}) === '' ? '0.0.1' : core.getInput('version', {required: false});

    const method = core.getInput('method', {required: true});
    const options = {
      prefix: core.getInput('return_with_prefix', {required: false}) === 'true',
      suffix: core.getInput('return_with_suffix', {required: false}) === 'true',
    };

    const extracted = versionExtractor(version);

    core.debug(`🔍 Version=${extracted.version}, Prefix=${extracted.prefix}, Suffix=${extracted.suffix}`);

    core.setOutput('original_version', result(extracted, options));
    core.setOutput('prefix', extracted.prefix ?? '');
    core.setOutput('suffix', extracted.suffix ?? '');
    if (method === 'default') {
      core.setOutput('version', result(extracted, options));
      return;
    }

    if (method.match(/^(major|minor|patch|alpha|beta)$/) === null) {
      throw new Error(`Invalid Method! ${method}`);
    }

    core.setOutput('version', result({
      version: semver.inc(extracted.version, method as ReleaseType) as string,
      prefix: extracted.prefix,
      suffix: extracted.suffix
    }, options));
  } catch (error) {
    core.setFailed(`🚨 ${error.message}`);
  }
}

run()
