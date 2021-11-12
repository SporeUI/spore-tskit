# @spore-ui/tskit

![npm](https://img.shields.io/npm/v/@spore-ui/tskit)
![license](https://img.shields.io/npm/l/@spore-ui/tskit)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Test](https://github.com/SporeUI/spore-tskit/actions/workflows/test.yml/badge.svg)
![Release](https://github.com/SporeUI/spore-tskit/actions/workflows/release.yml/badge.svg)
[![codecov](https://codecov.io/gh/SporeUI/spore-tskit/branch/main/graph/badge.svg)](https://codecov.io/gh/SporeUI/spore-tskit)

现代工具函数库 / 面向 TypeScript

[releases and changelog](https://github.com/SporeUI/spore-tskit/releases)

## 参考文档

[https://sporeui.github.io/spore-tskit/docs/](https://sporeui.github.io/spore-tskit/docs/)

## 简介

本工具库意图在日常业务积累中，留存各种常见工具函数，解决方案，Hack方案。

工具函数进行了分门别类的梳理，推荐使用时引用确定版本，直接引用函数，可以直接减少代码打包体积。

## 快速上手

```shell
npm i @spore-ui/tskit
```

```javascript
// 引入一个方法
import { delay } from '@spore-ui/tskit';

// 引入支持 es5 的代码
// 注意这种方式会导致 tree-shaking 失效
import { delay } from '@spore-ui/tskit/es5';
```

## 测试

- [测试覆盖率](https://sporeui.github.io/spore-tskit/coverage/lcov-report/index.html)
