// Import Vue and the component being tested
import Vue from 'vue'
import MyComponent from './src/App.vue'
// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('MyComponent', () => {
  // Inspect the raw component options
  it('has a created hook', () => {
    expect(typeof MyComponent.created).toBe('function')
  })
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof MyComponent.data).toBe('function')
    const defaultData = MyComponent.data()
    expect(defaultData.query.country).toBe('')
    expect(defaultData.output_data.city).toBe('')
    expect(defaultData.output_data.visibility).toBe(false)
    expect(typeof defaultData.output_data.main).toBe('object')
    expect(typeof defaultData.output_data.wind).toBe('object')
  })

  // Inspect the component instance on mount
  it('correctly sets the data values when created', () => {
    const vm = new Vue(MyComponent).$mount()
    expect(vm.message).toBe('bye!')
  })



})