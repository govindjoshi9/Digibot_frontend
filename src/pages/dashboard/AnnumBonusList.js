import { useEffect } from 'react';

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

// redux
// eslint-disable-next-line import/no-unresolved
import Label from 'src/components/Label';
import { sentenceCase } from 'change-case';
import format from 'date-fns/format';
// eslint-disable-next-line import/no-unresolved
import mockData from 'src/utils/mock-data';
import { useDispatch, useSelector } from '../../redux/store';
import { getAnnumBonus } from '../../redux/slices/user';
// routes
// hooks

// components

import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

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
export default function ReferralList() {
  const dispatch = useDispatch();
  const { annumBonus } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAnnumBonus());
  }, [dispatch]);
  const Arrdata = annumBonus?.output;
  return (
    <Card>
      <CardHeader title="Annum Bonus List " sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer eContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 240 }}>No.</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                <TableCell sx={{ minWidth: 160 }}>income</TableCell>

                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {Arrdata === undefined ? (
                <>
                  <Box m={4} display="flex" justifyContent="center" alignItems="center" sx={{ width: 'fit-content' }}>
                    <Typography variant="h6">No Data Found</Typography>
                  </Box>
                </>
              ) : (
                <>
                  {Arrdata?.map((row) => (
                    <TableRow key={row.cnt}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2">{row.cnt + 1}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{format(new Date(row.calculateDate), 'dd MMM yyyy')}</TableCell>

                      <TableCell>{row.incomeAmt}</TableCell>
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
