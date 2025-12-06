import reducer, { fetchPosts } from '../features/posts/postsSlice';

const baseState = {
  items: [],
  selected: null,
  status: 'idle',
  error: null,
};

describe('postsSlice reducer', () => {
  it('handles fetchPosts.pending -> loading state', () => {
    const nextState = reducer(baseState, { type: fetchPosts.pending.type });
    expect(nextState.status).toBe('loading');
  });

  it('handles fetchPosts.fulfilled -> stores posts', () => {
    const sample = [{ _id: '1', title: 'Sample', content: 'Text' }];
    const nextState = reducer(baseState, { type: fetchPosts.fulfilled.type, payload: sample });
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].title).toBe('Sample');
    expect(nextState.status).toBe('succeeded');
  });
});

