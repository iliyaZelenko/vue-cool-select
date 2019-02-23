import { shallowMount } from '@vue/test-utils'
import MainComponent from '@/component.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(MainComponent, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
