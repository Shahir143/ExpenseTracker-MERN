import React from "react";
import classes from "./modal.module.css";
import ReactDom from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.Backdrop}></div>;
};
const ModalOverLay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
export const modal = () => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop />,
        document.getElementById("overlay-root")
      )}
      ,
      {ReactDom.createPortal(
        <ModalOverLay>{props.children}</ModalOverLay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
