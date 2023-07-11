/* eslint-disable jsx-a11y/iframe-has-title */
// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingDarkMode,
  LandingThemeColor,
  LandingPricingPlans,
  LandingAdvertisement,
  LandingCleanInterfaces,
  LandingHugePackElements
} from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

// export default function LandingPage() {
//   const myHTML = `<h1>John Doe</h1>`;
//   const App = () => <div dangerouslySetInnerHTML={{ __html: myHTML }} />;
//   return (
//     <RootStyle title="The starting point for your next project | X-Pic" id="move_top">
//       <LandingHero />
//       <ContentStyle>
//         <LandingXPic />
//         <LandingHugePackElements />
//         <LandingDarkMode />
//         <LandingThemeColor />
//         <LandingCleanInterfaces />
//         <LandingPricingPlans />
//         <LandingAdvertisement />
//       </ContentStyle>
//     </RootStyle>
//   );
// }

export default function LandingPage() {
  return (
    <RootStyle title="The starting point for your next project | X-Pic" id="move_top">
      <LandingHero />
      <ContentStyle>
        {/* <LandingXPic /> */}
        <LandingHugePackElements />
        <LandingDarkMode />
        <LandingThemeColor />
        <LandingCleanInterfaces />
        <LandingPricingPlans />
        <LandingAdvertisement />
      </ContentStyle>
    </RootStyle>
    // <App />
  );
}
