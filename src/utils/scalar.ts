type MapToRangeParams = {
  min?: number;
  max: number;
  newMin?: number;
  newMax: number;
};

export function mapToRange(value: number, params: MapToRangeParams) {
  const { min = 0, max, newMin = 0, newMax } = params;

  const targetRange = newMax - newMin;
  const valueRange = max - min;
  const valueScaled = (value - min) / valueRange;
  const targetScaled = valueScaled * targetRange;

  return targetScaled + newMin;
}
