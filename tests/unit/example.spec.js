import { mount } from '@vue/test-utils'
import MainComponent from '@/component.vue'

describe('MainComponent.vue', () => {
  const itemsDefault = [
    'JS',
    'PHP',
    'CSS',
    'HTML'
  ]

  it('renders a component', () => {
    const wrapper = mount(MainComponent, {
      propsData: { items: itemsDefault }
    })
    expect(wrapper.exists()).toBe(true)
    expect(
      wrapper.find('.IZ-select__input').exists()
    ).toBe(true)
    expect(wrapper.classes()).toContain('IZ-select')
    expect(wrapper.is('div')).toBe(true)
  })

  it('tests "item-value", "itemText" props, checks values for every item, checks if an item is selected', () => {
    const items = [
      {
        val: 1,
        text: 'Text 1'
      },
      {
        val: 22,
        text: 'Text 2'
      },
      {
        val: '333',
        text: 'Text 3'
      }
    ]
    const value = 1
    const itemByValue = items.find(i => i.val === value)
    const wrapper = mount(MainComponent, {
      propsData: {
        items,
        itemValue: 'val',
        itemText: 'text',
        value
      }
    })

    // compare items prop
    expect(wrapper.props().items).toBe(items)

    // checks value and text of every item
    for (const item of items) {
      expect(
        wrapper.vm.getItemValue(item)
      ).toBe(item.val)

      expect(
        wrapper.vm.getItemText(item)
      ).toBe(item.text)
    }

    // выбран ли элемент по начальному prop value
    expect(
      wrapper.vm.isItemSelected(itemByValue)
    ).toBe(true)

    // Меняет значение и проверяет выбран ли элемент
    const testItem = items[items.length - 1]

    // симуляция выбрали элемент
    wrapper.setProps({ value: testItem.val })
    expect(
      wrapper.vm.isItemSelected(wrapper.vm.selectedItem)
    ).toBe(true)

    // меняется ли выбранный элемент
    expect(
      wrapper.vm.selectedItem
    ).toBe(testItem)
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

    const errorEl = wrapper.find(errorSelector)

    expect(errorEl.text()).toBe(errorMessage)
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
})
