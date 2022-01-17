import { StyledSkeleton } from "./StyledLoadingSkeleton";

function LoadingSkeleton() {
  var rows = [];
  for (let i = 0; i < 6; i++) {
    rows.push(<StyledSkeleton variant="rectangular"></StyledSkeleton>);
  }
  return <>{rows}</>;
}

export default LoadingSkeleton;
