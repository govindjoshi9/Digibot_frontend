import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { Icon } from '@iconify/react';

import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Menu,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer
} from '@material-ui/core';
// utils
import mockData from '../../../utils/mock-data';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const MOCK_BOOKINGS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  email: mockData.email(index),
  name: mockData.name.fullName(index),
  reflink: mockData.name.reflink(index),
  status: mockData.name.status(index),
  avatar: mockData.image.avatar(index),
  checkIn: mockData.time(index),
  checkOut: mockData.time(index),
  phoneNumber: mockData.phoneNumber(index)
}));

// ----------------------------------------------------------------------

MoreMenuButton.propTypes = {
  onDownload: PropTypes.func,
  onPrint: PropTypes.func,
  email: PropTypes.string,
  reflink: PropTypes.string,
  onShare: PropTypes.func
};

function MoreMenuButton({ onDownload, onPrint, onShare, email, reflink }) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 300, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onDownload}>
          <Icon icon={downloadFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            {email}
          </Typography>
        </MenuItem>
        <MenuItem onClick={onPrint}>
          <Icon icon={printerFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Print
          </Typography>
        </MenuItem>
        <MenuItem onClick={onShare}>
          <Icon icon={shareFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            {reflink.slice(0, 32)}...
          </Typography>
        </MenuItem>
        <Divider />
      </Menu>
    </>
  );
}

export default function MyTeamList() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const handleClickDownload = () => {};
  const handleClickPrint = () => {};
  const handleClickShare = () => {};
  const handleClickDelete = () => {};

  return (
    <>
      <Card>
        <CardHeader title="My Teams" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 240 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Data of Creation</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Business</TableCell>
                  <TableCell sx={{ minWidth: 200 }}>Team</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Team Business</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_BOOKINGS.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={row.name} src={row.avatar} />
                        <Typography variant="subtitle2">{row.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={
                          (row.status === 'Active' && 'success') || (row.status === 'Inactive' && 'error') || 'error'
                        }
                      >
                        {sentenceCase(row.status)}
                      </Label>
                    </TableCell>

                    <TableCell>{format(new Date(row.checkIn), 'dd MMM yyyy')}</TableCell>
                    <TableCell>{format(new Date(row.checkOut), 'dd MMM yyyy')}</TableCell>

                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{row.roomType}</TableCell>

                    <TableCell align="right">
                      <MoreMenuButton
                        onDownload={handleClickDownload}
                        onPrint={handleClickPrint}
                        onShare={handleClickShare}
                        onDelete={handleClickDelete}
                        email={row.email}
                        reflink={row.reflink}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to="#"
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Icon icon={arrowIosForwardFill} />}
          >
            View All
          </Button>
        </Box>
      </Card>
    </>
  );
}
