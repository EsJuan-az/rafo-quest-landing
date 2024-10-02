import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { FC } from "react";

// HOC withTooltip
const withTooltip = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  tooltipContent: React.ReactNode,
) => {
  const WithTooltip: FC<P> = (props) => {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
              <WrappedComponent {...props} />
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

export default withTooltip;