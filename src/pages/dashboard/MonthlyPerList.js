/* eslint-disable import/no-unresolved */
import { useEffect } from 'react';

// material
import {
  Card,
  Table,
  CardHeader,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  Avatar,
  TableContainer,
  Divider,
  Box
} from '@material-ui/core';

import Label from 'src/components/Label';
import { sentenceCase } from 'change-case';
import format from 'date-fns/format';
import { useDispatch, useSelector } from '../../redux/store';
import { getAnnumBonus } from '../../redux/slices/user';

import Scrollbar from '../../components/Scrollbar';

export default function ReferralList() {
  const dispatch = useDispatch();
  const { annumBonus } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAnnumBonus());
  }, [dispatch]);
  return (
    <Card>
      <CardHeader title="Annum Bonus List " sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer eContainer sx={{ minWidth: 720 }}>
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
              {annumBonus?.income_amt === 0 ? (
                <>
                  <Box m={4} display="flex" justifyContent="center">
                    <Typography variant="h4">No Data Found</Typography>
                  </Box>
                </>
              ) : (
                <>
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
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />
    </Card>
  );
}
