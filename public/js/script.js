window.onload = () => setRandomColor()

$('.generate-palette').on('click', setRandomColor)
$('.save-project').on('click', saveProject, addProjectToMenu)

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}

function setRandomColor() {
  const allColors = [$('.one'), $('.two'), $('.three'), $('.four'), $('.five')]

  allColors.forEach(color => {
    const randomColor = getRandomColor()

    color.css('background-color', randomColor)
    color.children('span').text(randomColor)
  })
}

function saveProject(e) {
  e.preventDefault()
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


