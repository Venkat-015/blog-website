import { 
    ManageAccountsOutlined,
EditOutlined,
LocationOnOutlined,
WorkOutlineOutlined, }
from "@mui/icons-material";
import { Box,Typography,Divider,useTheme } from "@mui/material";
import UserImage from "components/userimage";
import FlexBetween from "components/flexbetween";
import WidgetWrapper from "components/widgetwrapper";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
const UserWidget=({userId,picturePath})=>{
    const [user,setUser]=useState(null);
    const {palette}=useTheme();
    const navigate=useNavigate();
    const token=useSelector((state)=>state.token);
    const dark=palette.neutral.dark;
    const 
}