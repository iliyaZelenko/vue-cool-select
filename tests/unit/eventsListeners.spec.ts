import { mount } from '@vue/test-utils'
import { Wrapper } from '@vue/test-utils/types'

import MainComponent from '~/component.vue'
import { VueCoolSelectComponentInterface } from '../../types/types'

const comp: VueCoolSelectComponentInterface & any = MainComponent

describe('eventsListeners', () => {
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
    // обычный import возвращал undefined
    const Vue = require('vue')
    const items = itemsDefault
    const wrapper = mount<VueCoolSelectComponentInterface>(comp, {
      propsData: { items }
    })

    wrapper.vm.onClick()

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
    // обычный import возвращал undefined
    const Vue = require('vue')
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
})
