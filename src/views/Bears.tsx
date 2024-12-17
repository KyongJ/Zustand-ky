import { memo, useEffect } from 'react';
import useBearStore from '../store/useBearStore';

const Bears = () => {
    const bearsStore = useBearStore();
    const { bears, increase, decrease, reset } = bearsStore;
    
    return (
        <div>
            <h3>BearsPage</h3>

            <p>Number of bears: {bears}</p>
            <button onClick={() => increase()}>Increase</button>
            <button onClick={() => decrease()}>Decrease</button>
            <button onClick={() => reset()}>Reset</button>

            <Child />
        </div>
    );
};
const Child = memo(() => {
    // const bears = useBearStore(state => state.bears);
    const { bears } = useBearStore();

    return (
        <div>
            <h3>ChildPage</h3>
            <p>{bears}</p>
        </div>
    );
});

export default Bears;
