import React from "react";

function MyButton({ onClick }) {
  function loadHandler() {
    onClick();
  }
  return (
    <button type="button" className="Button" onClick={loadHandler}>
      Load more
    </button>
  );
}

export default MyButton;
