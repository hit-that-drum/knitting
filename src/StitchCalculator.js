import React, { useState } from 'react';
import styled from 'styled-components';

const BasicStitch = styled.span`
  font-weight: 700;
  font-size: 35px;
`
const NumberInput = styled.input.attrs({
  type: "number",
  min: 0,
  max: 500,
  defaultValue: 0
})``

const SubmitButton = styled.button`
  width: 85px;
  height: 35px;
`

const StitchCalculator = () => {
  const [basictStsNum, setBasicStsNum] = useState(0);
  const [cuffRowsNum, setCuffRowsNum] = useState(0);
  const [legRowsNum, setLegRowsNum] = useState(0);
  const [heelflapStsNum, setHeelflapStsNum] = useState(0);
  const [heelflapRowsNum, setHeelflapRowsNum] = useState(0);
  const [gussetPartStsNum, setGussetPartStsNum] = useState(0);
  const [fromGussettoFoot, setFromGussettoFoot] = useState(0);
  const [footRowsNum, setFootRowsNum] = useState(0);

  const [toeLeftStsNum, setToeLeftStsNum] = useState(0);
  const [toeDecreaseInaRowNum, setToeDecreaseInaRowNum] = useState(0);

  const [toePartStsNum, setToePartStsNum] = useState(0);
  const [totalStsResult, setTotalStsResult] = useState(0);
 
  const onBasicStsNumChange = (e) => {
    setBasicStsNum(Number(e.target.value));
  }

  const onCuffRowsNumChange = (e) => {
    setCuffRowsNum(Number(e.target.value));
  }

  const onLegRowsNumChange = (e) => {
    setLegRowsNum(Number(e.target.value));
  }

  const onHeelflapStsNumChange = (e) => {
    setHeelflapStsNum(Number(e.target.value));
  }

  const onHeelflapRowsNumChange = (e) => {
    setHeelflapRowsNum(Number(e.target.value));
  }

  const onFootRowsNumChange = (e) => {
    setFootRowsNum(Number(e.target.value));
  }

  const onToeLeftStsNumChange = (e) => {
    setToeLeftStsNum(Number(e.target.value));
  }

  const onToeDecreaseInaRowNum = (e) => {
    setToeDecreaseInaRowNum(Number(e.target.value));
  }
  
  // heel turn part
  let restedHeelturnNum = (heelflapStsNum / 2) - 3;
  let heelturnStsNum =(
    heelflapStsNum
    + (heelflapStsNum - restedHeelturnNum)
    + (4 + 2)
    + ((5 + 2) * (((restedHeelturnNum - 2) * 2) + 1))
    );

  // gusset part
  let gussetPickupStsNum = ((heelflapStsNum / 2) + 1) * 2;
  let gussetPlusStsNum = basictStsNum + gussetPickupStsNum;
  let gussetTotalStsNum = 0;
  let fromGussettoFootRowNum = 0;
  const handleGusset = () => {
    for (let i = basictStsNum; i <= gussetPlusStsNum; i++) {
      if (i % 2 === 0 && i <= gussetPlusStsNum) {
        gussetTotalStsNum += ((i + 2) * 2)
        fromGussettoFootRowNum += 2;
      }
    }
    setGussetPartStsNum(gussetTotalStsNum);
    setFromGussettoFoot(fromGussettoFootRowNum);
  }

 // toe part
 let toeTotalStsNum = 0;
 let toeLeftStsNumCalculate = 20;

 const handleToe = () => {
  // 남길코 개수 && 연속줄임단 개수 모두 0
   if (toeLeftStsNum === 0 && toeDecreaseInaRowNum === 0) {
     toeTotalStsNum = 24 + 28 + 32 + 36 + 40;
     for (let i = 44; i < basictStsNum; i++) {
       if (i % 4 === 0 && i < basictStsNum) {
         toeTotalStsNum += (i * 2);
       }
     }
   }
  // 남길코 개수는 사용자지정 && 연속줄임단 개수 0
   else if (toeLeftStsNum !== 0 && toeDecreaseInaRowNum === 0) {
     toeTotalStsNum 
     = (toeLeftStsNum * 5) + (4 + 8 + 12 + 16 + 20);
     for(let i = toeLeftStsNum + 24; i < basictStsNum; i++) {
       if (i % 4 === 0 && i < basictStsNum) {
         toeTotalStsNum += (i * 2);
       }
     }
   }
  // 남길코 개수 0 && 연속줄임단 개수 사용자지정
   else if (toeLeftStsNum === 0 && toeDecreaseInaRowNum !== 0) {
     for (let i = (toeLeftStsNumCalculate + 4); i < (toeLeftStsNumCalculate + 4) + (4 * toeDecreaseInaRowNum); i++) {
       if (i % 4 === 0) {
         toeTotalStsNum += i;
       }
     }
     for (let j = (toeLeftStsNumCalculate + 4) + (4 * toeDecreaseInaRowNum); j < basictStsNum; j++) {
       if (j % 4 === 0 && j < basictStsNum) {
         toeTotalStsNum += (j * 2);
       }
     }
   }
    // 남길코 개수 && 연속줄임단 개수 모두 사용자지정
   else if (toeLeftStsNum !== 0 && toeDecreaseInaRowNum !== 0) {
     for (let i = (toeLeftStsNum + 4); i < (toeLeftStsNum + 4) + (4 * toeDecreaseInaRowNum); i++) {
      if (i % 4 === 0) {
        toeTotalStsNum += i;
      }
     }
     for (let j = (toeLeftStsNum + 4) + (4 * toeDecreaseInaRowNum); j < basictStsNum; j++) {
       if (j % 4 === 0 && j < basictStsNum) {
          toeTotalStsNum += (j * 2);
        }
     }
   }

   setToePartStsNum(toeTotalStsNum);
 };

  const handleCalculate = () => {
    setTotalStsResult(
      Math.floor(
        // cuff 단 총 코 갯수
        (basictStsNum * cuffRowsNum)
        + 
        // leg 단 총 코 갯수
        (basictStsNum * legRowsNum)
        +
        // heel flap 코 갯수
        (heelflapStsNum * heelflapRowsNum)
        +
        // heel turn 코 갯수
        heelturnStsNum
        +
        // gusset sts part 코 갯수
        (
          (heelflapStsNum - (((restedHeelturnNum - 2) * 2) + 1))
          +
          (basictStsNum / 2)
          +
          (((restedHeelturnNum - 2) * 2) + 1)
          +
          gussetPartStsNum
        )
        +
        // foot 단 코 갯수
        (basictStsNum * footRowsNum)
        +
        // toe 코 갯수
        toePartStsNum
      )
    )
  }

  // Enter key 치면 Submit
  const onKeyPressSts = (e) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  }

  const onKeyTabStart = (e) => {
    if (e.key === "Tab") {
      setHeelflapStsNum(
        Math.floor(basictStsNum / 2)
      );
      setHeelflapRowsNum(
        Math.floor(basictStsNum / 2)
      );
    }
  }

  const onKeyTabGusset = (e) => {
    if (e.key === "Tab") {
      handleGusset(basictStsNum);
    }
  }

  const onKeyTabToe = (e) => {
    if (e.key === "Tab") {
      handleToe(basictStsNum);
    }
  }
  
  return (
    <>
      <div>
        <BasicStitch>STARTING STS NUMBER</BasicStitch>
        <NumberInput onChange={onBasicStsNumChange} onKeyDown={onKeyTabStart} />
      </div>
      <div>
        <BasicStitch>CUFF ROWS</BasicStitch>
        <NumberInput onChange={onCuffRowsNumChange} />
      </div>
      <div>
        <BasicStitch>LEG ROWS</BasicStitch>
        <NumberInput onChange={onLegRowsNumChange} />
      </div>
      <div>
        <BasicStitch>HEEL FLAP STS</BasicStitch>
        <NumberInput onChange={onHeelflapStsNumChange} />
        <div>{heelflapStsNum}</div>
      </div>
      <div>
        <BasicStitch>HEEL FLAP ROWS</BasicStitch>
        <NumberInput onChange={onHeelflapRowsNumChange} onKeyDown={onKeyTabGusset}/>
        <div>{heelflapRowsNum}</div>
      </div>
      <div>
        <BasicStitch>HEEL TURN</BasicStitch>
        <div>{heelturnStsNum}</div>
      </div>
      <div>
        <BasicStitch>GUSSET PICK UP STS NUMBER</BasicStitch>
        <div>{gussetPickupStsNum}</div>
      </div>
      <div>
        <BasicStitch>GUSSET PART NUMBER</BasicStitch>
        <div>{gussetPartStsNum}</div>
      </div>
      <div>
        <BasicStitch>Gusset부터 시작한 패턴 단 개수</BasicStitch>
        <div>{fromGussettoFoot}</div>
      </div>
      <div>
        <BasicStitch>FOOT ROWS</BasicStitch>
        <NumberInput onChange={onFootRowsNumChange} />
      </div>
      <div>
        <div>
          <BasicStitch>TOE 남길 코 개수</BasicStitch>
          <NumberInput onChange={onToeLeftStsNumChange} />
        </div>
        <div>
          <BasicStitch>연속으로 줄일 단의 개수</BasicStitch>
          <NumberInput onChange={onToeDecreaseInaRowNum} onKeyPress={onKeyPressSts} onKeyDown={onKeyTabToe} />
        </div>
        <div>
          <BasicStitch>TOE TOTAL STS</BasicStitch>
          <div>{toePartStsNum}</div>
        </div>
      </div>

      <div>
        <SubmitButton type="submit" onClick={handleCalculate}>SUBMIT</SubmitButton>
      </div>
      <div>
        <div totalstsresult={totalStsResult} >총 코 갯수: {totalStsResult}</div>
      </div>

      <hr></hr>
      

    </>
  );
};

export default StitchCalculator;