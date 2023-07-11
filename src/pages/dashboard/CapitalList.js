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

import { useDispatch, useSelector } from '../../redux/store';
import { getCapitalBonus } from '../../redux/slices/user';
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function ReferralList() {
  const dispatch = useDispatch();
  const { capitalBonus } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCapitalBonus());
  }, [dispatch]);
  const checkDataArr = capitalBonus?.output;

  return (
    <Card>
      <CardHeader title="Capital Bonus List " sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer eContainer sx={{ minWidth: 720 }}>
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
              {checkDataArr?.length === 0 ? (
                <>
                  <Box m={4} display="flex" justifyContent="center" alignItems="center" sx={{ width: 'fit-content' }}>
                    <Typography variant="h6">No Data Found</Typography>
                  </Box>
                </>
              ) : (
                <>
                  {checkDataArr?.map((row, ind) => (
                    <TableRow key={row.cnt}>
                      <TableCell>
                        <Typography variant="subtitle2">{row.cnt + 1}</Typography>
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
