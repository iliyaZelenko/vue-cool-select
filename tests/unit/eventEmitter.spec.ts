import { EventEmitter } from '~/main'

describe('eventsListeners', () => {
  it('checks EventEmitter', () => {
    const instance = new EventEmitter()

    expect(typeof EventEmitter).toEqual('function')
    expect(typeof instance).toEqual('object')

    expect(typeof instance.on).toEqual('function')
    expect(typeof instance.onOnce).toEqual('function')
    expect(typeof instance.emit).toEqual('function')

    expect(instance.on(
      'myEvent',
      () => {}
    )).toBeUndefined()
    expect(instance.onOnce(
      'myEvent',
      () => {}
    )).toBeUndefined()
    expect(instance.emit(
      'myEvent',
      'testData'
    )).toBeUndefined()
  })
})
