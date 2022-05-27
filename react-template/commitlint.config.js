/*
 * @Author: your name
 * @Date: 2020-02-11 14:00:08
 * @LastEditTime: 2020-02-11 15:47:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \DDcodeEdu-React\.commitlintrc.js
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'docs', 'build', 'style', 'revert']],
    'type-empty': [0, 'never'],
    'type-case': [0, 'never'],
    'scope-empty': [0, 'never'],
    'scope-case': [0, 'never'],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 120],
  },
};
//
/**
 * 1. type
 * feat:     增加新功能
 * fix:      修复bug
 * upd：     更新某功能（不是 feat, 不是 fix）
 * refactor: 代码重构时使用
 * docs:     只改动了文档相关的内容
 * build:    构造工具的或者外部依赖的改动，例如webpack，npm
 * style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
 * revert:   执行git revert打印的message
 * */
