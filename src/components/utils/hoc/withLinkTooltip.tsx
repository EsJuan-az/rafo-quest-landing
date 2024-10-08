import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../../ui/tooltip";
import { FC } from "react";
import { useRouter } from "next/navigation";

// HOC withTooltip
const withLinkTooltip = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  tooltipContent: React.ReactNode,
  path: string,
) => {
  const WithTooltip: FC<P> = (props) => {
    
    const router = useRouter();
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger onClick={() => router.push(path)}>
            <Link href={path}>
              <WrappedComponent {...props} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return WithTooltip;
};

export default withLinkTooltip;