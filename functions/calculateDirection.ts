interface Props {
  x: number;
  y: number;
}

export function getAngle({ x, y }: Props) {
  return ((Math.PI + Math.atan2(-x, -y)) * 180) / Math.PI;
}
