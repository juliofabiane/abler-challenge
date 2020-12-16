import { mount } from '@vue/test-utils'
import ListMovies from '@/components/ListMovies.vue'

describe('ListMovies', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ListMovies)
    expect(wrapper.vm).toBeTruthy()
  })
})
