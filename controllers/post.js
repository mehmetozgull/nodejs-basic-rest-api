import Post from '../models/post.js';

const createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(201).json({
            newPost
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const posts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            posts
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const post = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.status(200).json({
            post
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            post
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id, req.body, { new: true });
        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const searchPost = async (req, res) => {
    const { search, tag } = req.query;

    try {
        const title = new RegExp(search, 'i');
        const post = await Post.find({ $or: [{title}], tag: { $in: tag.split(',') } });
        res.status(200).json({
            post
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export {
    createPost,
    posts,
    post,
    updatePost,
    deletePost,
    searchPost
}