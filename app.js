document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')

	let width = 10
	let squares = []

	//create board
	function createBoard() {
		let i = 0;
		while (i < width * width) {
			const square = document.createElement('div')
			square.setAttribute('id', i)
			grid.appendChild(square)
			squares.push(square)
			i++
		}
	}
	createBoard()
})