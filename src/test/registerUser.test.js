import registerUser from '../decideUser.js';

// Mock fetch
global.fetch = jest.fn(() => Promise.resolve({ ok: true }));

describe('registerUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
        });

  it('should register the user and return the name', async () => {
    const name = 'testuser';
    const id = 'mock-subscription-id';

    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true }));
    
    const result = await registerUser(name, id);

    expect(fetch).toHaveBeenCalledWith(`http://localhost:8001/staff/submit/${name}/${id}`);
    expect(result).toBe(name);
  });

  it('should return null if name is null', async () => {
    const result = await registerUser(null, 'mock-subscription-id');

    expect(fetch).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should handle network errors and return null', async () => {
    const name = 'testuser';
    const id = 'mock-subscription-id';

    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    const result = await registerUser(name, id);

    expect(fetch).toHaveBeenCalledWith(`http://localhost:8001/staff/submit/${name}/${id}`);
    expect(result).toBeNull();
  });

  it('should handle fetch exceptions and return null', async () => {
    const name = 'testuser';
    const id = 'mock-subscription-id';

    fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch error')));

    const result = await registerUser(name, id);

    expect(fetch).toHaveBeenCalledWith(`http://localhost:8001/staff/submit/${name}/${id}`);
    expect(result).toBeNull();
  });
});
