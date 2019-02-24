import { mount } from '@vue/test-utils'
import clone from 'clone'
import MainComponent from '~/component.vue'

describe('MainComponent.vue', () => {
  const itemsDefault = [
    'JS',
    'PHP',
    'CSS',
    'HTML'
  ]
  const VAL = 'val'
  const TEXT = 'text'
  const itemsCollection = [
    {
      [VAL]: 1,
      [TEXT]: 'Text 1'
    },
    {
      [VAL]: 22,
      [TEXT]: 'Text 2'
    },
    {
      [VAL]: '333',
      [TEXT]: 'Text 3'
    }
  ]

  function getBoilerplateCollectionProps () {
    return {
      itemValue: VAL,
      itemText: TEXT
    }
  }

  it('renders a component', () => {
    const wrapper = mount(MainComponent, {
      propsData: { items: itemsDefault }
    })
    expect(wrapper.exists()).toBe(true)
    expect(
      wrapper.find('.IZ-select').exists()
    ).toBe(true)
    expect(
      wrapper.find('.IZ-select__input').exists()
    ).toBe(true)
    expect(
      wrapper.find({ ref: 'IZ-select__input-for-text' }).exists()
    ).toBe(true)
    expect(wrapper.classes()).toContain('IZ-select')
    expect(wrapper.is('div')).toBe(true)
  })

  it('tests "item-value", "itemText" props, checks values for every item, checks if an item is selected', () => {
    const itemIndex = 0
    const value = itemsCollection[itemIndex][VAL]
    const items = clone(itemsCollection)
    const itemByValue = items.find(i => i[VAL] === value)
    const wrapper = mount(MainComponent, {
      propsData: {
        ...getBoilerplateCollectionProps(),
        items,
        value
      }
    })

    // compare items prop
    expect(wrapper.props().items).toEqual(items)

    // checks value and text of every item
    for (const item of items) {
      expect(
        wrapper.vm.getItemValue(item)
      ).toBe(item[VAL])

      expect(
        wrapper.vm.getItemText(item)
      ).toBe(item[TEXT])
    }

    // выбран ли элемент по начальному prop value
    expect(
      wrapper.vm.isItemSelected(itemByValue)
    ).toBe(true)

    expect(
      wrapper.vm.selectedItemIndex
    ).toBe(itemIndex.toString())

    // Если нет результатов поиска, то selectedItemIndex === null
    wrapper.setData({
      search: 'u4904g098fdhg0d9f8'
    })
    expect(
      wrapper.vm.selectedItemIndex
    ).toBe(null)
  })

  it('should change selectedItem by the value prop', () => {
    const items = clone(itemsCollection)
    const wrapper = mount(MainComponent, {
      propsData: {
        ...getBoilerplateCollectionProps(),
        items: clone(itemsCollection)
      }
    })

    // Меняет значение и проверяет выбран ли элемент
    const testItem = items[items.length - 1]

    // симуляция выбрали элемент
    wrapper.setProps({ value: testItem[VAL] })
    expect(
      wrapper.vm.isItemSelected(wrapper.vm.selectedItem)
    ).toBe(true)

    // меняется ли выбранный элемент
    expect(
      wrapper.vm.selectedItem
    ).toEqual(testItem)

    // меняется ли значение выбранного элемента
    expect(
      wrapper.vm.currentItemValue
    ).toBe(testItem[VAL])
  })

  it('if have errorMessage prop, then have a error element', () => {
    const errorMessage = 'A error occurred!'
    const errorSelector = '.IZ-select__error'
    const wrapper = mount(MainComponent, {
      propsData: {
        items: itemsDefault,
        errorMessage
      }
    })

    expect(wrapper.contains(errorSelector)).toBe(true)
    expect(wrapper.contains('.IZ-select__input--has-error')).toBe(true)

    const errorEl = wrapper.find(errorSelector)

    expect(errorEl.text()).toBe(errorMessage)
    expect(wrapper.vm.hasError).toBe(true)
  })

  it('should have a fixed name', () => {
    const wrapper = mount(MainComponent, {
      propsData: {
        items: itemsDefault
      }
    })

    expect(wrapper.name()).toBe('VueSelect')
  })

  it('should have an input with a disabled state', () => {
    const inputRef = 'IZ-select__input-for-text'
    const wrapper1 = mount(MainComponent, {
      propsData: {
        items: itemsDefault,
        disableSearch: true,
        disabled: true
      }
    })

    expect(wrapper1.contains({ ref: inputRef })).toBe(true)

    const input1 = wrapper1.find({ ref: inputRef })

    expect(input1.attributes().disabled).toBe('disabled')
  })

  it('should decode JSON string items', () => {
    const itemsJSON1 = `[
      {
        "${VAL}": 111,
        "${TEXT}": "First item"
      },
      {
        "${VAL}": 222,
        "${TEXT}": "Second item"
      },
      {
        "${VAL}": 333,
        "${TEXT}": "Third item"
      }
    ]`
    const itemsJSON2 = `["First", "Second", 3, false, null]`
    const decoded1 = JSON.parse(itemsJSON1)
    const decoded2 = JSON.parse(itemsJSON2)
    const wrapper1 = mount(MainComponent, {
      propsData: {
        items: itemsJSON1
      }
    })
    const wrapper2 = mount(MainComponent, {
      propsData: {
        ...getBoilerplateCollectionProps(),
        items: itemsJSON2
      }
    })

    expect(wrapper1.vm.itemsComputed).toEqual(decoded1)
    expect(wrapper2.vm.itemsComputed).toEqual(decoded2)
  })

  it('should check filtering by search', () => {
    const items1 = itemsDefault
    const items2 = clone(itemsCollection)
    const firstItemText1 = itemsDefault[0]
    const firstItemText2 = items2[0][TEXT]
    const wrapper1 = mount(MainComponent, {
      propsData: {
        items: items1
      }
    })
    const wrapper2 = mount(MainComponent, {
      propsData: {
        ...getBoilerplateCollectionProps(),
        items: items2
      }
    })

    wrapper1.vm.search = firstItemText1
    wrapper2.vm.search = firstItemText2

    expect(wrapper1.vm.itemsComputed[0]).toBe(firstItemText1)
    expect(wrapper2.vm.items[0][TEXT]).toBe(firstItemText2)
  })

  it('should check the disabling filtering by search', () => {
    const items1 = itemsDefault
    const items2 = clone(itemsCollection)
    const firstItemText1 = itemsDefault[0]
    const firstItemText2 = items2[0][TEXT]
    const wrapper1 = mount(MainComponent, {
      propsData: {
        items: items1,
        disableFilteringBySearch: true
      }
    })
    const wrapper2 = mount(MainComponent, {
      propsData: {
        ...getBoilerplateCollectionProps(),
        items: items2,
        disableFilteringBySearch: true
      }
    })

    wrapper1.vm.search = firstItemText1
    wrapper2.vm.search = firstItemText2

    expect(wrapper1.vm.itemsComputed).toBe(items1)
    expect(wrapper2.vm.items).toBe(items2)
  })

  it('tests hasMenu computed property', () => {
    const wrapper = mount(MainComponent, {
      propsData: {
        items: clone(itemsCollection)
      }
    })
    expect(wrapper.vm.hasMenu).toBe(false)

    wrapper.setProps({ loading: true })

    expect(wrapper.vm.hasMenu).toBe(false)

    wrapper.vm.wishShowMenu = true
    wrapper.setProps({ loading: false })

    expect(wrapper.vm.hasMenu).toBe(true)
  })

  it('should check the setSelectedItemByValue', () => {
    const index = 0
    const value = itemsDefault[index]
    const wrapper = mount(MainComponent, {
      propsData: {
        items: itemsDefault,
        value
      }
    })

    wrapper.vm.setSelectedItemByValue()

    expect(wrapper.vm.selectedItem).toBe(value)
  })

  it('should check return the only key in object for text if no "itemText" prop provided', () => {
    const items = [
      {
        singleProperty: 'Text 1'
      },
      {
        singleProperty: 'Text 2'
      },
      {
        singleProperty: 'Text 2'
      }
    ]
    const value = items[2]
    const wrapper = mount(MainComponent, {
      propsData: {
        items,
        value
      }
    })

    expect(
      wrapper.vm.getItemText(
        wrapper.vm.selectedItem
      )
    ).toBe(value.singleProperty)

    // значение получается аналогично тексту
    expect(
      wrapper.vm.getItemText(
        wrapper.vm.selectedItem
      )
    ).toBe(
      wrapper.vm.getItemValue(
        wrapper.vm.selectedItem
      )
    )
  })

  it('should check the setSelectedItemByValue', () => {
    const items = clone(itemsDefault)
    const index = 0
    const value = items[index]
    const wrapper = mount(MainComponent, {
      propsData: {
        items,
        value
      }
    })

    wrapper.vm.setSelectedItemByValue()

    expect(wrapper.vm.selectedItem).toBe(value)
  })

  it('should check the setSelectedItemByValue result after items change', () => {
    const items = clone(itemsDefault)
    const value = itemsDefault[0]
    const wrapper = mount(MainComponent, {
      propsData: {
        items,
        value
      }
    })

    wrapper.vm.items.pop()
    wrapper.vm.setSelectedItemByValue()

    expect(wrapper.vm.selectedItem).toBe(value)
  })

  it('should check showMenu / hideMenu methods', () => {
    const wrapper = mount(MainComponent, {
      propsData: {
        items: clone(itemsDefault)
      }
    })

    wrapper.vm.showMenu()
    expect(wrapper.vm.wishShowMenu).toBe(true)

    wrapper.vm.hideMenu()
    expect(wrapper.vm.wishShowMenu).toBe(false)
  })

  it('should check menuDynamicStyles', () => {
    const wrapper = mount(MainComponent, {
      propsData: {
        items: clone(itemsDefault),
        disableSearch: false
      }
    })
    let styles = wrapper.vm.menuDynamicStyles

    expect(
      !!(styles.width && styles['pointer-events'] && !styles.top)
    ).toBe(true)

    wrapper.setProps({
      disableSearch: true
    })

    styles = wrapper.vm.menuDynamicStyles

    expect(
      !!(styles.width && styles['pointer-events'] && styles.top)
    ).toBe(true)
  })
})
