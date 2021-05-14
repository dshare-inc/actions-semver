"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver = __importStar(require("semver"));
const util = __importStar(require("../src/util"));
test('Bump major version', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('asdasd:1.0.0:zzzz'.match(/^(?<prefix>[A-z0-9]+:)(?<version>.*.?)(?<suffix>:[A-z0-9]+)$/));
    console.log(semver.inc('1.0.0', 'major'));
}));
describe('Prefix & Suffix', () => {
    test('🚛 Get Prefix', () => __awaiter(void 0, void 0, void 0, function* () {
        const given = 'prefix_name:1.0.0';
        const result = util.version(given);
        expect(result)
            .toStrictEqual({
            prefix: 'prefix_name',
            version: '1.0.0',
            suffix: null
        });
    }));
    test('🚛 Get Suffix', () => __awaiter(void 0, void 0, void 0, function* () {
        const given = '1.0.0:suffix_name';
        const result = util.version(given);
        expect(result)
            .toStrictEqual({
            prefix: null,
            version: '1.0.0',
            suffix: 'suffix_name'
        });
    }));
    test('🚛 Get Prefix & Suffix', () => __awaiter(void 0, void 0, void 0, function* () {
        const given = 'prefix_name:1.0.0:suffix_name';
        const result = util.version(given);
        expect(result)
            .toStrictEqual({
            prefix: 'prefix_name',
            version: '1.0.0',
            suffix: 'suffix_name'
        });
    }));
    test('🚛 Get Prefix with underbar', () => __awaiter(void 0, void 0, void 0, function* () {
        const given = 'prefix_name:1.0.0';
        const result = util.version(given);
        expect(result)
            .toStrictEqual({
            prefix: 'prefix_name',
            version: '1.0.0',
            suffix: null
        });
    }));
    test('🚛 Get Prefix with dash', () => __awaiter(void 0, void 0, void 0, function* () {
        const given = 'prefix-name:1.0.0';
        const result = util.version(given);
        expect(result)
            .toStrictEqual({
            prefix: 'prefix-name',
            version: '1.0.0',
            suffix: null
        });
    }));
    test('🚛 Get Suffix with dash', () => __awaiter(void 0, void 0, void 0, function* () {
        const given = '1.0.0:suffix-dash';
        const result = util.version(given);
        expect(result)
            .toStrictEqual({
            prefix: null,
            version: '1.0.0',
            suffix: 'suffix-dash'
        });
    }));
    test('🚛 Get Special characters in version with prefix', () => __awaiter(void 0, void 0, void 0, function* () {
        const given = 'prefix_special-name:1.0.0-alpha.0';
        const result = util.version(given);
        expect(result)
            .toStrictEqual({
            prefix: 'prefix_special-name',
            version: '1.0.0-alpha.0',
            suffix: null,
        });
    }));
});
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
    expect(util.result({
        prefix: extracted.prefix,
        suffix: extracted.suffix,
        version: extracted.version
    }, { prefix: true, suffix: true }))
        .toStrictEqual('prefix:1.2.1:suffix');
});
