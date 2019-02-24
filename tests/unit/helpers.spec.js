import { isObject, getOffsetSum } from '@/helpers'

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
})
