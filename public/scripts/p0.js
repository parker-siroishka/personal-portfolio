'use strict'
const touchObj = {
		$parent: $('.parent'),
		$target: $('.child'),
		startX: 0,
		startY: 0,
		moveX: 0,
		moveY: 0,
		endX: 0,
		endY: 0,
		istouchStart: false,
		boundary({
				origin,
				radius
		}) {
				const {
						sin,
						cos,
						atan2
				} = Math
				const angle = atan2(origin.y, origin.x)
				const limitX = (cos(angle) + 1) * radius
				const limitY = (sin(angle) + 1) * radius

				return {
						limitX,
						limitY
				}
		},
		getPos(ev) {
				const {
						changedTouches,
						touches
				} = ev
				let posX
				let posY
				if (ev.type.indexOf('mouse') >= 0) {
						posX = ev.pageX
						posY = ev.pageY
				} else {
						const touchData = touches.length ? touches : changedTouches
						const [{
								pageX,
								pageY
						}] = touchData
						posX = pageX
						posY = pageY
				}
				return {
						x: posX,
						y: posY
				}
		},
		start(ev) {
				touchObj.$parent = $('.parent')
				touchObj.$target = $('.child')
				const {
						target
				} = ev

				if (touchObj.$target[0] !== target) {
						return
				}

				let {
						getPos
				} = touchObj
				const {
						x,
						y
				} = getPos(ev)

				touchObj.startX = x
				touchObj.startY = y

				touchObj.istouchStart = true
		},
		move(ev) {
				if (!touchObj.istouchStart) {
						return
				}

				let {
						$parent,
						$target,
						boundary,
						getPos
				} = touchObj
				const {
						x,
						y
				} = getPos(ev)

				touchObj.moveX = x
				touchObj.moveY = y

				const {
						top: $parentOffsetTop,
						left: $parentOffsetLeft
				} = $parent.offset()
				const $parentWidth = parseFloat($parent.css('width'))
				const $parentR = ($parentWidth / 2)
				const $parentY = ($parentOffsetTop + $parentR)
				const $parentX = ($parentOffsetLeft + $parentR)

				const {
						top: $targetOffsetTop,
						left: $targetOffsetLeft
				} = $target.offset()
				const $targetWidth = parseFloat($target.css('width'))
				const $targetR = ($targetWidth / 2)
				const $targetY = ($targetOffsetTop + $targetR)
				const $targetX = ($targetOffsetLeft + $targetR)

				const $radius = $parentR - $targetR

				const $SquareR =  $radius ** 2
				const $SquareX = (touchObj.moveX - $parentX) ** 2
				const $SquareY = (touchObj.moveY - $parentY) ** 2

				const $X = touchObj.moveX - $parentOffsetLeft - $targetR
				const $Y = touchObj.moveY - $parentOffsetTop - $targetR

				let $targetLeft = $X
				let $targetTop = $Y

				const {
						limitX,
						limitY
				} = boundary({
						origin: {
								x: $X - $parentR + $targetR,
								y: $Y - $parentR + $targetR
						},
						radius: $radius
				})

				// 圆: 坐标 = (a, b), 半径 = r
				// 点P: 坐标 = (x1, y1)
				// 圆上: (x1 - a) ** 2 + (y - b) ** 2 = r ** 2
				// 圆外: (x1 - a) ** 2 + (y - b) ** 2 > r ** 2
				// 圆内: (x1 - a) ** 2 + (y - b) ** 2 < r ** 2
				if (($SquareX + $SquareY) > $SquareR) {
						console.log('圆外')
						$targetLeft = limitX
						$targetTop = limitY
				}

				$target.css({
						left: $targetLeft + 'px',
						top: $targetTop + 'px'
				})
		},
		end(ev) {
				let {
						getPos,
						$target
				} = touchObj

				const {
						x,
						y
				} = getPos(ev)

				touchObj.endX = x
				touchObj.endY = y

				$target.css({
						left: '45px',
						top: '45px'
				})

				touchObj.istouchStart = false
		}
}

let startEvent = 'mousedown', moveEvent = 'mousemove', endEvent = 'mouseup'

const init = ev => {
		'ontouchstart' in window ? (
				startEvent = 'touchstart',
				moveEvent = 'touchmove',
				endEvent = 'touchend'
		) : ''
		window.addEventListener(startEvent, touchObj.start)
		window.addEventListener(moveEvent, touchObj.move)
		window.addEventListener(endEvent, touchObj.end)
}

window.addEventListener('load', init)