import { sub } from 'date-fns';
//
import { boolean } from './boolean';
import { company } from './company';
// import { eventT, eventDesc, eventDate, eventImg } from './events';
import { phoneNumber } from './phoneNumber';
import { fullAddress, country } from './address';
import { eventsTitle, eventsLink, eventsIMG } from './name';
import { title, sentence, description } from './text';
import {
  titlePositions,
  sentencePositions,
  bonus,
  businessPositions,
  stone,
  stoneImg,
  positionImg,
  directs
} from './positions';
import { price, rating, age, percent, bizness } from './number';
import { firstName, lastName, fullName, email, reflink, role, teamBusiness, status } from './usersdata';

// ----------------------------------------------------------------------

const mockData = {
  id: (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index) => email[index],
  phoneNumber: (index) => phoneNumber[index],
  time: (index) => sub(new Date(), { days: index, hours: index }),
  boolean: (index) => boolean[index],
  role: (index) => role[index],
  company: (index) => company[index],
  address: {
    fullAddress: (index) => fullAddress[index],
    country: (index) => country[index]
  },
  name: {
    firstName: (index) => firstName[index],
    lastName: (index) => lastName[index],
    fullName: (index) => fullName[index],
    eventsTitle: (index) => eventsTitle[index],
    eventsLink: (index) => eventsLink[index],
    eventsIMG: (index) => eventsIMG[index],
    reflink: (index) => reflink[index],
    status: (index) => status[index]
  },
  text: {
    title: (index) => title[index],
    sentence: (index) => sentence[index],
    description: (index) => description[index]
  },
  positions: {
    titlePositions: (index) => titlePositions[index],
    sentencePositions: (index) => sentencePositions[index],
    description: (index) => description[index],
    bonus: (index) => bonus[index],
    stone: (index) => stone[index],
    directs: (index) => directs[index],
    stoneImg: (index) => stoneImg[index],
    positionImg: (index) => positionImg[index],
    businessPositions: (index) => businessPositions[index]
  },
  number: {
    percent: (index) => percent[index],
    rating: (index) => rating[index],
    age: (index) => age[index],
    bizness: (index) => bizness[index],
    price: (index) => price[index]
  },
  image: {
    cover: (index) => `/static/mock-images/covers/cover_${index + 1}.jpg`,
    feed: (index) => `/static/mock-images/feeds/feed_${index + 1}.jpg`,
    product: (index) => `/static/mock-images/products/product_${index + 1}.jpg`,
    avatar: (index) => `/static/mock-images/avatars/avatar_${index + 1}.svg`
  },
  userdetails: {
    firstName: (index) => firstName[index],
    lastName: (index) => lastName[index],
    fullName: (index) => fullName[index],
    email: (index) => email[index],
    reflink: (index) => reflink[index],
    time: (index) => sub(new Date(), { days: index, hours: index }),
    role: (index) => role[index],
    stone: (index) => stone[index],
    titlePositions: (index) => titlePositions[index],
    teamBusiness: (index) => teamBusiness[index],
    status: (index) => status[index]
  }
};

export default mockData;
