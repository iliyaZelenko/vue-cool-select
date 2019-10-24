import { isObject, getOffsetSum, scrollIfNeeded, mergeDeep } from '~/helpers'

describe('helpers.js', () => {
  it('checks isObject', () => {
    expect(
      isObject({})
    ).toBe(true)

    expect(
      isObject([])
    ).toBe(false)

    expect(
      isObject(function () {})
    ).toBe(false)

    expect(
      isObject(new Date())
    ).toBe(false)
  })

  it('checks getOffsetSum', () => {
    const DomElementMock = {
      offsetTop: 80,
      offsetLeft: 180,
      offsetParent: {
        offsetTop: 40,
        offsetLeft: 140,
        offsetParent: {
          offsetTop: 20,
          offsetLeft: 0,
          offsetParent: null
        }
      }
    }

    expect(
      getOffsetSum(DomElementMock)
    ).toEqual({ left: 320, top: 140 })

    DomElementMock.offsetParent = null

    expect(
      getOffsetSum(DomElementMock)
    ).toEqual({ left: 180, top: 80 })
  })

  it('checks scrollIfNeeded', () => {
    const TEST1 = {
      element: {
        offsetTop: 1,
        offsetHeight: null
      },
      container: {
        scrollTop: 2,
        offsetHeight: null
      }
    }

    scrollIfNeeded(TEST1.element, TEST1.container)

    expect(
      TEST1.container.scrollTop
    ).toBe(TEST1.element.offsetTop)

    const TEST2 = {
      element: {
        offsetTop: 2,
        offsetHeight: 10
      },
      container: {
        scrollTop: 1,
        offsetHeight: 9
      }
    }

    scrollIfNeeded(TEST2.element, TEST2.container)

    expect(
      TEST2.container.scrollTop
    ).toBe(TEST2.element.offsetTop + TEST2.element.offsetHeight - TEST2.container.offsetHeight)

    const TEST3 = {
      element: {
        offsetTop: 2,
        offsetHeight: 9
      },
      container: {
        scrollTop: 1,
        offsetHeight: 10
      }
    }

    scrollIfNeeded(TEST3.element, TEST3.container)

    expect(
      TEST3.container.scrollTop
    ).toBe(TEST3.container.scrollTop)
  })

  it('checks mergeDeep', () => {
    const obj = {
      a: 10,
      b: {
        b1: 20
      }
    }

    expect(
      mergeDeep(obj, {
        c: 40
      })
    ).toEqual({ ...obj, c: 40 })

    expect(
      mergeDeep(obj, {
        b: {
          b2: 20
        }
      })
    ).toEqual({
      a: 10,
      b: {
        b1: 20,
        b2: 20
      }
    })

    expect(
      mergeDeep(obj, {
        c: {
          test: 123
        }
      })
    ).toEqual({
      a: 10,
      b: {
        b1: 20
      },
      c: {
        test: 123
      }
    })
  })
})
