import { ReversePipe } from './reverse.pipe';

describe('Shared: Reverse Pipe', () => {

  it('Reverse pipe: transform', () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform('lol')).toEqual('lol');
  })


});
