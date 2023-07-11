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
import { getLevelBonus } from '../../redux/slices/user';
// routes
import Scrollbar from '../../components/Scrollbar';

export default function LevelList() {
  const dispatch = useDispatch();
  const { levelBonus } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getLevelBonus());
  }, [dispatch]);
  const CheckHasData = levelBonus?.output;

  return (
    <Card>
      <CardHeader title="My Level Bonus " sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 240 }}>No.</TableCell>
                <TableCell sx={{ minWidth: 120 }}>income</TableCell>
                <TableCell sx={{ minWidth: 160 }}>date</TableCell>
                <TableCell sx={{ minWidth: 160 }}>level</TableCell>
                <TableCell sx={{ minWidth: 200 }}>member id</TableCell>
                <TableCell sx={{ minWidth: 120 }}>investment amount</TableCell>
                <TableCell sx={{ minWidth: 120 }}>income per </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CheckHasData?.length < 1 ? (
                <>
                  <TableRow p={4} sx={{ width: 'fit-content' }}>
                    <Typography variant="h6" p={4}>
                      No Data Found
                    </Typography>
                  </TableRow>
                </>
              ) : (
                <>
                  {CheckHasData?.map((row, ind) => (
                    <TableRow key={ind}>
                      <TableCell>
                        <Typography variant="subtitle2">{row.cnt + 1}</Typography>
                      </TableCell>
                      <TableCell>{row.income_amt}</TableCell>

                      <TableCell>{format(new Date(row.calculate_date), 'dd MMM yyyy')}</TableCell>
                      <TableCell>{row.income_level}</TableCell>

                      <TableCell>{row.income_member_id}</TableCell>
                      <TableCell>{row.investment_amt}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{row.income_per}</TableCell>
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
