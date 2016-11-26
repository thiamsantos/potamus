import test from 'tape'
import browserEnv from 'browser-env'
import button, {
  createRipple,
  positionateRipple,
  getHalf
} from '../../components/button'

browserEnv(['document'])

test('create ripple function', t => {
  const rect = {
    width: 100,
    height: 20
  }
  const rippleClassName = 'ripple'
  const ripple = createRipple(rect, rippleClassName)

  t.ok(
    ripple.classList.contains(rippleClassName),
    'should contains the class ripple')
  t.equal(
    ripple.style.width,
    '100px',
    'should have as width the highest value from rect object')
  t.equal(
    ripple.style.height,
    '100px',
    'should have as height the highest value from rect object')
  t.end()
})

test('positionate ripple', t => {
  const ripple = document.createElement('span')
  positionateRipple(ripple, '100', '200')

  t.ok(
    ripple.classList.contains('is-active'),
    'should add the class show')
  t.equal(
    ripple.style.top,
    '100px',
    'should have second argument as top size')
  t.equal(
    ripple.style.left,
    '200px',
    'should have three argument as left size')
  t.end()
})

test('get half function', t => {
  t.equal(getHalf(4), 2, 'should return the half of a number')
  t.end()
})

test('button main function without a pre-existing ripple', t => {
  const node = document.createElement('button')
  node.getBoundingClientRect = () => ({
    bottom: 153,
    height: 25,
    left: 8,
    right: 33,
    top: 128,
    width: 25
  })
  document.body.scrollLeft = 0
  document.body.scrollTop = 0

  button('ripple')({
    target: node,
    pageX: 51,
    pageY: 28
  })

  const expected = node.children[0]
  t.ok(expected.classList.contains('ripple'), 'should have a ripple node inside the button node')
  t.end()
})

test('button main function with a pre-existing ripple', t => {
  const node = document.createElement('button')
  node.getBoundingClientRect = () => ({
    bottom: 153,
    height: 25,
    left: 8,
    right: 33,
    top: 128,
    width: 25
  })
  const ripple = createRipple(node.getBoundingClientRect(), 'ripple')
  node.appendChild(ripple)
  document.body.scrollLeft = 0
  document.body.scrollTop = 0

  button('ripple')({
    target: node,
    pageX: 51,
    pageY: 28
  })

  const expected = node.children[0]
  t.ok(expected.classList.contains('ripple'), 'should have a ripple node inside the button node')
  t.end()
})
