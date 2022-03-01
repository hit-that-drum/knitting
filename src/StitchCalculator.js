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
})`
  
`

const SubmitButton = styled.button`
  width: 85px;
  height: 35px;
`

const StitchCalculator = () => {
  const [basictStsNum, setBasicStsNum] = useState(0);
  const [heelflapStsNum, setHeelflapStsNum] = useState(0);
  const [cuffRowsNum, setCuffRowsNum] = useState(0);
  const [legRowsNum, setLegRowsNum] = useState(0);
  const [heelflapRowsNum, setHeelflapRowsNum] = useState(0);
  const [totalStsResult, setTotalStsResult] = useState(0);

  const onBasicStsNumChange = (e) => {
    setBasicStsNum(e.target.value);
  }

  const onCuffRowsNumChange = (e) => {
    setCuffRowsNum(e.target.value);
  }

  const onLegRowsNumChange = (e) => {
    setLegRowsNum(e.target.value);
  }

  const onHeelflapStsNumChange = (e) => {
    setHeelflapStsNum(e.target.value);
  }

  const onHeelflapRowsNumChange = (e) => {
    setHeelflapRowsNum(e.target.value);
  }

  const handleCalculate = () => {
    setTotalStsResult(
      // cuff 단 총 코 갯수
      (basictStsNum * cuffRowsNum)
      + 
      // leg 단 총 코 갯수
      (basictStsNum * legRowsNum)
      +
      // heel flap 단 갯수
      (heelflapStsNum * heelflapRowsNum)
      );
  }

  // Enter key 치면 Submit
  const onKeyPressSts = (e) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  }
  
  const [yarnLength, setYarnLength] = useState(0);
  const [yarnLengthYards, setYardLengthYards] = useState(0);
  const [yarnLengthMeter, setYardLengthMeter] = useState(0);

  const [yarnWeight, setYarnWeight] = useState(0);
  const [yarnLengthYardsPerGram, setyYarnLengthYardsPerGram] = useState(0);
  const [yarnLengthMeterPerGram, setyYarnLengthMeterPerGram] = useState(0);

  const onYarnLength = (e) => {
    setYarnLength(e.target.value);
  }

  const onYarnWeight = (e) => {
    setYarnWeight(e.target.value);
  }
  
  const handleYarnLengthYards = (e) => {
    setYardLengthMeter(yarnLength * 0.9144);
    setYardLengthYards(yarnLength);
    setyYarnLengthYardsPerGram(yarnLengthYards / yarnWeight);
    setyYarnLengthMeterPerGram(yarnLengthMeter / yarnWeight);
  }
  
  const handleYarnLengthMeter = (e) => {
    setYardLengthYards(yarnLength * 1.09361);
    setYardLengthMeter(yarnLength);
    setyYarnLengthYardsPerGram(yarnLengthYards / yarnWeight);
    setyYarnLengthMeterPerGram(yarnLengthMeter / yarnWeight);
  }
  
  return (
    <>
      <div>
        <BasicStitch>STARTING STS NUMBER</BasicStitch>
        <NumberInput onChange={onBasicStsNumChange} />
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
      </div>
      <div>
        <BasicStitch>HEEL FLAP ROWS</BasicStitch>
        <NumberInput onChange={onHeelflapRowsNumChange} onKeyPress={onKeyPressSts} />
      </div>
      <div>
        <SubmitButton type="submit" onClick={handleCalculate}>SUBMIT</SubmitButton>
      </div>
      <div>
        <div>총 코 갯수: {totalStsResult}</div>
      </div>

      <hr></hr>
      
      <div>
        <BasicStitch>YARN LENGTH</BasicStitch>
        <NumberInput onChange={onYarnLength} />
        <SubmitButton type="submit" onClick={handleYarnLengthYards}>yards</SubmitButton>
        <SubmitButton type="submit" onClick={handleYarnLengthMeter}>meter</SubmitButton>
      </div>
      <div>
        <BasicStitch>YARN WEIGHT</BasicStitch>
        <NumberInput onChange={onYarnWeight} />
      </div>
      <div>
        <div>실 길이(yards): {yarnLengthYards} yd</div>
        <div>실 길이(meter): {yarnLengthMeter} m</div>
        <div>1g 당 실 길이(yards): {yarnLengthYardsPerGram} yd</div>
        <div>1g 당 실 길이(meter): {yarnLengthMeterPerGram} m</div>
      </div>
    </>
  );
};

export default StitchCalculator;