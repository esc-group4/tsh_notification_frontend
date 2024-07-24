import getRecentUser from '../getUser';

describe('getRecentUser', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and returns the most recent user ID', async () => {
    const mockUserId = 'user-id-123';
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ recent: mockUserId })
    });

    const recentUser = await getRecentUser();
    expect(recentUser).toBe(mockUserId);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/get/user');
  });

  it('returns null if the fetch fails', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      statusText: 'Not Found'
    });

    const recentUser = await getRecentUser();
    expect(recentUser).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/get/user');
  });

  it('returns null if there is an error during fetch', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    const recentUser = await getRecentUser();
    expect(recentUser).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/get/user');
  });
});