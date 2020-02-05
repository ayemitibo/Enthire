'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageUploadSchema extends Schema {
  up () {
    this.create('image_uploads', (table) => {
      table.increments()
      table.string("image_url").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('image_uploads')
  }
}

module.exports = ImageUploadSchema
