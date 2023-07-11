/* eslint-disable no-plusplus */
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
  Box,
  Stack
} from '@material-ui/core';

import format from 'date-fns/format';
// eslint-disable-next-line import/no-unresolved

import { useDispatch, useSelector } from '../../redux/store';
// eslint-disable-next-line import/named
import { mintingSummaryapi } from '../../redux/slices/user';

// components

import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ReferralList() {
  let count = 1;
  const dispatch = useDispatch();
  const { mintingSummary } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(mintingSummaryapi());
  }, [dispatch]);

  return (
    <Card>
      <CardHeader title="Minting Summary" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120 }}>No.</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Invest Amount</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Minting GUSD</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Minting XPIC</TableCell>
                <TableCell sx={{ minWidth: 120 }}>Nft Status</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Autostack Status</TableCell>

                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {mintingSummary?.length === 0 ? (
                <>
                  <Box m={4} display="flex" justifyContent="center" alignItems="center" sx={{ width: 'fit-content' }}>
                    <Typography variant="h6">No Data Found</Typography>
                  </Box>
                </>
              ) : (
                <>
                  {mintingSummary?.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2">{count++}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{format(new Date(row.date * 1000), 'dd MMM yyyy')}</TableCell>

                      <TableCell>{row.invest_package}</TableCell>
                      <TableCell>{row.mintingGUSD}</TableCell>
                      <TableCell>{row.mintingXPIC}</TableCell>
                      <TableCell>{row.nftStatus}</TableCell>
                      <TableCell>{row.autostackStatus === 0 ? 'Off' : 'On'}</TableCell>
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
