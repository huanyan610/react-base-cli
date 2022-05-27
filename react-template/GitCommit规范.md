### git commit message 规范

#### 全局安装

```
    npm install -g commitizen cz-conventional-changelog
    echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

#### 使用说明

执行 git cz，任何 git commit 指令的 option 都能用在  git cz 指令上, 例如 git cz -a，根据提示依次填写:

```
   1.Select the type of change that you're committing 选择改动类型 (<type>)

   2.What is the scope of this change (e.g. component or file name)? 填写改动范围 (<scope>)

   3.Write a short, imperative tense description of the change: 写一个精简的描述 (<subject>)

   4.Provide a longer description of the change: (press enter to skip) 对于改动写一段长描述 (<body>)

   5.Are there any breaking changes? (y/n) 是破坏性修改吗？默认n (<footer>)

   6.Does this change affect any openreve issues? (y/n) 改动修复了哪个问题？默认n (<footer>)
```

#### Commit message 规范

- type  
  type 为必填项，用于指定 commit 的类型，约定了 feat、fix 两个主要 type，以及 docs、style、build、refactor、revert 五个特殊 type，其余 type 暂不使用。当一次改动包括主要 type 与特殊 type 时，统一采用主要 type。  
  填写完毕后，husky 会调用 commitlint 对 message 进行格式校验，默认规定 type 、scope、subject 为必填项。

```
    feat:     增加新功能
    fix:      修复bug
    refactor: 代码重构时使用
    docs:     只改动了文档相关的内容
    build:    构造工具的或者外部依赖的改动，例如webpack，npm
    style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
    revert:   执行git revert打印的message
```

- scope  
  scope 也为必填项，用于描述改动的范围，如果一次 commit 修改多个模块，建议拆分成多次 commit，以便更好追踪和维护,格式为模块名/文件名

```
   pages/home.js
```

- subject  
  subject 也为必填项，用于写一个精简的描述，如果一次 commit 修改多个模块，建议拆分成多次 commit，以便更好追踪和维护，格式为 type 中文描述+精简提交内容描述

```
   <新功能>（添加git commitlint 规范）
```

- body  
  body 填写详细描述，主要描述改动之前的情况及修改动机，对于小的修改不作要求，但是重大需求、更新等必须添加 body 来作说明。
- break changes  
  break changes 指明是否产生了破坏性修改，涉及 break changes 的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等。
