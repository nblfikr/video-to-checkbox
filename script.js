

let canvas, context, video
let size = 20

function init() {
	video = document.createElement('video')
	video.src = `./winda_utami_${size}.mp4`
	video.autoplay = true
	video.loop = true

	canvas = document.createElement('canvas')
	canvas.width = size
	canvas.height = size

	context = canvas.getContext('2d')

	// document.body.appendChild(video)

	video.addEventListener('play', draw)
}

function draw() {
	// clear canvas 
	// context.clearRect(0, 0, canvas.width, canvas.height)
	context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

	// clear checked box 
	let checkboxes = document.getElementsByClassName('checkbox')
	Array.from(checkboxes).map( checkbox => checkbox.checked = false )
	
	let pixel = context.getImageData(0, 0, size, size).data
	
	for (let row=0; row < size; row++) {
		for (let col=0; col < size; col++) {

			const pixel_index = (row + col * size) * 4

			const r = pixel[pixel_index]
			const g = pixel[pixel_index + 1]
			const b = pixel[pixel_index + 2]
			// const a = pixel[pixel_index + 3]

			const grayscale = (r + g + b) / 3

			const number = row + col * size
			if (number > 0) number -+ 4
			if (
				r < 150 &&
				g < 150 &&
				b < 150
			)
			document.getElementById(number).checked = true
		}
	}

	requestAnimationFrame(draw)
}

function setup() {

	let container = document.getElementById('container')
	for (var row=0; row < size; row++) {

		let div = document.createElement('div')
		for (var col=0; col < size; col++) {
    		let checkbox = document.createElement('input')
	    	checkbox.type = 'checkbox'
	    	checkbox.setAttribute('id', col + row * size)
	    	checkbox.setAttribute('class', 'checkbox')

	    	div.appendChild(checkbox)
    	}
    	container.appendChild(div)
    }
}


document.addEventListener('DOMContentLoaded', () => {
	setup()
	init()
})