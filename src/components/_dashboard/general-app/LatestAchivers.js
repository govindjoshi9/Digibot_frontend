/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { random, orderBy } from 'lodash';
import { getTopAchivers } from 'src/redux/slices/user';
import { useDispatch, useSelector } from 'src/redux/store';
import { Icon } from '@iconify/react';
import heartFill from '@iconify/icons-eva/heart-fill';
import trophyFilled from '@iconify/icons-ant-design/trophy-filled';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Stack, Card, Avatar, CardHeader, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import mockData from '../../../utils/mock-data';

// ----------------------------------------------------------------------

const MOCK_AUTHORS = [...Array(6)].map((_, index) => ({
  id: mockData.id(index),
  name: mockData.name.fullName(index),
  avatar: mockData.image.avatar(index),
  favourite: random(9999, 19999)
}));

// ----------------------------------------------------------------------

AuthorItem.propTypes = {
  author: PropTypes.shape({
    avatar: PropTypes.string,
    favourite: PropTypes.number,
    name: PropTypes.string
  }),
  index: PropTypes.number
};

function AuthorItem({ author, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={author.name} src={author.avatar} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
          {author.member_name?.toLowerCase()}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary'
          }}
        >
          Stone: {author.stoneName}
        </Typography>
      </Box>
      <Typography style={{ marginRight: '30px', width: '30px', fontSize: '12px' }}>
        {author.curentRank === null ? 'Member' : author.curentRank}
      </Typography>
    </Stack>
  );
}

export default function TopPerformer() {
  const { topAchivers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopAchivers());
  }, [dispatch]);
  const TopAchivr = topAchivers?.topAchivers;

  return (
    <Card>
      <CardHeader title="Latest Achivers" />
      <Stack spacing={3} sx={{ p: 3 }}>
        {TopAchivr?.map((author, index) => (
          <AuthorItem key={author.id} author={author} index={index} />
        ))}
      </Stack>
    </Card>
  );
}
