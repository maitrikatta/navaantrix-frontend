import "./style/button.css";

function Button(props) {
  const { handler, minWidth, disabled } = props;
  const classNames = "primaryBtn " + (disabled ? "disabled" : "enabled");
  return (
    <button
      style={{ minWidth: minWidth ? minWidth : "100px" }}
      type="button"
      onClick={handler}
      disabled={disabled ? true : false}
      className={classNames}
    >
      {props.children}
    </button>
  );
}
export default Button;
