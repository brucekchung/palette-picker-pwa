window.onload = () => setRandomColor()

$('.generate-palette').on('click', setRandomColor)
$('.save-project').on('click', saveProject, addProjectToMenu)
$('.save-palette').on('click', savePalette)
$('.color').on('click', toggleLock)

const colorStore = { current: [{locked: false},{locked: false},{locked: false},{locked: false},{locked: false}] }


function generateRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}

function setRandomColor() {
  const allColors = [$('.one'), $('.two'), $('.three'), $('.four'), $('.five')]

  allColors.forEach((color, i) => {
    const randomColor = generateRandomColor()

    if (!colorStore.current[i].locked) {
      colorStore.current[i] = { randomColor, locked: false }
      color.css('background-color', randomColor)
      color.children('span').text(randomColor)
    }
  }) 
}

function saveProject() {
  const project = $(this).parent().children('input').val()

  fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ project }),
    headers: {'Content-Type': 'application/json'},
  })
}

function addProjectToMenu() {
  const menu = $(this).parents('body').find('#saved-palettes')
  const project = $(this).parent().children('input').val()

  menu.append(`<option value=${project}>${project}</option>`)
} 

function savePalette() {
  const currentProject = $(this).parent('div').find(':selected').text()
  console.log('current: ', currentProject)

}

function toggleLock() {
  const selectedColor = $(this).find('img').toggleClass('hidden')
  const color = $(this).closest('div').children('span').text()

  colorStore.current.forEach(item => {
    if (item.randomColor === color) item.locked = !item.locked
  })
}

