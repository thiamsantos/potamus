import test from 'tape'
import browserEnv from 'browser-env'
import {
  isFirefox,
  toggleAttribute,
  isDisabled,
  checkboxBehaviour
} from '../../components/checkbox'

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
  node.classList.add('disabled')

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
    span.classList.contains('checked'),
    'should add the class checked')
  t.ok(
    div.hasAttribute('checked'),
    'should add the attribute checked')

  checkboxBehaviour({
    target: span
  })

  t.notOk(
    span.classList.contains('checked'),
    'should remove the class checked')
  t.notOk(
    div.hasAttribute('checked'),
    'should remove the attribute checked')

  span.classList.add('disabled')

  checkboxBehaviour({
    target: span
  })

  t.notOk(
    span.classList.contains('checked'),
    'should keep the state from the last action')
  t.notOk(
    div.hasAttribute('checked'),
    'should keep the state from the last action')

  t.end()
})
