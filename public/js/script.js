window.onload = () => {
  setRandomColor()
  loadProjects()
}

$('.generate-palette').on('click', setRandomColor)
$('.save-project').on('click', saveProject)
$('.save-project').on('click', addProjectToMenu)
$('.save-palette').on('click', savePalette)
$('.color').on('click', toggleLock)

const colorStore = [
  {locked: false},
  {locked: false},
  {locked: false},
  {locked: false},
  {locked: false} 
]

async function loadProjects() {
  const rawProjects = await fetch('/api/v1/projects')
  const projects = await rawProjects.json()

  projects.forEach(project => {
    const name = project.name

    $('#saved-palettes').append(`<option value=${name}>${name}</option>`)
  })

  renderProjects(projects)
}

function renderProjects(projectData) {
  projectData.forEach(project => {
    $('.projects').append(`<h2>${project.name}</h2>`)
  })
}

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

    if (!colorStore[i].locked) {
      colorStore[i] = { randomColor, locked: false }
      color.css('background-color', randomColor)
      color.children('span').text(randomColor)
    }
  }) 
}

function saveProject() {
  const project = $(this).parent().children('input').val()

  fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ name: project }),
    headers: {'Content-Type': 'application/json'},
  })
}

function addProjectToMenu() {
  const menu = $(this).parents('body').find('#saved-palettes')
  const project = $(this).parent().children('input').val()

  menu.append(`<option value=${project}>${project}</option>`)
} 

async function savePalette() {
  const projectName = $(this).parent('div').find(':selected').text()
  const rawProjects = await fetch('/api/v1/projects')
  const projects = await rawProjects.json()

  const name = $(this).parent('div').children('input').val()
  const colors = colorStore.map(color => color.randomColor)
  const project_id = projects.find(project => project.name === projectName).id

  fetch('http://localhost:3000/api/v1/palettes', {
    method: 'POST',
    body: JSON.stringify({ 
      name,
      colors,
      project_id
    }),
    headers: {'Content-Type': 'application/json'},
  })
}

function toggleLock() {
  const selectedColor = $(this).find('img').toggleClass('hidden')
  const color = $(this).closest('div').children('span').text()

  colorStore.forEach(item => {
    if (item.randomColor === color) item.locked = !item.locked
  })
}



