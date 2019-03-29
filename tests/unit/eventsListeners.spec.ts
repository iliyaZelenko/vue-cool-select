import { mount } from '@vue/test-utils'
import { Wrapper } from '@vue/test-utils/types'

import MainComponent from '~/component.vue'
import { VueCoolSelectComponentInterface } from '../../types/types'

const comp: VueCoolSelectComponentInterface & any = MainComponent

describe('eventsListeners', () => {
  // обычный import возвращал undefined
  const Vue = require('vue')
  const itemsDefault = [
    'JS',
    'PHP',
    'CSS',
    'HTML'
  ]

  it('checks click and then focus on input', () => {
    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault }
    })
    // const mainElement = wrapper.find('.IZ-select')

    // mainElement.trigger('click')

    const inputForText = wrapper.find({
      ref: 'IZ-select__input-for-text'
    })

    wrapper.vm.onClick()

    // inputForText.trigger('focus')
    // inputForText.element.focus()

    expect(wrapper.vm.wishShowMenu).toBeTruthy()
    expect(wrapper.vm.hasMenu).toBeTruthy()
    expect(wrapper.emitted().focus).toBeTruthy()
    expect(
      inputForText.is(':focus')
    ).toBe(true)
    expect(wrapper.vm.focused).toBeTruthy()

    wrapper.vm.setBlured()

    expect(wrapper.emitted().blur).toBeTruthy()
    // expect(
    //   inputForText.is(':focus')
    // ).toBe(false)
    expect(wrapper.vm.focused).toBeFalsy()
  })

  it('checks onClick and onClickSelectItem', async () => {
    const items = itemsDefault
    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items }
    })

    wrapper.vm.onClick()

    expect(wrapper.vm.wishShowMenu).toBeTruthy()
    expect(wrapper.vm.hasMenu).toBeTruthy()

    const selectMenu = wrapper.find({
      ref: 'IZ-select__menu'
    })
    const selectItems = wrapper.findAll('.IZ-select__item')

    expect(selectMenu.isVisible()).toBeTruthy()
    expect(selectItems.length).toBe(items.length)

    const selectItem = items[0]
    wrapper.vm.onClickSelectItem(selectItem)

    expect(wrapper.vm.selectedItem).toBe(selectItem)
    expect(wrapper.vm.searchData).toBe('')

    const inputForText = wrapper.find({
      ref: 'IZ-select__input-for-text'
    })

    expect(
      inputForText.is(':focus')
    ).toBe(true)
    expect(wrapper.vm.wishShowMenu).toBe(false)
    expect(wrapper.vm.selectedItemByArrows).toBe(null)

    await Vue.nextTick()

    expect(wrapper.emitted().select).toBeTruthy()
    expect(
      wrapper.emitted().select[wrapper.emitted().select.length - 1][0]
    ).toBe(selectItem)
  })


  it('checks onClick with disabled', async () => {
    const wrapperWithDisabled = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: {
        items: itemsDefault,
        disabled: true
      }
    })
    const wrapperWithReadonly = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: {
        items: itemsDefault,
        readonly: true
      }
    })

    await check(wrapperWithDisabled)
    await check(wrapperWithReadonly)

    // тут нет ошибки, IDE ошибается!
    async function check (wrapper: Wrapper<VueCoolSelectComponentInterface>) {
      wrapper.vm.onClick()

      // хотя должно быть не как не undefined, а null (похоже null значит undefined в этих инструментах тестов)
      expect(wrapper.vm.selectedItem).toBe(undefined)

      const inputForText = wrapper.find({
        ref: 'IZ-select__input-for-text'
      })

      expect(
        inputForText.is(':focus')
      ).toBe(false)
      expect(wrapper.vm.wishShowMenu).toBe(false)

      await Vue.nextTick()

      expect(wrapper.emitted().select).toBeFalsy()
    }
  })

  it('checks onSelectByArrow with disabled and readonly', async () => {
    const wrapperDisabled = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault, disabled: true }
    })
    expect(
      wrapperDisabled.vm.onSelectByArrow({ preventDefault: jest.fn() })
    ).toBeUndefined()

    const wrapperReadonly = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault, readonly: true }
    })
    expect(
      wrapperReadonly.vm.onSelectByArrow({ preventDefault: jest.fn() })
    ).toBeUndefined()
  })

  it('checks onSelectByArrow ', async () => {
    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: {
        items: itemsDefault
      }
    })

    const eventUp = { key: 'ArrowUp' }
    const eventDown = { key: 'ArrowDown' }
    let currentArrowsIndex = -1
    const events = [
      // arrowsIndex changelog: 0, 1, 2, 3, 0, 1, 0, 3, 2, 1, 0...
      eventDown, eventDown, eventDown, eventDown, eventDown, eventDown, eventUp, eventUp, eventUp, eventUp, eventUp,
      eventUp, eventUp, eventUp, eventUp, eventUp, eventUp, eventUp, eventUp, eventUp, eventUp, eventUp, eventUp
    ]

    for await (const e of events) {
      await onSelectByArrow(e)
    }

    wrapper.setProps({
      arrowsDisableInstantSelection: true
    })

    for await (const e of events) {
      await onSelectByArrow(e)
    }

    async function onSelectByArrow (e) {
      // Arrange
      const preventDefaultMock = jest.fn()
      e.preventDefault = preventDefaultMock

      // Action
      wrapper.vm.onSelectByArrow(e)

      // Assert
      // expect(preventDefaultMock.mock.calls.length).toBe(1)

      if (e.key === 'ArrowUp') {
        currentArrowsIndex--
      } else if (e.key === 'ArrowDown') {
        currentArrowsIndex++
      }

      const end = wrapper.vm.itemsComputed.length - 1
      if (currentArrowsIndex < 0) {
        currentArrowsIndex = end
      }
      if (currentArrowsIndex > end) {
        currentArrowsIndex = 0
      }

      const expectedArrowsIndex = currentArrowsIndex
      const itemByArrowsIndex = wrapper.vm.itemsComputed[expectedArrowsIndex]

      expect(wrapper.vm.wishShowMenu).toBeTruthy()
      expect(wrapper.vm.arrowsIndex).toBe(expectedArrowsIndex)

      if (wrapper.vm.arrowsDisableInstantSelection) {
        expect(wrapper.vm.selectedItemByArrows).toBe(itemByArrowsIndex)
      } else {
        expect(wrapper.vm.searchData).toBe('')
        expect(wrapper.vm.selectedItem).toBe(itemByArrowsIndex)
        expect(wrapper.vm.selectedItemByArrows).toBeNull()
      }

      await Vue.nextTick()

      expect(wrapper.emitted().select).toBeTruthy()
    }
  })

  it('checks onSearchKeyDown disabled and readonly', async () => {
    const wrapperDisabled = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault, disabled: true }
    })
    expect(
      wrapperDisabled.vm.onSearchKeyDown({})
    ).toBeUndefined()

    const wrapperReadonly = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault, readonly: true }
    })
    expect(
      wrapperReadonly.vm.onSearchKeyDown({})
    ).toBeUndefined()
  })

  it('checks onSearchKeyDown ignore keys', async () => {
    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault }
    })
    const keys = ['Enter', 'ArrowDown', 'ArrowUp', 'Tab']

    for (const key of keys) {
      expect(
        wrapper.vm.onSearchKeyDown({ key })
      ).toBeUndefined()
    }
  })

  it('checks onSearchKeyDown reset on Backspace', async () => {
    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault }
    })

    wrapper.vm.onSearchKeyDown({
      target: { value: '' },
      key: 'Backspace'
    })

    expect(
      wrapper.vm.selectedItem
    ).toBeNull()
    expect(
      wrapper.vm.arrowsIndex
    ).toBeNull()
    expect(
      wrapper.vm.wishShowMenu
    ).toBeTruthy()
    expect(wrapper.emitted().keydown).toBeTruthy()
  })

  it('checks onSearchKeyUp', async () => {
    const wrapperDisabled = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault, disabled: true }
    })
    expect(
      wrapperDisabled.vm.onSearchKeyUp({})
    ).toBeUndefined()

    const wrapperReadonly = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault, readonly: true }
    })
    expect(
      wrapperReadonly.vm.onSearchKeyUp({})
    ).toBeUndefined()

    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault }
    })
    const event = {}

    wrapper.vm.onSearchKeyUp(event)

    expect(wrapper.emitted().keyup).toBeTruthy()
    expect(wrapper.emitted().keyup[0][0]).toBe(event)
  })

  it('checks onSearch disabled and readonly', async () => {
    const wrapperDisabled = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault, disabled: true }
    })
    expect(
      wrapperDisabled.vm.onSearch({})
    ).toBeUndefined()

    const wrapperReadonly = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault, readonly: true }
    })
    expect(
      wrapperReadonly.vm.onSearch({})
    ).toBeUndefined()

    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault }
    })
    const event = {
      target: { value: 'test value' }
    }

    wrapper.vm.onSearch(event)

    expect(wrapper.vm.selectedItemByArrows).toBeNull()
    expect(wrapper.vm.selectedItem).toBeNull()
    expect(wrapper.vm.arrowsIndex).toBeNull()
    expect(wrapper.vm.searchData).toBe(event.target.value)
    expect(wrapper.emitted().search).toBeTruthy()
    expect(wrapper.emitted().search[0][0]).toBe(event.target.value)
  })

  it('checks onScroll with ignore', async () => {
    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault, scrollItemsLimit: 999999999 }
    })
    // dummy
    const event = {}

    expect(
      wrapper.vm.onScroll(event)
    ).toBeUndefined()

    expect(wrapper.emitted().scroll).toBeTruthy()
    expect(wrapper.emitted().scroll[0][0]).toBe(event)
  })

  it('checks onScroll', async () => {
    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault, scrollItemsLimit: 0 }
    })
    const event = {
      target: {
        scrollHeight: 400,
        scrollTop: 150,
        clientHeight: 150
      }
    }
    const beforeVal = wrapper.vm.scrollItemsLimitCurrent

    expect(
      wrapper.vm.onScroll(event)
    ).toBeUndefined()

    expect(wrapper.emitted().scroll).toBeTruthy()
    expect(wrapper.emitted().scroll[0][0]).toBe(event)
    expect(wrapper.vm.scrollItemsLimitCurrent).toBe(beforeVal + wrapper.vm.scrollItemsLimitAddAfterScroll)
  })

  it('checks onEnter menu', async () => {
    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault }
    })

    expect(
      wrapper.vm.onEnter()
    ).toBeUndefined()
    expect(wrapper.vm.wishShowMenu).toBe(true)

    expect(
      wrapper.vm.onEnter()
    ).toBeUndefined()
    expect(wrapper.vm.wishShowMenu).toBe(false)

    expect(
      wrapper.vm.onEnter()
    ).toBeUndefined()
    expect(wrapper.vm.wishShowMenu).toBe(true)
  })

  it('checks onEnter firstItem ', async () => {
    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items: itemsDefault }
    })

    expect(
      wrapper.vm.onEnter()
    ).toBeUndefined()
    expect(wrapper.vm.wishShowMenu).toBe(true)
    expect(
      wrapper.vm.onEnter()
    ).toBeUndefined()
    expect(wrapper.vm.selectedItem).toBe(wrapper.vm.itemsComputed[0])
    expect(wrapper.vm.selectedItemByArrows).toBe(null)
    expect(wrapper.vm.searchData).toBe('')

    await Vue.nextTick()

    expect(wrapper.emitted().select).toBeTruthy()
  })
})
