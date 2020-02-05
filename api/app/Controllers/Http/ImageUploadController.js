'use strict'

const ImageUploaded = use("App/Models/ImageUpload")
const Helpers = use("Helpers");
const Env = use("Env");
/**
 * Resourceful controller for interacting with imageuploads
 */
class ImageUploadController {
  async UploadImage ({ request, response }) {
    try {
      const imageUpload = new ImageUploaded()
      const profilePic = request.file("image", {
        types: ["image"],
        size: "3mb"
      });
      const fileName = `${Date.now()}-${profilePic.clientName}`;
      await profilePic.move(Helpers.publicPath(), {
        name: fileName,
        overwrite: true
      });

      if (!profilePic.moved()) {
        return profilePic.error();
      }

      imageUpload.image_url = `${Env.get("APP_URL")}/${fileName}`;

      await imageUpload.save();

      return response.status(201).send({
        message: "successfully created"
      });
    } catch (error) {
      console.log(error)
    }
  }

  async getAllImages ({ response }) {
    const allImages = await ImageUploaded.query().fetch()

    response.status(200).send({
      message: 'All Images',
      data: allImages
    })
  }

  async deleteImage ({ params: { id }, response }) {
    try {
      console.log(id)
      const Image = await ImageUploaded.find(id)

      await Image.delete()

      return response.status(201).send({
        message: 'deleted successfully'
      })
    } catch (error) {

    }
  }
}

module.exports = ImageUploadController
