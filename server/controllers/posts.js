import Post from "../models/Post.js";
import User from "../models/User.js";
//create
export const createPost=async(req,res)=>{
    try{
        const {userId,description,picturePath}=req.body;
        const user=await User.findById(userId);
        const newPost=new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[],
        });
        await newPost.save();
        const post=await Post.find();
        res.status(201).json(post);
    }
    catch(err){
        res.status(409).json({message:err.message});
    }
};
//read
export const getFeedPosts=async(req,res)=>{
    try{
    const post=await Post.find();
    res.status(200).json(post);}
    catch(err){
        res.status(404).json({message:err.message});
    }
};
export const getUserPosts=async(req,res)=>{
    try{
        const {userId}=req.params;
        const post=await Post.find({userId});
        res.status(200).json(post);
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
};
//update
export const likePosts=async(req,res)=>{
    try{
        const {id}=req.params;
        const {userId}=req.body;
        const post=await Post.findById(id);
        const isLiked=post.likes.get(userId);
        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId,true);
        }
        const updatedPost=await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true}
        );
        res.status(200).json(updatedPost);
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
};

export const commentPost = async (req, res) => {
try {
  const { id } = req.params;
  const { comment } = req.body;
  const post = await Post.findById(id);

  // Use unshift to add the new comment as the first element of the array
  post.comments.unshift(comment);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { comments: post.comments },
    { new: true }
  );

  res.status(200).json(updatedPost);
} catch (err) {
  res.status(404).json({ message: err.message });
}
};
//delete
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params; // Get the post ID from the request parameters
    const { userId } = req.body;   // Assume userId comes from the body or session (depends on your auth setup)

    // Find the post by postId
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the userId matches the post's userId (i.e., ensure the user owns the post)
    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    // If the user owns the post, delete it
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
