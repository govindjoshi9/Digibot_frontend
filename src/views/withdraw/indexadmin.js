import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
const VISIBLE_FIELDS = ['id', 'name', 'rating', 'email', 'country', 'city', 'dateCreated', 'isAdmin', 'phone', 'position'];

export default function QuickFilteringGrid() {
  // const navigate = useNavigate();
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100
  });

  const User = {
    initialState: {
      columns: {
        columnVisibilityModel: {
          ActionButton: false,
          date: false,
          member_user_id: false,
          member_name: false,
          wallet_addres: false,
          reaquest_amount: false
        }
      }
    },
    columns: [],
    rows: [
      {
        id: 1,
        date: '20-5-2023',
        memberUserId: '6873419',
        memberName: 'X PIC',
        walletAddres: '0x54554fhef0dfg',
        requestAmount: 500
      }
    ]
  };

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(() => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)), [data.columns]);
  console.log(User);
  console.log(columns);

  const newcolumn = [
    {
      field: 'id',
      headerName: 'Id'
    },
    {
      field: 'date',
      headerName: 'Date',
      hide: 'true'
    },

    {
      field: 'memberUserId',
      headerName: 'User Id',
      hide: true
    },
    {
      field: 'memberName',
      headerName: 'Name'
    },
    {
      field: 'walletAddres',
      headerName: 'Wallet Address'
    },
    {
      field: 'requestAmount',
      headerName: 'Request Amount'
    }
  ];
  console.log(newcolumn);
  console.log(data);

  return (
    <Box sx={{ height: '82vh', width: 1 }}>
      <DataGrid
        {...data}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        sx={{ background: '#fff', padding: 2, borderRadius: 4 }}
      />
    </Box>
  );
}
