
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.specificType('colors', 'text[]')
      table.dropColumn('color1')
      table.dropColumn('color2')
      table.dropColumn('color3')
      table.dropColumn('color4')
      table.dropColumn('color5')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.dropColumn('colors')
    })
  ])
}
