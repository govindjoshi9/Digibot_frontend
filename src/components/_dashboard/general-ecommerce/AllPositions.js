// material
// import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer
} from '@material-ui/core';
// utils
import mockData from '../../../utils/mock-data';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

const COUNTRY = ['de', 'en', 'fr', 'kr', 'us'];
const CATEGORY = ['CAP', 'Branded Shoes', 'Headphone', 'Cell Phone', 'Earings'];

const MOCK_SALES = [...Array(16)].map((_, index) => ({
  id: mockData.id(index),
  titlePositions: mockData.positions.titlePositions(index),
  sentencePositions: mockData.positions.titlePositions(index),
  descriptionPositions: mockData.positions.titlePositions(index),
  businessPositions: mockData.positions.businessPositions(index),
  bonus: mockData.positions.bonus(index),
  directs: mockData.positions.directs(index),
  stone: mockData.positions.stone(index),
  positionImg: mockData.positions.positionImg(index),
  stoneImg: mockData.positions.stoneImg(index),
  email: mockData.email(index),
  avatar: mockData.image.avatar(index + 8),
  category: CATEGORY[index],
  flag: `/static/icons/ic_flag_${COUNTRY[index]}.svg`,
  total: mockData.number.price(index),
  rank: `Top ${index + 1}`
}));

// ----------------------------------------------------------------------

export default function AllPositions() {
  return (
    <Card sx={{ pb: 3 }}>
      <CardHeader title="All Positions" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Positions</TableCell>
                <TableCell>Required Business</TableCell>
                <TableCell>Bonus</TableCell>
                <TableCell align="right">Stone</TableCell>
                <TableCell align="right">Stone Name</TableCell>
                <TableCell align="right">Required Directs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_SALES.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    borderBottom: '1px solid #ececec',
                    cursor: 'pointer',
                    ':hover': {
                      bgcolor: '#f4f8f1'
                    }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={row.positionImg} src={`/static/mock-images/avatars2/${row.positionImg}`} />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="button"> {row.titlePositions}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.businessPositions}</TableCell>
                  <TableCell>{row.bonus}</TableCell>
                  <TableCell sx={{ float: 'right', maxWidth: '72px', padding: '6px' }}>
                    {row.stoneImg && <img src={`/static/mock-images/stones/${row.stoneImg}.png`} alt="country flag" />}
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="button"> {row.stone}</Typography>
                  </TableCell>
                  <TableCell align="right">{row.directs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
