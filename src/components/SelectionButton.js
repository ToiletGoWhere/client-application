import React from "react";
import styled from "styled-components";

const SelectionButtonActive = styled.div`
  height: 40px;
  width: 50px;
  border-radius: 5px;
  cursor: pointer;
  background: linear-gradient(
    -45deg,
    #4169e1,
    #7363d6,
    #925dc8,
    #a858ba,
    #b855ab,
    #c3549c
  );
  text-align: center;
  color: #fff;
  box-sizing: border-box;
  padding-top: 7px;
`;
const SelectionButtonDeactivated = styled.div`
  height: 40px;
  width: 50px;
  border-radius: 5px;
  cursor: pointer;
  background: #fff;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
  padding-top: 7px;
  border: #4169e1 1px solid;
`;
const SelectionButton = props => {
  const { active, onClick, children } = props;
  if (active) {
    return <SelectionButtonActive>{children}</SelectionButtonActive>;
  } else
    return (
      <SelectionButtonDeactivated onClick={onClick}>
        {children}
      </SelectionButtonDeactivated>
    );
};
export default SelectionButton;
