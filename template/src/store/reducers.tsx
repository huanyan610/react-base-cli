import { combineReducers } from 'redux';

// /** 引入common文件夹下所有reducer文件*/
// const commonModulesFiles = require.context('../../src/components', true, /Reducer\.js$/);

/** 引入pages文件夹下所有reducer文件*/
const viewModulesFiles = require.context('../../src/store', true, /Reducer\.tsx$/);

// /** 获取common文件夹下所有reducer*/
// const commonModules = commonModulesFiles.keys().reduce((modules: any, modulePath: any) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/(.*\/)*([^.]+).*/gi, '$2');
//   const value = commonModulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, {});

/** 获取pages文件夹下所有reducer*/
const viewModules = viewModulesFiles.keys().reduce((modules: any, modulePath: any) => {
  // set './app.js' => 'app'
  console.log(modules);
  const moduleName = modulePath.replace(/(.*\/)*([^.]+).*/gi, '$2');
  const value = viewModulesFiles(modulePath);
  console.log(value);
  modules[moduleName] = value.default;
  return modules;
}, {});

/**
 * 查找重复文件
 *
 * @param {Array} arr1
 * @param {Array} arr2
 */
let searchSame = (arr1: any, arr2: any) => {
  let a = []; //存储不同的文件
  let b = []; //存储相同的文件
  let c = []; //存储所有的文件
  let d = []; //存储冲突的文件
  let modulesFileArr = arr1.concat(arr2);

  /**获取所有文件名 */
  for (let i = 0; i < modulesFileArr.length; i++) {
    c.push(modulesFileArr[i].replace(/(.*\/)*([^.]+).*/gi, '$2'));
  }

  /** 找出相同的文件 */
  for (let i = 0; i < c.length; i++) {
    if (a.indexOf(c[i]) === -1) {
      a.push(c[i]);
    } else {
      //相同的文件数组
      b.push(c[i]);
    }
  }

  /** 有重复文件发出报错信息 */
  if (b.length > 0) {
    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < modulesFileArr.length; j++) {
        let isTrue = b[i] === modulesFileArr[j].replace(/(.*\/)*([^.]+).*/gi, '$2');
        if (isTrue) {
          d.push(modulesFileArr[j]);
        }
      }
    }
    console.error(`${[...b]}文件命名冲突:`, d);
    throw new Error("reducer文件有命名冲突,请查看console.error('reducer文件有命名冲突:')");
  }
};

searchSame([], viewModulesFiles.keys());

// let allModules = Object.assign({}, viewModules);
console.log(viewModules);
const reducer = () => combineReducers({ ...viewModules });

export default reducer;
