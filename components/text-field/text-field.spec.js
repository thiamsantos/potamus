import test from 'tape'
import browserEnv from 'browser-env'
import textField, {
  validate,
  leavingInput,
  focusingInput,
  typingInput
} from './text-field'

browserEnv(['document'])

test('validate as curried function', t => {
  const node = document.createElement('input')
  const actual = typeof validate(node)
  const expected = 'function'

  t.equal(actual, expected, 'should return a function')
  t.end()
})

test('validate function', t => {
  const input = document.createElement('input')
  input.checkValidity = () => true
  const label = document.createElement('label')

  validate(input)(label, 'is-valid')
  const expected = label.classList.contains('is-valid')
  t.ok(expected, 'if input valid should add class to label')
  t.end()
})

test('validate function', t => {
  const input = document.createElement('input')
  input.checkValidity = () => false
  const label = document.createElement('label')

  validate(input)(label, 'is-valid')
  const expected = label.classList.contains('is-valid')
  t.notOk(expected, 'if input invalid should add class to label')
  t.end()
})

test('leaving input function', t => {
  const input = document.createElement('input')
  input.value = 'hey there'

  const textField = document.createElement('div')
  textField.classList.add('is-active')
  textField.appendChild(input)

  leavingInput({
    target: input
  })

  t.notOk(
    textField.classList.contains('is-active'),
    'should not contains the class is-active')
  t.notOk(
    textField.classList.contains('is-closed'),
    'if has value should not contains the class is-closed')
  t.end()
})

test('leaving input function', t => {
  const input = document.createElement('input')

  const textField = document.createElement('div')
  textField.classList.add('is-active')
  textField.appendChild(input)

  leavingInput({
    target: input
  })

  t.notOk(
    textField.classList.contains('is-active'),
    'should not contains the class is-active')
  t.ok(
    textField.classList.contains('is-closed'),
    'if value is empty should contains the class is-closed')
  t.end()
})

test('leaving input function', t => {
  const input = document.createElement('input')
  input.placeholder = 'some placeholder'

  const textField = document.createElement('div')
  textField.classList.add('is-active')
  textField.appendChild(input)

  leavingInput({
    target: input
  })

  t.notOk(
    textField.classList.contains('is-active'),
    'should not contains the class is-active')
  t.notOk(
    textField.classList.contains('is-closed'),
    'if has placeholder should not contains the class is-closed')
  t.end()
})

test('focusing input function', t => {
  const input = document.createElement('input')

  const textField = document.createElement('div')
  textField.classList.add('is-closed')
  textField.appendChild(input)

  focusingInput({
    target: input
  })
  t.ok(
    textField.classList.contains('is-active'),
    'should add the class is-active')
  t.notOk(
    textField.classList.contains('is-closed'),
    'should remove the class is-closed')
  t.end()
})

test('typing input function', t => {
  const input = document.createElement('input')
  input.checkValidity = () => true

  const textField = document.createElement('div')
  textField.appendChild(input)

  typingInput({
    target: input
  })

  t.ok(
    textField.classList.contains('is-valid'),
    'if input is valid add to the parent node the class is-valid')
  t.end()
})

test('typing input function', t => {
  const input = document.createElement('input')
  input.checkValidity = () => false

  const textField = document.createElement('div')
  textField.classList.add('is-valid')
  textField.appendChild(input)

  typingInput({
    target: input
  })
  t.notOk(
    textField.classList.contains('is-valid'),
    'if input is not valid remove to the parent node the class is-valid')
  t.end()
})

test('text field main function', t => {
  const input = document.createElement('input')
  input.checkValidity = () => true
  const wrapper = document.createElement('div')
  wrapper.appendChild(input)

  const blurEvent = document.createEvent('Event')
  blurEvent.initEvent('blur', true, true)

  const focusEvent = document.createEvent('Event')
  focusEvent.initEvent('focus', true, true)

  const inputEvent = document.createEvent('Event')
  inputEvent.initEvent('input', true, true)

  textField(input)

  t.ok(
    wrapper.classList.contains('is-closed'),
    'should contains the class is-closed')

  input.dispatchEvent(focusEvent)

  t.ok(
    wrapper.classList.contains('is-active'),
    'should add the class is-active')
  t.notOk(
    wrapper.classList.contains('is-closed'),
    'should remove the class is-closed')

  input.dispatchEvent(inputEvent)

  t.ok(
    wrapper.classList.contains('is-valid'),
    'if input is valid add to the parent node the class is-valid')

  input.dispatchEvent(blurEvent)

  t.notOk(
    wrapper.classList.contains('is-active'),
    'should not contains the class is-active')
  t.ok(
    wrapper.classList.contains('is-closed'),
    'if value is empty should contains the class is-closed')

  t.end()
})

test('text field main function', t => {
  const input = document.createElement('input')
  input.checkValidity = () => true
  input.placeholder = 'placeholder'
  const wrapper = document.createElement('div')
  wrapper.appendChild(input)

  const blurEvent = document.createEvent('Event')
  blurEvent.initEvent('blur', true, true)

  const focusEvent = document.createEvent('Event')
  focusEvent.initEvent('focus', true, true)

  const inputEvent = document.createEvent('Event')
  inputEvent.initEvent('input', true, true)

  textField(input)

  t.notOk(
    wrapper.classList.contains('is-closed'),
    'if has placeholder should not contains the class is-closed')

  input.dispatchEvent(focusEvent)

  t.ok(
    wrapper.classList.contains('is-active'),
    'should add the class is-active')

  input.dispatchEvent(inputEvent)

  t.ok(
    wrapper.classList.contains('is-valid'),
    'if input is valid add to the parent node the class is-valid')

  input.dispatchEvent(blurEvent)

  t.notOk(
    wrapper.classList.contains('is-active'),
    'should not contains the class is-active')
  t.notOk(
    wrapper.classList.contains('is-closed'),
    'if has placeholder should not contains the class is-closed')

  t.end()
})
