
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(() => {
      return knex('projects').insert([
        {id: 1, name: 'project1'},
        {id: 2, name: 'project2'},
        {id: 3, name: 'project3'}
      ])
    })
    .then(() => {
      return knex('palettes').insert([
        {
          id: 1, 
          name: 'warm colors', 
          project_id: 1,
          colors: ['#1E2D15','#997719','#92F35C','#185EA7','#E529EE']
        },
        {
          id: 2, 
          name: 'dark colors', 
          project_id: 1,
          colors: ['#E82D41','#2FB9ED','#C2C2E6','#33C314','#BC1234']
        },
        {
          id: 3, 
          name: 'random', 
          project_id: 2,
          colors: ['#499BC9','#84B8E1','#4E6B7B','#3BD4E2','#AED7FC']
        },
        {
          id: 4, 
          name: 'random', 
          project_id: 3,
          colors: ['#6A7F51','#72FC4E','#73ECB8','#084B00','#2E38A4']
        }
      ])
    })
}
