
# 2022 React + React Router + Redux + emotion 测试示例项目
本项目适合：了解最新React生态，包括hook，新redux，样式解决方案styled-components+emotion+tailwindcss等的童鞋
## 项目划分
### 购物车 src/page/Cart 
购物车项目，基本的hook使用

- [x] useReducer 方法router，比如对同个数据的增删查改
- [x] useEffect
- [x] useCallback
- [x] hook封装，拆分数据，以数据为维度建立hook(get/set)
  - [ ] 思考，前期数据无关联，后期有关联了，如何解决
  - [ ] hook数据如何跨父子组件，兄弟组件共享
  - [ ] hook适用在哪些地方？跟redux对比如何

### 计算器 src/page/Counter
计算器项目，主要是给redux+toolkit使用

- [ ] [React Query](https://react-query.tanstack.com/overview)，查阅 https://www.infoq.cn/article/9abcwvioiccvmio5xdxy
- [ ] [SWR](https://www.infoq.cn/link?target=https%3A%2F%2Fswr.vercel.app%2F)
## React Router
文档 https://v5.reactrouter.com/web/example/route-config

子路由 `src/components/subRouter`

JSX
```JSX
// https://v5.reactrouter.com/web/api/Link/to-string
<Link to="/b">
  <div>点击跳转到b</div>
</Link>

// https://v5.reactrouter.com/web/api/Redirect
<Redirect to="/somewhere/else" />
<Redirect
  to={{
    pathname: "/login",
    search: "?utm=your+face",
    state: { referrer: currentLocation }
  }}
/>
<Redirect push to="/somewhere/else" />
```

```JS
import { useHistory } from 'react-router-dom'
const history = useHistory();
history.push('/posts/1'); // jump
history.replace('/posts/2'); // redirect
<button onClick={history.goBack}>return back</button> // 返回上一页
```

## Style
- [styled-components](https://styled-components.com/docs/basics#installation)
- [emotion](https://emotion.sh/docs/introduction)
- [tailwindcss](https://tailwindcss.com/docs/guides/create-react-app)
  - react-scripts v3.x不报错，但是tailwindcss也不生效，升级到react-scripts v5.x可以
## redux

### 本地数据
组件自己用到数据放组件本地

如`src/page/Counter/Counter.tsx`里数据流转，默认值2是存储在`Counter`组件里，hook形式。通过本地的hook获取修改,后面再将store数据与本地数据做计算

```js
const [incrementAmount, setIncrementAmount] = useState('2'); // 默认数据
const incrementValue = Number(incrementAmount) || 0; // 类似vuex getter，直接transform获取就好
```

为什么这里`useState('2')`？因为set操作时`e.target.value`是字符串，所以原始数据就是string，`incrementValue`是getter

```JS
onChange={(e) => setIncrementAmount(e.target.value)}
```

### store数据
数据放store空间，这里是挂载在`/counter`下，redux理解为与vuex同样的树状结构。通过命名空间间隔。


#### 获取全局store数据
将全局API与普通API分割开，重命名。全局store的dispatch方法和state可以用TS动态计算`typeof`得出

```JS
// filePath: src/store/index.ts
import counterReducer from '@/page/Counter/store/counterSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// filePath: src/hooks/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

// 在整個应用中使用，而不是普通的`useDispatch`和`useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// filePath: src/page/Counter/store/counterSlice.ts
const initialState: CounterState = {
  value: 0,
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // 直接改不用返回state，底层用到Immer库使用Proxy拦截
      state.value += 1;
    },
  }
})
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// 下面称为 selector 可以从 state 选择某个值返回
// 也可以使用内联方式 `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

// filePath: src/page/Counter/Counter.tsx
import {
  increment,
  selectCount,
} from './store/counterSlice';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';

const count = useAppSelector(selectCount); // 注意这里会触发重新渲染
const dispatch = useAppDispatch();
dispatch(increment()) // dispatch action

// increment会返回如下结构给到dispatch，包含payload和type，标准的redux使用
// {
//     payload: undefined;
//     type: string;
// }
```

得到`count`对应`src/page/Counter/store/counterSlice.ts`里`initialState`的value数据，这么长链路就为了一个0
🤕真的是拆的稀碎


#### 将本地数据传递给全局store
同步情况简单点
```JS
dispatch(incrementByAmount(incrementValue)) // incrementValue是组件内部的值，这样传入同步action

export const counterSlice = createSlice({
  name: 'counter',
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => { // 这里接受后更新value
      state.value += action.payload;
    },
  }
})
```

异步情况不能写reducers里，需要用另外的方法，**异步方式写法兼容同步方式**

```JS
dispatch(incrementAsync(incrementValue)) // incrementValue是组件内部的值，这样传入异步action

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
```




