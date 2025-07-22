import { Skeleton, SkeletonProps } from 'antd';
import './SkeletonLoader.scss';

interface Props extends SkeletonProps {
  width?: string;
  height?: string;
}

const AppSkeleton = ({width="100%",height="52px" ,...props }: Props) => {
  return (
    <Skeleton.Node 
      active 
      {...props}
      style={{
        borderRadius: 8,
        backgroundColor: 'rgb(var(--TW-primary-color))',
        width:width,
        height:height,
        opacity:"10%"
      }}
    
    />
  );
};

export default AppSkeleton;
