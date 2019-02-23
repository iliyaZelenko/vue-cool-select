import { mount } from '@vue/test-utils'
import MainComponent from '@/component.vue'

describe('MainComponent.vue', () => {
  const items = [
    'JS',
    'PHP',
    'CSS',
    'HTML'
  ]

  it('renders a component', () => {
    const wrapper = mount(MainComponent, {
      propsData: {
        items
      }
    })
    // wrapper.setValue(items[2])
    expect(wrapper.exists()).toBe(true)
    expect(
      wrapper.find('.IZ-select__input').exists()
    ).toBe(true)
    expect(wrapper.vm.items).toBe(items)
    expect(wrapper.classes()).toContain('IZ-select')
    expect(wrapper.is('div')).toBe(true)
  })

  it('', () => {
    // ... 4
  })
})
