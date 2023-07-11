import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
// import userIcon from '@iconify/icons-mdi/user';

// import genderMaleFemale from '@iconify/icons-mdi/gender-male-female';

// import accountBalanceWalletOutline from '@iconify/icons-material-symbols/account-balance-wallet-outline';
// import birthdayCake from '@iconify/icons-mdi/birthday-cake';
// import permPhoneMsg from '@iconify/icons-material-symbols/perm-phone-msg';
// material
import { styled } from '@material-ui/core/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@material-ui/core';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object
};

export default function ProfileAbout({ profile }) {
  const { row } = profile;
  const memberName = row.member_name;
  const memberWalletAddress = row.wallet_address;
  const memberEmail = row.email;
  const memberAddress = row.address;
  const memeberContact = row.contact;
  const memeberUserId = row.member_user_id;
  const memberState = row.state;
  const memberDob = row.member_dob;
  const memberPincode = row.pincode;
  const memberGender = row.gender;

  const wltAddress = memberWalletAddress?.slice(0, 26);

  const memebergeneder = memberGender === null ? 'Undefined ' : `${''} ${memberGender}`;
  const membername = memberName === null ? 'Undefined ' : `${''} ${memberName}`;
  const memberwalletAddress = wltAddress === null ? 'Undefined ' : `${''} ${wltAddress}`;
  const memberemail = memberEmail === null ? 'Undefined ' : `${''} ${memberEmail}`;
  const memberaddress = memberAddress === null ? 'Undefined ' : `${''} ${memberAddress}`;
  const memebercontact = memeberContact === null ? 'Undefined ' : `${''} ${memeberContact}`;
  const memeberuserId = memeberUserId === null ? 'Undefined ' : `${''} ${memeberUserId}`;
  const memberstate = memberState === null ? 'Undefined ' : `${''} ${memberState}`;
  const memberdob = memberDob === null ? 'Undefined ' : `${''} ${memberDob}`;
  const memberpincode = memberPincode === null ? 'Undefined ' : `${''} ${memberPincode}`;
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{}</Typography>
        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            Name :
            <Link component="span" variant="subtitle2" color="text.primary">
              {`${''} ${membername}`}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          {/* <IconStyle icon={userIcon} /> */}
          <Typography variant="body2">
            User Id :
            <Link component="span" variant="subtitle2" color="text.primary">
              {`${''} ${memeberuserId}`}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          {/* <IconStyle icon={accountBalanceWalletOutline} width="28" /> */}
          <Typography variant="body2">
            wallet address :
            <Link component="span" variant="subtitle2" color="text.primary">
              {`${''} ${memberwalletAddress}`}....
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          {/* <IconStyle icon={genderMaleFemale} width="28" /> */}
          <Typography variant="body2">Gender : {memebergeneder}</Typography>
        </Stack>
        <Stack direction="row">
          {/* <IconStyle icon={birthdayCake} width="28" /> */}
          <Typography variant="body2">Dob : {`${''} ${memberdob}`}</Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {memberaddress}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">{memberemail}</Typography>
        </Stack>
        <Stack direction="row">
          {/* <IconStyle icon={permPhoneMsg} width="28" /> */}
          <Typography variant="body2">
            Contact :
            <Link component="span" variant="subtitle2" color="text.primary">
              {`${''} ${memebercontact}`}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">State : {`${''} ${memberstate}`}</Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">Pincode : {`${''} ${memberpincode}`}</Typography>
        </Stack>
        {/**
<Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            {role} at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack>
*
        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Stack>
*/}
      </Stack>
    </Card>
  );
}
