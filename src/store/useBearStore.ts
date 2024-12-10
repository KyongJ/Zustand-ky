import { create } from 'zustand';

interface BearState {
    bears: number;
    increase: (count?: number) => void;
    decrease: (count?: number) => void;
    reset: () => void;
}

const useBearStore = create<BearState>((set, get) => ({
    bears: 0,
    increase: (count = 1) => set(state => ({ bears: state.bears + count })),
    decrease: (count = 1) => set(state => ({ bears: Math.max(0, state.bears - count) })),
    reset: () => set({ bears: 0 }),
}));

export default useBearStore;
