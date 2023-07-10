import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getWithdrawReqSummary } from '../../redux/admin';

export default function InvestmentSummary() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from the API
      const res = await getWithdrawReqSummary(); // Replace with your API call
      if (Array.isArray(res?.data)) {
        const mappedData = res.data.map((item, index) => ({
          id: index + 1,
          member_user_id: item.member_user_id,
          member_name: item.member_name,
          contact: item.contact,
          walletAddress: item.walletAddress,
          invest_type: item.invest_type,
          topup_amount: item.invest_package,
          with_date: format(new Date(element.tr_date), 'dd-MM-yyyy'),
          checked: item.checked ? 'Yes' : 'No'
        }));
        setRows(mappedData);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'No.', width: 50 },
    {
      field: 'member_user_id',
      headerName: 'Member User Id',
      width: 150,
      editable: true
    },
    {
      field: 'member_name',
      headerName: 'Member Name',
      width: 150,
      editable: true
    },
    {
      field: 'walletAddress',
      headerName: 'Wallet Address',
      sortable: false,
      width: 250
    },
    {
      field: 'with_date',
      headerName: 'Date',
      sortable: false,
      width: 160
    },
    {
      field: 'topup_amount',
      headerName: 'Topup Amount',
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
