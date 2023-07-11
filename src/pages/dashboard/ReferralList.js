import { useEffect } from 'react';

import {
  Card,
  Table,
  CardHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  Divider,
  Box
} from '@material-ui/core';

import format from 'date-fns/format';
// eslint-disable-next-line import/no-unresolved

import { useDispatch, useSelector } from '../../redux/store';
// eslint-disable-next-line import/named
import { getRefBonus } from '../../redux/slices/user';

// components

import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ReferralList() {
  const dispatch = useDispatch();
  const { refbonus } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getRefBonus());
  }, [dispatch]);

  return (
    <Card>
      <CardHeader title="Reffral Bonus" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>No.</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Member Id</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Income Level</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Income Amt</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Income Percent</TableCell>

                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {refbonus?.income_amt === 0 ? (
                <>
                  <Box m={4} display="flex" justifyContent="center" alignItems="center" sx={{ width: 'fit-content' }}>
                    <Typography variant="h6">No Data Found</Typography>
                  </Box>
                </>
              ) : (
                <>
                  {refbonus?.map((row, ind) => (
                    <TableRow key={ind}>
                      <TableCell>{row.cnt + 1}</TableCell>
                      <TableCell> {format(new Date(row.calculateDate), 'dd MMM yyyy')}</TableCell>
                      <TableCell>{row.incomeMemberId}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{row.incomeLevel}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{row.incomeAmt}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{row.incomePer}</TableCell>
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
