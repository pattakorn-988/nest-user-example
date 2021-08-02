import { AuthenMiddleware } from './authen.middleware';

describe('AuthenMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthenMiddleware()).toBeDefined();
  });
});
