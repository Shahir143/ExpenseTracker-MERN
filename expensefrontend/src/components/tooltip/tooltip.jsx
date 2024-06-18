import classes from "./tooltip.module.css";

export const tooltip = ({ message }) => {
  const expectedMessage = [
    "Invalid email format",
    "password requirement not meet",
    "passwords do not match",
  ];
  const isValidMessage = expectedMessage.includes(message);

  return (
    <div className={classes["tooltip"]} data-testid={"tooltip-test"}>
      {isValidMessage ? message : "something went wrong"}
    </div>
  );
};
