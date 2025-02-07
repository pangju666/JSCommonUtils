import { RegexUtils } from 'pangju-utils';

describe('TreeUtilsTest', () => {
  test('regexTest', () => {
    expect(new RegExp(RegexUtils.UPPERCASE).test('abcd')).toBeFalsy();
    expect(new RegExp(RegexUtils.UPPERCASE).test('ABCD')).toBeTruthy();
    expect(new RegExp(RegexUtils.UPPERCASE).test('AbCd')).toBeTruthy();
    expect(new RegExp(RegexUtils.UPPERCASE).test('1234')).toBeFalsy();

    expect(new RegExp(RegexUtils.LOWERCASE).test('abcd')).toBeTruthy();
    expect(new RegExp(RegexUtils.LOWERCASE).test('ABCD')).toBeFalsy();
    expect(new RegExp(RegexUtils.LOWERCASE).test('AbCd')).toBeTruthy();
    expect(new RegExp(RegexUtils.LOWERCASE).test('1234')).toBeFalsy();

    expect(new RegExp(RegexUtils.LETTER).test('abcd')).toBeTruthy();
    expect(new RegExp(RegexUtils.LETTER).test('ABCD')).toBeTruthy();
    expect(new RegExp(RegexUtils.LETTER).test('AbCd')).toBeTruthy();
    expect(new RegExp(RegexUtils.LETTER).test('1234')).toBeFalsy();

    expect(new RegExp(RegexUtils.CHINESE).test('AbCd')).toBeFalsy();
    expect(new RegExp(RegexUtils.CHINESE).test('1234')).toBeFalsy();
    expect(new RegExp(RegexUtils.CHINESE).test('测试')).toBeTruthy();
    expect(new RegExp(RegexUtils.CHINESE).test('测试123advdd')).toBeTruthy();

    expect(new RegExp(RegexUtils.NUMBER).test('1345')).toBeTruthy();
    expect(new RegExp(RegexUtils.NUMBER).test('-123')).toBeTruthy();
    expect(new RegExp(RegexUtils.NUMBER).test('-123.5')).toBeTruthy();
    expect(new RegExp(RegexUtils.NUMBER).test('1.524')).toBeTruthy();
    expect(new RegExp(RegexUtils.NUMBER).test('.212663')).toBeFalsy();
    expect(new RegExp(RegexUtils.NUMBER).test('1136.')).toBeFalsy();
  });
});
