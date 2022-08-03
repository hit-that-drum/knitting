import React, { useState } from 'react';
import styled from 'styled-components';
import StitchCalculator from './StitchCalculator';
import StitchPerYarn from './StitchPerYarn';
import YarnCalculator from './YarnCalculator';

const OuterContainer = styled.div`
  border: solid 5px lightgray;
  border-radius: 10px;
  width: 70vw;
  height: 90vh;
  margin: 5vh auto;
  
  div:nth-child(1) {
    font-weight: 800;
    font-size: 25px;
    font-family: 'Merriweather', serif;
    /* margin: 10px 10px 10px 0px; */
  }
`

const TabMenu = styled.ul`
  background-color: #dcdcdc;
  color: rgba(73, 73, 73, 0.5);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  margin-bottom: 5rem;
  text-align: center;
  .submenu {
    width: 100%;
    padding: 10px;
    cursor: grab;
  }
  .focused {
    background-color: #4000c7;
    color: white;
    transition: 0.5s;
  }
  & div.desc {
    text-align: center;
  }
`;

const State = styled.div`
  text-align: center;
`;

const Tab = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "StitchCalculator", content: <StitchCalculator />},
    { name: "YarnCalculator", content: <YarnCalculator />},
    { name: "StitchPerYarn", content: <StitchPerYarn />}
  ]

  const selectMenuHandler = (index) => {
    setCurrentTab(index)
  }

  return (
    <OuterContainer>
      <div>
        <TabMenu>
          {menuArr.map((ele, index) => {
            return (
              <li
                key={index}
                className={currentTab === index ? 'submenu focused' : 'submenu'}
                onClick={() => selectMenuHandler(index)}
              >
                {ele.name}
              </li>
            );
          })}
        </TabMenu>
        <State>
          <div>{menuArr[currentTab].content}</div>
        </State>
      </div>
    </OuterContainer>
  );
};

export default Tab;