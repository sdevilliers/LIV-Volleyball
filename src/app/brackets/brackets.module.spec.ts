import { BracketsModule } from './brackets.module';

describe('BracketsModule', () => {
  let bracketsModule: BracketsModule;

  beforeEach(() => {
    bracketsModule = new BracketsModule();
  });

  it('should create an instance', () => {
    expect(bracketsModule).toBeTruthy();
  });
});
