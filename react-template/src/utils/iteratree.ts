import { transform } from 'lodash';

type IterateeType<I = any> = (item: I) => boolean | void;
// 获取下级
type TFileldType = {
  label?: string;
  value?: string;
  status?: string;
  children?: string;

  [key: string]: string | undefined;
};
export const defaultFieldNames: TFileldType = {
  label: 'role_name',
  value: 'role_id',
  status: 'status',
  children: 'children',
};

export const hasChildrenitems = (item: any, childKey = 'children') => {
  if (childKey && Array.isArray(item[childKey]) && item[childKey].length) {
    return true;
  }
  return false;
};

// 将图片转成base64
export const fileToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
      if (e.target) {
        const { result } = e.target;
        if (typeof result === 'string') {
          resolve(result);
        }
      }
    };
  });

export const collectionTo = (items: any[], fieldMap: TFileldType = defaultFieldNames) => {
  return transform(
    items,
    (result: any[], value, _key) => {
      const newOpt: any = {
        ...value,
      };

      for (const key in fieldMap) {
        if (Object.prototype.hasOwnProperty.call(fieldMap, key)) {
          const targetKey = fieldMap[key];
          const targetValue = targetKey ? value[targetKey] : '';
          newOpt[key] = targetValue;
        }
      }
      result.push(newOpt);
    },
    []
  );
};

/**
 * 遍历树
 * @param routes
 * @param iteratee
 */
export function foreachTree<T = any>(items: T[], iteratee: IterateeType<T>, childKey?: string) {
  childKey = typeof childKey === 'string' ? childKey : 'children';

  for (let item of items) {
    if (iteratee && false === iteratee(item)) {
      continue;
    }
    if (hasChildrenitems(item, childKey)) {
      // @ts-ignore
      foreachTree(item[childKey], iteratee);
    }
  }
}

/**
 * 过滤获得所有选择的id
 * @param funcAuths
 * @param condtionCB
 * @param childKey
 * @returns
 */

export const filterSubChild = (
  funcAuths?: any[],
  condtionCB?: (item: any) => void | boolean,
  childKey = 'children'
) => {
  const temp: any[] = [];
  if (Array.isArray(funcAuths) && funcAuths.length) {
    foreachTree(
      funcAuths,
      (item) => {
        if (condtionCB) {
          if (false === condtionCB(item)) {
            return;
          }
          temp.push(item);
          return;
        }
        temp.push(item);
      },
      childKey
    );
  }
  return temp;
};

export const sortObjectByKey = (obj: any) => {
  const newData: any = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      newData[key] = obj[key];
    });
  return newData;
};

/**
 * 获取所有选择的子集
 * @param funcAuths
 * @param _status
 * @param fields
 * @returns
 */
export const getSubChild = (funcAuths?: any[], _status?: 0 | 1, fields?: TFileldType) => {
  const {
    status = 'status',
    value = 'id',
    children = 'children',
  } = {
    ...defaultFieldNames,
    ...fields,
  };
  const temp: any[] = [];
  if (Array.isArray(funcAuths) && funcAuths.length) {
    foreachTree(
      funcAuths,
      (item) => {
        if (undefined !== _status) {
          if (_status === item[status]) {
            temp.push(item[value]);
          }
        } else {
          temp.push(item[value]);
        }
      },
      children
    );
  }
  return temp;
};

export function createRoutePathMap(routes: any[], childKey = 'children') {
  const routePathMap: any = {};
  const authMap: any = {};
  foreachTree(routes, (route: any) => {
    // 追加 path 映射
    route.path && (routePathMap[route.path] = true);

    // 追加 auth 映射
    if (Array.isArray(route[childKey])) {
      route[childKey].forEach((auth: any) => {
        authMap[route.name + '-' + auth.name] = !!auth.status;
      });
    }
  });
  return { routePathMap, authMap };
}

/**
 * arrayToTree
 * 数组转树  递归求解
 */
export function arrayToTree(
  list: any[],
  parentId: number | string,
  idName: string,
  parentName: string
) {
  let len = list.length;
  function loop(parentId: number | string) {
    let res = [];
    for (let i = 0; i < len; i++) {
      let item = list[i];
      if (item[parentName] === parentId) {
        item.children = loop(item[idName]);
        res.push(item);
      }
    }
    return res;
  }
  return loop(parentId);
}

/**
 * treeToArray
 * 树转数组扁平化结构
 * 广度优先
 * 队列  先进先出
 */
export function treeToArray(node: any) {
  let stack = node,
    data = [];

  while (stack.length !== 0) {
    let shift = stack.shift();
    data.push(shift);
    let children = shift.children;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i]);
      }
    }
  }
  return data;
}

export function hasSameArr(arr1: any[], arr2: any[]) {
  let arr: any[] = [];
  // 双重for循环，时间复杂度：n*n
  for (let i = 0; i < arr1.length; i++) {
    let tempArr1 = arr1[i];
    for (let j = 0; j < arr2.length; j++) {
      let tempArr2 = arr2[j];

      if (tempArr2.path === tempArr1.path) {
        arr.push(tempArr2);

        break;
      }
    }
  }
  return arr;
}

export function findRouter(routes: any[], path: string) {
  return routes.find((item) => item.path === path)[0];
}
