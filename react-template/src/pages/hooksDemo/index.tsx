import { Button } from 'antd';
import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import ProviderHoc from './providerHoc';
import UseImperativeHandle from './useImperativeHandle';
//在TestChild子组件使用之前，使用memo包裹一下
const MemoTestChild1 = memo(Child1); //对子组件进行处理
const MemoTestChild2 = memo(Child2); //对子组件进行处理
const MemoTestChild3 = memo(Child3); //对子组件进行处理
const HooksDemo: FC = () => {
  const history = useNavigate();

  const [count1, setCount1] = useState<number>(1);

  const [count2, setCount2] = useState<number>(2);

  const [count3, setCount3] = useState<number>(3);

  const [name2, setName2] = useState<string>('Child2组件');

  const [name3, setName3] = useState<string>('Child3组件');

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => history('/')}>go Back</Button>
      <div>
        <h1>使用memo优化react性能</h1>
        <h2>{count1}</h2>
        <button onClick={() => setCount1(count1 + 1)}>++</button>
        {/* 引入子组件 */}
        {/* 从demo可以看出，除了初始化的执行之外，这时候父组件发生状态的改变，子组件不会发生对应的重新执行，优化了代码的性能，个人建议多使用这些性能优化的函数,以提高性能 */}
        <MemoTestChild1 />
      </div>
      <div>
        <h1>引入useCallback，优化函数</h1>
        <h2>{count2}</h2>
        <button onClick={() => setCount2(count2 + 1)}>++</button>
        {/* 引入子组件 */}
        {/* <TestChild/>       把父组件的状态和设置状态的函数传递给子组件     */}
        <MemoTestChild2
          name={name2}
          onClick={useCallback((newName: string) => setName2(newName), [])}
        />
        {/* useCallback((newName: string) => setName(newName),[]) */}
        {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数 */}
      </div>
      <div>
        <h2>{count3}</h2>
        <button onClick={() => setCount3(count3 + 1)}>++</button>
        {/* 引入子组件 */}
        {/* <TestChild/>       把父组件的状态和设置状态的函数传递给子组件     */}
        <MemoTestChild3
          name={useMemo(
            () => ({ name3, color: name3.indexOf('name') !== -1 ? 'red' : 'green' }),
            [name3]
          )}
          onClick={useCallback((newName: string) => setName3(newName), [])}
        />
        {/* useCallback((newName: string) => setName(newName),[]) */}
        {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数 */}
      </div>

      <div>
        <h1>ProviderHoc</h1>
        <ProviderHoc></ProviderHoc>
      </div>
      <div>
        <h1>useImperativeHandle</h1>
        <UseImperativeHandle></UseImperativeHandle>
      </div>
    </div>
  );
};
//创建一个子组件
function Child1(): JSX.Element {
  console.log('TestChild1运行了?');
  return <h3>我是子组件1</h3>;
}
interface TestChildPropsType2 {
  name: string;
  onClick: Function;
}
function Child2({ name, onClick }: TestChildPropsType2): JSX.Element {
  console.log('TestChild2运行了?');
  return <h3>我是子组件2</h3>;
}
interface TestChildPropsType3 {
  name: { name3: string; color: string };
  onClick: Function;
}
function Child3({ name, onClick }: TestChildPropsType3): JSX.Element {
  console.log('TestChild3运行了?');
  return (
    <>
      <h3 style={{ color: name.color }}>我是子组件,这是父组件传递过来的数据:{name.name3}</h3>
      <button onClick={onClick.bind(null, '新的子组件name')}>改变name</button>
    </>
  );
}
export default HooksDemo;
