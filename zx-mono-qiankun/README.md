# 前端工程化

让业务开发 100% 聚焦在业务逻辑上

# 使用 lerna 初始化项目

1. 初始化项目：`npx lerna init`
   - `--independent/-i` 使用独立的 版本控制模式
2. 在 packages 文件夹下初始化一个 package 模块：`lerna create <name>`
   - `npx lerna create @mo-demo/cli`
   - `npx lerna create @mo-demo/cli-shared-utils`
   - `npx lerna list (--json)`：查看项目中具体有哪些 package
3. 在当前 Lerna 仓库中执行引导流程（bootstrap）,安装所有依赖项并链接任何交叉依赖：此命令至关重要，因为它让你可以 在 require() 中直接通过软件包的名称进行加载，就好像此软件包已经存在于 你的 node_modules 目录下一样。
   - `lerna bootstrap`
   - `lerna bootstrap --hoist`：将公共依赖提升到根目录，但是这种方式会有一个问题，不同版本号只会保留使用最多的版本，这种配置不太好，当项目中有些功能需要依赖老版本时，就会出现问题。

## 安装 | 删除依赖

monorepo: 一般分为三种场景

> 利用 lerna 来管理依赖很恶心，优先考虑使用 yarn 来管理依赖

1. 给所有 package 安装依赖，不包括根目录：给所有 package 目录下的 package.json 添加依赖
   - `npx lerna add (-D) <lib_name>`
2. 单独给 package 中某个包安装依赖：package_name 为 package.json 中的 name 属性值，而不是文件名称
   - `npx lerna add (-D) <lib_name> --scope <package_name>`
3. package 包中相互依赖：作用类似 yarn link，本地内存引用
   - `npx lerna add (-D) <package_name_a> --scope <package_name_b>`

## 执行命令

1. 按顺序依次执行所有 package 中的同一命令（若某个 packkage 中没有则中断执行，报错退出）：
   `npx lerna exec -- <command>`
2. 执行某个 package 中命令：
   `npx lerna exec --scope <package_name> -- <command>`

## 清理环境

1. 清理依赖：所有 package 中的依赖 node_modules
   - `lerna clean`

# 使用 yarn 管理 mono 项目曹祖

## 安装 | 删除依赖

普通项目： 通过 yarn add 和 yarn remove 即可简单解决依赖库的安装和删除问题

monorepo: 一般分为三种场景

1. 给 root 安装依赖：
   - `yarn add --dev(-D) -W prettie`
   - `yarn remove -W -D typescript`
2. 给所有 package 安装依赖：
   - `yarn workspaces add lodash`
   - `yarn workspaces remove lodash`
3. 给某个 package 安装依赖：
   - `yarn workspace packageB add packageA` - 将 packageA 作为 packageB 的依赖进行安装
   - `yarn workspace packageB remove packageA`

## 执行命令

1. 按顺序依次执行所有 package 中的同一命令（若某个 packkage 中没有则中断执行，报错退出）：
   `yarn workspaces run command`
2. 执行某个 package 中命令：
   `yarn workspace workspace_name command`

## 清理环境

1. 清理依赖：所有 package 中的依赖 node_modules

   - `lerna clean`

2. 清理编译后的产物：所有 package 中的编译产物

   - `yarn workspaces run clean`

3. 查看项目中的 workspace 依赖树
   - `yarn workspaces info [--json]`
