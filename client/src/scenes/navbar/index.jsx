import { useState } from "react";
import { Box ,
    IconButton,
    Typography,
    InputBase,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch,useSelector } from "react-redux";
import { setMode,setLogout, } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/flexbetween";
const Navbar=()=>{
    const [isMobileMenuToggled,setIsMobileMenuToggled]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>state.user);
    const isNonMobileScreens=useMediaQuery("(min-width:1000px)");
    const theme=useTheme();
    const neutralLight=theme.palette.neutral.light;
    const dark=theme.palette.neutral.dark;
    const background=theme.palette.background.default;
    const primaryLight=theme.palette.primary.light;
    const alt=theme.palette.background.alt;
    const fullName=`${user.firstName} ${user.lastName}`;
    return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
            <Typography fontWeight="bold"
            fontSize="clamp(1rem,2rem,2.25rem)"
            color="primary"
            onClick={()=>navigate("/home")}
            sx={{
                "&:hover":{
                    color:primaryLight,
                    cursor:"pointer",
                }
            }} 
            >Blaze</Typography>
            {isNonMobileScreens && (<FlexBetween backgroundColor={neutralLight} borderRadius="9px " gap="3rem" padding="0.1rem 1.5rem"> 
                <InputBase placeholder="Search..."/>
                <IconButton>
                    <Search />
                    </IconButton>
            </FlexBetween>)}
        </FlexBetween>
{isNonMobileScreens ? (
    <FlexBetween gap="2rem">
        <IconButton onClick={()=>dispatch(setMode())}>
          {theme.palette.mode==="dark" ? (
            <DarkMode sx={{fontSize:"25px"}}/>
          ):(<LightMode sx={{color:dark,fontSize:"25px"}}/>)}
        </IconButton>
        <Message sx={{fontSize:"25px"}} />
        <Notifications sx={{fontSize:"25px"}} />
        <Help sx={{fontSize:"25px"}} />
        <FormControl variant="standard" value={fullName}>
            <Select
                value={fullName}
                sx={{
                    backgroundColor:neutralLight,
                    width:"150px",
                    borderRadius:"0.25rem",
                    p:"0.25rem 1rem",
                    "& .MuiSvgIcon-root":{
                        pr:"0.25rem",
                        width:"3rem",
                    },
                    "& .MuiSelect-select:focus":{
                        backgroundColor:neutralLight
                    }
                }}
                input={<InputBase />}
             >
                <MenuItem value={fullName}>
                   <Typography>{fullName}</Typography>
                    <MenuItem onClick={()=>dispatch(setLogout())}>Log Out </MenuItem>
                </MenuItem>
            </Select>
        </FormControl>

    </FlexBetween>
    ):(
    <IconButton
       onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}
    >
         
    </IconButton>)}
    </FlexBetween>
};
export default Navbar;