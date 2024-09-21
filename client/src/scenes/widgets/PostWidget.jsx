import { ChatBubbleOutlineOutlined,FavoriteBorderOutlined,FavoriteOutlined,ShareOutlined } from "@mui/icons-material";
import { Box,IconButton,Divider,Typography,useTheme,InputBase,Button} from "@mui/material";
import FlexBetween from "components/flexbetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/widgetwrapper";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setComments, setPost } from "state";
const PostWidget=({
            postId,
            postUserId,
            name,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
})=>{
    const[isComments,setIsComments]=useState(false);
    const[addComments,setAddComments]=useState("");
    const dispatch=useDispatch();
    const token=useSelector((state)=>state.token);
    const loggedInUserId=useSelector((state)=>state.user._id);
    const isLiked=Boolean(likes[loggedInUserId]);
    const likeCount=Object.keys(likes).length;
    const {palette}=useTheme();
    const main=palette.neutral.main;
const primary=palette.primary.main;

const patchLike=async()=>{
    const response=await fetch(`http://localhost:3001/posts/${postId}/like`,{
        method:"PATCH",
        headers:{Authorization:`Bearer ${token}`,
    "Content-Type":"application/json",},
    body:JSON.stringify({userId:loggedInUserId}),
    });
    const updatedPost=await response.json();
    dispatch(setPost({post:updatedPost}));
};
const patchComment=async()=>{
    try{const response=await fetch(`http://localhost:3001/posts/${postId}/comment`,{
        method:"PATCH",
        headers:{Authorization:`Bearer ${token}`,
    "Content-Type":"application/json",},
    body:JSON.stringify({comment:addComments}),
    });
    if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        // Handle the error, show a message, or return early
        return;
      }
    const {comments}=await response.json();
    dispatch(setComments({postId,comments:comments}));
    setAddComments("");

    } catch (error) {
      console.error("Error:", error);
      // Handle the error
    }
};

return(
    <WidgetWrapper m="2rem 0">
        <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        />
        <Typography
        color={main}
        sx={{mt:"1rem"}}
        >
        {description}
        </Typography>
        {picturePath&&(
            <img 
            width="100%"
            height="auto"
            alt="post"
            style={{borderRadius:"0.75rem",marginTop:"0.75rem"}}
            src={`http://localhost:3001/assets/${picturePath}`}
            />
        )}
        <FlexBetween mt="0.25rem"> 
        <FlexBetween gap="1rem">

            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked?(
                    <FavoriteOutlined sx={{color:primary}}/>
                ):(
                    <FavoriteBorderOutlined/>
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

             <FlexBetween gap="0.3rem">
             <IconButton onClick={()=>setIsComments(!isComments)}>
               <ChatBubbleOutlineOutlined/>
              </IconButton>
              <Typography>{comments.length}</Typography>
             </FlexBetween>

        </FlexBetween>

        <IconButton>
           <ShareOutlined/>
        </IconButton>

        </FlexBetween>
        {isComments&&(
            <Box mt="0.5rem">
                <FlexBetween>
        <InputBase
        placeholder="Add a comment..."
        onChange={(e) => setAddComments(e.target.value)}
        value={addComments}
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "0.5rem 1rem",
          fontSize: "0.9rem",
          mb: "0.5rem",
          mr:"0.5rem"
        }}
      />
      <Button
          disabled={!addComments}
          onClick={patchComment}
          sx={{
              "&:hover":{cursor:"pointer",color:palette.mode === 'dark' ?palette.primary.alt : 'black',
            backgroundColor:palette.mode==='dark'?'lightwhite':palette.primary.default,
            borderRadius: "3rem",
            fontSize: "0.65rem"}
          }}
        >
          Comment
        </Button>
        </FlexBetween>
                {comments.map((comment,i)=>(
                    <Box key={`${name}-${i}`}>
                        <Divider />
                        <Typography sx={{color:main,m:"0.5rem 0",pl:"1rem"}}>
                            {comment}
                        </Typography>
                    </Box>
                ))}
                <Divider />
            </Box>
        )}
    </WidgetWrapper>
);
};
export default PostWidget;