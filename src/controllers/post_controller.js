import Post from '../models/post_model';

export async function createPost(postFields) {
  // await creating a post
  // return post
  const post = new Post();
  post.title = postFields.title;
  post.tags = postFields.tags.split(/\s+/);
  post.content = postFields.content;
  post.coverUrl = postFields.coverUrl;

  try {
    const savedpost = await post.save();
    return savedpost;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
}

export async function getPosts() {
  // await finding posts
  // return posts
  try {
    const posts = await Post.find();
    return posts.map((e) => {
      return {
        id: e.id,
        title: e.title,
        tags: e.tags,
        coverUrl: e.coverUrl,
      };
    });
  } catch (error) {
    throw new Error(`get posts error: ${error}`);
  }
}

export async function getPost(id) {
  // await finding one post
  // return post
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error('no post found');
    }
    return post;
  } catch (error) {
    throw new Error(`get post by id error: ${error}`);
  }
}
export async function deletePost(id) {
  // await deleting a post
  // return confirmation
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      throw new Error('no post found');
    }
    return post;
  } catch (error) {
    throw new Error(`delete post by id error: ${error}`);
  }
}

export async function updatePost(id, updateData) {
  try {
    // If tags are provided as a string, split them by whitespace
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(/\s+/);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }, // Options to return the updated document and run validators
    );

    if (!updatedPost) {
      throw new Error('Post not found');
    }

    return {
      title: updatedPost.title,
      tags: updatedPost.tags,
      content: updatedPost.content,
      coverUrl: updatedPost.coverUrl,
    };
  } catch (error) {
    throw new Error(`Failed to update post: ${error.message}`);
  }
}
