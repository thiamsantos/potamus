import test from 'tape'
import browserEnv from 'browser-env'
import {
  validate
} from '../../components/text-field'

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
