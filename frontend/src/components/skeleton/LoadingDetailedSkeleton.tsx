import { StyledStack } from './StyledLoadingSkeleton';
import Skeleton from '@mui/material/Skeleton';

function LoadingDetailedSkeleton() {
  return (
    <StyledStack spacing={1}>
        <Skeleton variant="circular" width={50} height={50}/>
        <Skeleton variant="rectangular" width={500} height={200} />
    </StyledStack>
  )
}

export default LoadingDetailedSkeleton
