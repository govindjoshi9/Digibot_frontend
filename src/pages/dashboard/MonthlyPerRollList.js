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
// eslint-disable-next-line import/no-unresolved

// redux
// eslint-disable-next-line import/no-unresolved
import Label from 'src/components/Label';
import { sentenceCase } from 'change-case';
import format from 'date-fns/format';
// eslint-disable-next-line import/no-unresolved
import mockData from 'src/utils/mock-data';
import { useDispatch, useSelector } from '../../redux/store';
import { getMonthlyPayrollBonus } from '../../redux/slices/user';
// routes
// hooks
// import {useSettings} from '../../hooks/useSettings';
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
  const { monthlyPayrollBonus } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMonthlyPayrollBonus());
  }, [dispatch]);
  // const mb = monthlyPayrollBonus?.output;
  // console.log(mb);
  const out = monthlyPayrollBonus?.output;
  return (
    <Card>
      <CardHeader title="Monthly Payroll Bonus" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>No.</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Income</TableCell>

                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlyPayrollBonus?.income_amt === 0 ? (
                <>
                  <Box m={4} display="flex" justifyContent="center" alignItems="center" sx={{ width: 'fit-content' }}>
                    <Typography variant="h6">No Data Found</Typography>
                  </Box>
                </>
              ) : (
                <>
                  {out?.map((row) => (
                    <TableRow key={row.Cnt}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2">{row.cnt + 1}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{format(new Date(row.calculate_date), 'dd MMM yyyy')}</TableCell>

                      <TableCell>{row.name}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{row.income_amt}</TableCell>
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
