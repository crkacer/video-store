const Video = require('./video.model');
/**
 * Get Video by id
 * @param {id} req 
 * @return {Video} 
 */
function load(req, res, next) {
  const indx = req.params.id;
  return Video.get(indx)
    .then(video => {
      req.video = video;
      return res.json(video);
    })
    .catch(e => next(e));
}
/**
 * Create video
 * @param {Video} req 
 * @return {Video} Saved video
 */
function create(req, res, next) {
  const params = req.body;
  const video = new Video({
      title: params.title,
      image: params.image,
      genre: params.genre,
      director: params.director,
      status: params.status,
      star: params.star,
      length: params.length,
      description: params.description
  });

video.save()
  .then(savedVideo => res.json(savedVideo))
  .catch(e => next(e));
}

/**
 * 
 * @param {id} req 
 * @return {Video} 
 */
function update(req, res, next) {
  const {id} = req.params;
  Video.get(id)
  .then(video => {
    video.title = req.body.title;
    video.image = req.body.image;
    video.description = req.body.description;
    video.genre = req.body.genre;
    video.director = req.body.director;
    video.status = req.body.status;
    video.star = req.body.star;
    video.length = req.body.length;
    video.save()
      .then(savedVideo => res.json(savedVideo))
      .catch(e => next(e));
  })
  .catch(e => next(e));
  
}

/**
 * Get video list.
 * @property {number} req.query.skip 
 * @property {number} req.query.limit 
 * @returns {Video[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Video.list({ limit, skip })
    .then(videos => res.json(videos))
    .catch(e => next(e));
}

/**
 * Delete video.
 * @returns {Video}
 */
function remove(req, res, next) {
  const id = req.params.id;
  Video.deleteOne({_id: id})
    .then(deletedVideo => res.json(deletedVideo))
    .catch(e => next(e));
}
/**
 * 
 * @param {image} req 
 * @return {message, location} 
 */

function upload(req, res, next) {
  res.json({'message': 'File uploaded successfully', 'location': req.image_upload_url});
}

function search(req, res, next) {
  const text = req.query.text;
  Video.search(text)
    .then(videos => res.json(videos))
    .catch(e => next(e));
}



module.exports = { load, create, update, list, remove, upload, search };
