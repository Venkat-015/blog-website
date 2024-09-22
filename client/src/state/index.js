import { createSlice } from "@reduxjs/toolkit";
const initialState={
    mode:"light",
    user:null,
    token:null,
    posts:[],
    image_url:"",
    url:"",
};
export const authSlice=createSlice(
    {
        name:"auth",
        initialState,
        reducers:{
            setMode:(state)=>{
                state.mode=state.mode==="light" ? "dark" : "light";
            },
            setLogin:(state,action)=>{
               state.user=action.payload.user;
               state.token=action.payload.token;
            },
            setLogout:(state)=>{
                state.user=null;
                state.token=null;
            },
            setFriends:(state,action)=>{
                if(state.user){
                    state.user.friends=action.payload.friends;
                    }
                else
                {console.error("User friends non-existent :( ");}
            },
            setComments:(state,action)=>{
                const postId=action.payload.postId;
                const addComments=action.payload.comments;
                const updatedPosts=state.posts.map((post)=>{
                    if(post._id===postId){
                        post.comments=addComments;
                    }
                    return post;
                });
                state.posts=updatedPosts;
            },
            setPosts:(state,action)=>{
                state.posts=action.payload.posts;
            },
            setPost:(state,action)=>{
                const updatedPosts=state.posts.map((post)=>{
                    if(post._id===action.payload.post._id) return action.payload.post;
                    return post;
                });
                state.posts=updatedPosts;
            },
            removePost: (state, action) => {
                const postId = action.payload.postId;
                state.user.posts = state.user.posts.filter(post => post._id !== postId);
              },
            setImageUrl:(state,action)=>{
                state.image_url=action.payload.url;
            },
        },
    }
);
export const {setMode,setLogin,setLogout,setFriends,setComments,setPosts,setPost,setImageUrl,removePost}=authSlice.actions;
export default authSlice.reducer;