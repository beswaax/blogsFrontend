import { Button, Container } from "@material-ui/core";
import React, { useState, useImperativeHandle } from "react";

export default React.forwardRef((props, ref) => {
  const [status, setState] = useState(true);

  const toggleStatus = () => setState(!status);

  useImperativeHandle(ref, () => {
    return {
      toggleStatus,
    };
  });

  return (
    <div>
      {status ? (
        <Button
          align="center"
          variant="contained"
          color="primary"
          onClick={toggleStatus}
        >
          {props.buttonLabel}
        </Button>
      ) : null}
      {status ? null : (
        <div>
          {props.children}
          <Button
            variant="contained"
            style={{ backgroundColor: "#3d3d3d", color: "white" }}
            onClick={toggleStatus}
          >
            cancel
          </Button>
        </div>
      )}
    </div>
  );
});
