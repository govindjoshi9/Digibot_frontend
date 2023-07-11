import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getBlockedUsers } from '../../redux/admin';

export default function BlockUsers() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from the API
      const res = await getBlockedUsers(); // Replace with your API call
      if (Array.isArray(res?.data)) {
        const mappedData = res.data.map((item, index) => ({
          id: index + 1,
          member_user_id: item.member_user_id,
          member_name: item.member_name,
          contact: item.contact,
          email: item.email,
          wallet_amount: item.wallet_amount
        }));
        setRows(mappedData);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'No.', width: 90 },
    {
      field: 'member_user_id',
      headerName: 'Member User Id',
      width: 150,
      editable: true
    },
    {
      field: 'member_name',
      headerName: 'Member Name',
      sortable: false,
      width: 160
    },
    {
      field: 'contact',
      headerName: 'Contact',
      sortable: false,
      width: 160
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      width: 160
    },
    {
      field: 'wallet_amount',
      headerName: 'Wallet Amount',
      sortable: false,
      width: 160
    },
    {
      field: 'Bot-type',
      headerName: 'Bot-type',
      sortable: false,
      width: 160
    }
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
