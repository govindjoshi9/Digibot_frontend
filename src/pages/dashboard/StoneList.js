/* eslint-disable eqeqeq */
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
  TableContainer,
  Divider,
  Box
} from '@material-ui/core';

import format from 'date-fns/format';
import { useDispatch, useSelector } from '../../redux/store';
import { getStoneBonus } from '../../redux/slices/user';
// routes
// hooks
// import {useSettings} from '../../hooks/useSettings';
// components

import Scrollbar from '../../components/Scrollbar';

export default function ReferralList() {
  const dispatch = useDispatch();
  const { stoneBonus } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getStoneBonus());
  }, [dispatch]);
  const stoneArr = stoneBonus?.output;
  return (
    <Card>
      <CardHeader title="Stone Bonus" sx={{ mb: 3 }} />
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
              {stoneArr?.length === 0 ? (
                <>
                  <Box m={4} display="flex" justifyContent="center" alignItems="center" sx={{ width: 'fit-content' }}>
                    <Typography variant="h6">No Data Found</Typography>
                  </Box>
                </>
              ) : (
                <>
                  {stoneArr?.map((row) => (
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
