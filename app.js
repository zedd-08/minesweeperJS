document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')

	let width = 10
	let bombAmount = 20
	let squares = []
	let isGameOver = false

	//create board
	function createBoard() {
		// get shuffeld game array with random bombs
		const bombArray = Array(bombAmount).fill('bomb')
		const emptyArray = Array(width * width - bombAmount).fill('valid')
		const gameArray = emptyArray.concat(bombArray)
		const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

		for (let i = 0; i < width * width; i++) {
			const square = document.createElement('div')
			square.setAttribute('id', i)
			square.classList.add(shuffledArray[i])
			grid.appendChild(square)
			squares.push(square)

			// adding normal click event listener
			square.addEventListener('click', function (e) {
				click(square)
			})
		}

		// add numbers to boxes
		for (let i = 0; i < squares.length; i++) {
			let total = 0
			const isLeftEdge = (i % width === 0)
			const isRightEdge = (i % width === width - 1)

			if (squares[i].classList.contains('valid')) {
				// check for bomb in the left box
				if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++
				// check for bomb in the top right box
				if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
				// check for bomb in the top box
				if (i > 10 && squares[i - width].classList.contains('bomb')) total++
				// check for bomb in the top left box
				if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++
				// check for bomb in the right box
				if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++
				// check for bomb in the bottom left box
				if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++
				// check for bomb in the bottom box
				if (i < 89 && squares[i + width].classList.contains('bomb')) total++
				// check for bomb in the bottom right box
				if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++
				squares[i].setAttribute('data', total)
			}
		}
	}
	createBoard()

	// the event listener function
	function click(square) {
		if (isGameOver) return
		if (square.classList.contains('checked') || square.classList.contains('flag')) return
		if (square.classList.contains('bomb')) {
			console.log('Game over!')
		} else {
			let total = square.getAttribute('data')
			if (total > 0) {
				square.classList.add('checked')
				square.innerHTML = total
			} else checkSquare(square)
		}
		square.classList.add('checked')
	}

	// check for neighbouring squares if clicked square is empty
	function checkSquare(square) {
		let id = square.id
		const isLeftEdge = (id % width === 0)
		const isRightEdge = (id % width === width - 1)

		setTimeout(() => {
			if (id > 0 && !isLeftEdge) {
				const newID = parseInt(id) - 1
				const newSquare = document.getElementById(newID)
				click(newSquare)
			}
			if (id > 9 && !isRightEdge) {
				const newID = parseInt(id) + 1 - width
				const newSquare = document.getElementById(newID)
				click(newSquare)
			}
			if (id > 10) {
				const newID = parseInt(id) - width
				const newSquare = document.getElementById(newID)
				click(newSquare)
			}
			if (id > 11 && !isLeftEdge) {
				const newID = parseInt(id) - 1 - width
				const newSquare = document.getElementById(newID)
				click(newSquare)
			}
			if (id < 98 && !isRightEdge) {
				const newID = parseInt(id) + 1
				const newSquare = document.getElementById(newID)
				click(newSquare)
			}
			if (id < 90 && !isLeftEdge) {
				const newID = parseInt(id) - 1 + width
				const newSquare = document.getElementById(newID)
				click(newSquare)
			}
			if (id < 89) {
				const newID = parseInt(id) + width
				const newSquare = document.getElementById(newID)
				click(newSquare)
			}
			if (id < 88 && !isRightEdge) {
				const newID = parseInt(id) + 1 + width
				const newSquare = document.getElementById(newID)
				click(newSquare)
			}
		}, 10)
	}
})