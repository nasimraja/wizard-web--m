import * as React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LaunchIcon from '@mui/icons-material/Launch';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';

export default function Popup() {
  return (
    <>
    <div className='mu-icon-wrp'>
    <div className='mu-icon'>
    <Tooltip title="refresh metadata">
      <IconButton>
        <RefreshIcon />
      </IconButton>
    </Tooltip>
    </div>
    <div className='mu-icon'>
    <Tooltip title="View on Mirage Gallery Curated">
      <IconButton>
        <LaunchIcon />
      </IconButton>
    </Tooltip>
    </div>
    <div className='mu-icon'>
    <Tooltip title="Share">
      <IconButton>
        <ShareIcon />
      </IconButton>
    </Tooltip>
    </div>
    <div className='mu-icon'>
    <Tooltip title="More">
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Tooltip>
    </div>
    </div>
    </>
  );
}
