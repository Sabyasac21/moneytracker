import React from "react";
import { Flex, Progress } from "antd";

const ProgressBar = ({ data }) => {
  const n_data = Math.round(data.value)
  // console.log(n_data);
  return <Flex gap="small" vertical>
      <Progress
        percent={n_data}
        strokeColor="purple"
        style={{ height: "22px" }}
      />
    </Flex>
  
};

export default ProgressBar;
