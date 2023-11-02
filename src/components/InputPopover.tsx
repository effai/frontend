import React, { FunctionComponent, HTMLAttributes } from 'react';
import { Popover, Typography } from '@mui/material';

const InputPopover: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & { popoverContent: string; isAuthenticated: boolean }
> = ({children, className, popoverContent, isAuthenticated}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!isAuthenticated) {
      setAnchorEl(event.currentTarget);
    }
  };
  
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  
  return (
    <div className={`${className} w-full`}>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none'
        }}
        disableScrollLock
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: -10, horizontal: 0
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{p: 1}}>{popoverContent}</Typography>
      </Popover>
    </div>
  );
}
export default InputPopover;