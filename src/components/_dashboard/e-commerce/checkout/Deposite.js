import axios from 'axios';

const baseUrl = process.env.PORT || 'https://xpic.live/api/v1/api';

export async function DepositeNow(hash, price, img, autostaking, walletAdd) {
  const accessToken = window.localStorage.getItem('accessToken');
  console.log('hash', hash.blockHash);
  console.log(typeof Number(price), price);
  const response = await axios({
    method: 'post',
    url: `${baseUrl}/Account/Deposit`,
    headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    data: {
      planAmt: price,
      invstType: 'GUSD',
      hashcode: hash.blockHash,
      nftToken: img,
      autostacked: autostaking,
      walletAddress: walletAdd,
      GusdQty: price,
      XpicQty: 0,
      xPicLQty: 0
    }
  });
  console.log(response);
  return response;
}
