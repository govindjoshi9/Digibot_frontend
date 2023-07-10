import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { getLevelBonus } from '../../redux/user';

export default function StakingBonusPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch staking bonus data from the API
      const res = await getLevelBonus(); // Replace with your API call
      console.log(res);
      if (Array.isArray(res?.data)) {
        // Map the data to the desired structure
        const mappedData = res.data.map((item, index) => ({
          id: index + 1,
          date: format(new Date(item.calculate_date), 'dd-MM-yyyy'),
          memberUserId: item.member_user_id,
          walletAmount: item.net_amt,
          magic_pool: item.magic_pool,
          royal_pool: item.royal_pool
        }));
        setRows(mappedData);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'Id' },
    { field: 'date', headerName: 'Date' },
    { field: 'memberUserId', headerName: 'User Id', hide: true },
    { field: 'walletAmount', headerName: 'Level Income', width: 120 },
    { field: 'magic_pool', headerName: 'Magic Pool', width: 120 },
    { field: 'royal_pool', headerName: 'Royal Pool', width: 120 },
    { field: 'walletAmount', headerName: 'Net evel Income', width: 120 }
  ];

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        autoPageSize
        showToolbar
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        sx={{ background: '#fff', padding: 2, borderRadius: 4 }}
      />
    </div>
  );
}
