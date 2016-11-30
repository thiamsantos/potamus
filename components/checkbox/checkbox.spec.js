import test from 'tape'
import browserEnv from 'browser-env'
import checkbox, {
  isFirefox,
  toggleAttribute,
  isDisabled,
  checkboxBehaviour,
  hide,
  createCheckbox,
  firefoxCompat
} from './checkbox'

browserEnv(['document'])

test('userAgent is firefox', t => {
  t.ok(isFirefox('Firefox'), 'return true if userAgent is firefox')
  t.notOk(isFirefox('Chrome'), 'return false if userAgent is chrome')
  t.end()
})

test('toggle DOM attribute', t => {
  const node = document.createElement('span')
  node.setAttribute('hey', '')

  toggleAttribute(node, 'hey')

  t.notOk(node.hasAttribute('hey'), 'toggleAttribute should remove attribute')
  t.end()
})

test('toggle DOM attribute', t => {
  const node = document.createElement('span')

  toggleAttribute(node, 'hey')

  t.ok(node.hasAttribute('hey'), 'toggleAttribute should add attribute')
  t.end()
})

test('is node disabled', t => {
  const node = document.createElement('span')
  node.classList.add('is-disabled')

  const expected = isDisabled(node)

  t.ok(expected, 'should return true if contains the class disabled')
  t.end()
})

test('is node disabled', t => {
  const node = document.createElement('span')
  node.setAttribute('disabled', 'hey')

  const expected = isDisabled(node)

  t.ok(expected, 'should return true if disabled attribute is set')
  t.end()
})

test('is node disabled', t => {
  const node = document.createElement('span')
  node.setAttribute('disabled', 'false')

  const expected = isDisabled(node)

  t.notOk(
    expected,
    'should return false if disabled attribute is set to false')
  t.end()
})

test('is node disabled', t => {
  const node = document.createElement('span')
  const expected = isDisabled(node)

  t.notOk(
    expected,
    'should return false if does not have class or attribute disabled')
  t.end()
})

test('checkbox behaviour', t => {
  const spanNode = document.createElement('span')
  spanNode.id = 'span'

  const divNode = document.createElement('div')
  divNode.id = 'div'

  document.body.appendChild(spanNode)
  document.body.appendChild(divNode)

  const span = document.getElementById('span')
  const div = document.getElementById('div')

  checkboxBehaviour({
    target: span
  })

  t.ok(
    span.classList.contains('is-checked'),
    'should add the class checked')
  t.ok(
    div.hasAttribute('checked'),
    'should add the attribute checked')

  checkboxBehaviour({
    target: span
  })

  t.notOk(
    span.classList.contains('is-checked'),
    'should remove the class checked')
  t.notOk(
    div.hasAttribute('checked'),
    'should remove the attribute checked')

  span.classList.add('is-disabled')

  checkboxBehaviour({
    target: span
  })

  t.notOk(
    span.classList.contains('is-checked'),
    'should keep the state from the last action')
  t.notOk(
    div.hasAttribute('checked'),
    'should keep the state from the last action')

  t.end()
})

test('hide elements', t => {
  const node = document.createElement('span')
  hide(node)
  const actual = node.style.display
  const expected = 'none'

  t.equal(actual, expected, 'should set display to none')
  t.end()
})

test('create checkbox', t => {
  const node = createCheckbox('checkbox', null, null)
  const actual = node.className
  const expected = 'checkbox'

  t.equal(actual, expected, 'add checkbox class to element')
  t.end()
})

test('create checkbox', t => {
  const node = createCheckbox('checkbox', true, null)
  const actual = node.className
  const expected = 'checkbox is-checked'

  t.equal(actual, expected, 'add checkbox and checked class to element')
  t.end()
})

test('create checkbox', t => {
  const node = createCheckbox('checkbox', null, true)
  const actual = node.className
  const expected = 'checkbox is-disabled'

  t.equal(actual, expected, 'add checkbox and disabled class to element')
  t.end()
})

test('create checkbox', t => {
  const node = createCheckbox('checkbox', true, true)
  const actual = node.className
  const expected = 'checkbox is-checked is-disabled'

  t.equal(
    actual, expected, 'add checkbox, checked and disabled class to element')
  t.end()
})

test('checkbox main', t => {
  const div = document.createElement('div')
  div.id = 'checkbox-wrapper'

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.classList.add('checkbox')

  div.appendChild(input)
  document.body.appendChild(div)

  checkbox('Chrome', 'checkbox')

  const actual = [].slice
    .call(document.getElementById('checkbox-wrapper').children).length
  const expected = 1

  t.equal(actual, expected, 'if chrome browser should not add a element')
  t.end()
})

test('checkbox main', t => {
  checkbox('Firefox', 'checkbox')

  const actual = [].slice
    .call(document.getElementById('checkbox-wrapper').children).length
  const expected = 2

  t.equal(actual, expected, 'if firefox browser should add a element')
  t.end()
})

test('firefox compat', t => {
  const div = document.createElement('div')
  div.id = 'firefox-compat'

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.classList.add('firefox-checkbox')
  input.setAttribute('checked', '')

  div.appendChild(input)
  document.body.appendChild(div)

  firefoxCompat('firefox-checkbox')

  const actual = [].slice
    .call(document.getElementById('firefox-compat').children).length
  const expected = 2

  t.equal(actual, expected, 'should add a node before the input')
  t.end()
})
