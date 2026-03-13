import React from "react";
import Markdown from "react-markdown";

const Response = (props) => {
  return (
    <div>
      <Markdown>{props.data}</Markdown>
    </div>
  );
};

export default Response;
