const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: false
    },
    director: {
        type: String,
        required: true,
        default: "N/A"
    },
    status: {
        type: String,
        required: true,
        default: "Available"
    },
    star: {
        type: Number,
        required: true,
        default: 5
    },
    length: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: ""
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

VideoSchema.statics = {

    /**
   * Get video by id
   * @param {ObjectId} id - The objectId of video.
   * @returns {Promise<Video, APIError>}
   */
    get(id) {
        return this.findById(id).exec();
    },

    /**
   * List videos in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Video[]>}
   */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find().sort({ createdAt: -1 }).skip(+skip).limit(+limit).exec();
    },

    remove(id) {
        return this.remove({_id: id}).exec();
    }
}

module.exports = mongoose.model('Video', VideoSchema);