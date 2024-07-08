import { Paper } from "@mui/material";
import React from "react";

const style = {
    paperContainer: {
        backgroundColor: "#F2F4F8",
		height:"100%",
        width:"100%",
        zIndex:"0",
        position: "absolute"
		
    }
};

const AppPaperScreen = (props) => {
	return (
		<Paper style={style.paperContainer}>
            {props.children}
		</Paper>
	);
};

export default AppPaperScreen;