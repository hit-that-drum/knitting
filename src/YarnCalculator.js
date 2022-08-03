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

const YarnCalculator = () => {
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

export default YarnCalculator;