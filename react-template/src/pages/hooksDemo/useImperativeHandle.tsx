//Test.tsx文件
import React, {
  ChangeEvent,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  Fragment,
  memo,
  MutableRefObject,
  Ref,
  SyntheticEvent,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const Test: FC = (): JSX.Element => {
  const testRef: MutableRefObject<any> = useRef('test');
  const handleClick = (e: SyntheticEvent<HTMLButtonElement>): void => {
    console.log('自身button的内容：', e.currentTarget.innerText);
    console.log('子组件input的对象:', testRef.current);
    console.log('子组件input的value值：', testRef.current.value);
    console.log('子组件input的类型：', testRef.current.type());
  };
  return (
    <Fragment>
      <TestChildForward ref={testRef} />
      <button onClick={handleClick}>获取子组件的input的value和type</button>
    </Fragment>
  );
};
export default Test;
function TestChild(props: {}, ref: Ref<any>): JSX.Element {
  const testRef: MutableRefObject<any> = useRef(); //创建一个自身的ref，绑定到标签节点上
  //暴露出一个想要让父组件知道的对象,里面可以是属性也可以是函数
  const [inputValue, setInput] = useState('input的内容');
  useImperativeHandle(ref, () => {
    //第一个参数，要暴露给哪个(ref)？第二个参数要暴露出什么？
    return {
      //(testRef.current as HTMLInputElement) 类型断言，自己肯定就是这样的类型
      value: (testRef.current as HTMLInputElement).value, //暴露出input的value
      type: () => (testRef.current as HTMLInputElement).type, //暴露出input的type类型
    };
  });
  return (
    <>
      <input
        type="text"
        value={inputValue}
        ref={testRef}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          console.log(e.currentTarget.value);
          console.log(e.currentTarget.type);
          setInput(e.currentTarget.value);
        }}
      />
    </>
  );
}
const TestChildForward: ForwardRefExoticComponent<any> = memo(forwardRef(TestChild));
