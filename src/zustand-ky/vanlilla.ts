//store核心文件

type SetStateInternal<T> = (
    partial: T | Partial<T> | { _(state: T): T | Partial<T> }['_'],
    replace?: boolean
) => void;
type Listener<T> = (state: T, prevState: T) => void;

export interface StoreApi<T> {
    setState: SetStateInternal<T>;
    getState: () => T;
    getInitialState: () => T;
    subscribe: (listener: Listener<T>) => () => void;
}

// 状态函数创造器类型
export type creatorState<T> = (
    setState: StoreApi<T>['setState'],
    getState: StoreApi<T>['getState']
) => T;

// 状态仓库创造器类型
export type creatorStoreImpl = <T>(initializer: creatorState<T>) => StoreApi<T>;

export type creatorStore = {
    <T>(initializer: creatorState<T>): StoreApi<T>;
    <T>(): (initializer: creatorState<T>) => StoreApi<T>;
};

//创建状态仓库
export const createStoreImpl: creatorStoreImpl = createStateFn => {
    type TState = ReturnType<typeof createStateFn>;

    let state: TState;
    //定义监听器
    const listeners: Set<Listener<TState>> = new Set();

    const setState: StoreApi<TState>['setState'] = (partial, replace) => {
        // 类型断言 防止编译出错
        const nextState =
            typeof partial === 'function' ? (partial as (state: TState) => TState)(state) : partial;

        // 判断是否更新
        if (!Object.is(state, nextState)) {
            const previousState = state;
            state =
                replace ?? (typeof nextState !== 'object' || nextState === null)
                    ? (nextState as TState)
                    : Object.assign({}, state, nextState);
            listeners.forEach(listener => listener(state, previousState));
        }
    };
    const getState: StoreApi<TState>['getState'] = () => state;
    const getInitialState: StoreApi<TState>['getInitialState'] = () => initialState;
    const subscribe: StoreApi<TState>['subscribe'] = listener => {
        listeners.add(listener);
        //删除监听器
        return () => listeners.delete(listener);
    };
    const api = {
        setState,
        getState,
        getInitialState,
        subscribe,
    };
    state = createStateFn(setState, getState);
    const initialState = state;

    return api;
};

/**
 * const createStoreFunction = createStore();
   const store = createStoreFunction((set, get) => ({ count: 0 }));
 */
export const createStore = (createStateFn =>
    createStateFn ? createStoreImpl(createStateFn) : createStoreImpl) as creatorStore;
