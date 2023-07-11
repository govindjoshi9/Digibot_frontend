/* eslint-disable import/no-unresolved */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import { Box, Stack, Card, Avatar, Typography } from '@material-ui/core';
// utils
import { getTopPerformers } from 'src/redux/slices/user';
import { useDispatch, useSelector } from 'src/redux/store';
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

AuthorItem.propTypes = {
  author: PropTypes.shape({
    team_business: PropTypes.string,
    team_member: PropTypes.string,
    curentRank: PropTypes.string,
    member_name: PropTypes.string
  }),
  index: PropTypes.number
};

function AuthorItem({ author, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={author.member_name} src={author.member_name} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
          {author?.member_name?.toLowerCase()} ({' '}
          {author.curentRank === null ? 'Member' : author?.curentRank?.toLowerCase()} )
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
          $ {fShortenNumber(author?.team_business)}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '15px' }}> {author?.team_member}</Typography>
    </Stack>
  );
}

export default function TopPerformer() {
  const { topPerformance } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopPerformers());
  }, [dispatch]);

  const TopPErformeree = topPerformance?.topPerformer;

  return (
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" mt={2} ml={2}>
          Top Performers
        </Typography>
        <Typography variant="string" mr={3} mt={2} align="right">
          Team
        </Typography>
      </Box>

      <Stack spacing={3} sx={{ p: 3 }}>
        {TopPErformeree?.map((author, index) => (
          <AuthorItem key={index} author={author} index={index} />
        ))}
      </Stack>
    </Card>
  );
}
