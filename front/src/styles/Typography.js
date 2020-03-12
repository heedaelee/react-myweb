import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const BaseTypography = ({ component, className, children}) => {
  return <Typography {...{component, className}}>{children}</Typography>;
};

const useStyles = makeStyles({
  Tag1 :props => ({
    fontSize : "1rem",
    lineHeight: "2rem",
    color:"#999",
  })
});

const classes = useStyles();

export const Tag1 = props => {
  const { component = "span", className, ...others} = props;
  return (
    <BaseTypography className={`${classes.Tag1} ${className}`} {...{ component, ...others}}/>
  )
}