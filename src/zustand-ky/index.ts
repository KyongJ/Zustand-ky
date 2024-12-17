import { useSyncExternalStore } from 'react';
import { createStore, creatorState, StoreApi } from './vanlilla';

// 获取状态类型的工具类型
type GetState<S> = S extends { getState: () => infer T } ? T : never;

type ReadonlyStoreApi<T> = Pick<StoreApi<T>, 'getState' | 'getInitialState' | 'subscribe'>;

export type UseBoundStore<S extends ReadonlyStoreApi<unknown>> = () => GetState<S>;

// 创造函数类型定义
type Creator = <T>(initializer: creatorState<T>) => UseBoundStore<StoreApi<T>>;

//实现create函数，接受一个函数作为参数，函数的作用是创建仓库对象
export const create: Creator = <T>(createStateFn: creatorState<T>) =>
    createStateImpl(createStateFn);

const createStateImpl = <T>(createStateFn: creatorState<T>) => {
    // 调用创建store方法
    const api = createStore(createStateFn);

    //创建一个自定义hook，供组件使用并返回
    const useBoundStore: any = () => useStore(api);

    Object.assign(useBoundStore, api);

    return useBoundStore;
};

// 函数重载
export function useStore<S extends ReadonlyStoreApi<unknown>>(api: S): GetState<S>;

// 实现
export function useStore<T>(api: ReadonlyStoreApi<T>) {
    const slice = useSyncExternalStore(api.subscribe, api.getState);
    return slice;
}
//
// 调用过程：
// 当你调用 useStore hook 时，useSyncExternalStore 内部会做如下几件事情：

// 调用 api.subscribe 来订阅 store 的状态变化。
// subscribe 函数会接收一个监听器（listener）作为参数，该监听器会在 store 状态发生变化时被调用。
// 此时listener会被加入到listeners当中
// 当状态发生变化时，lisntners会逐步遍历，从而通知组件，此时useSyncExternalStore 会获取最新的状态（通过 api.getState），并重新渲染组件。
