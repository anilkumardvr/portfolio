import React, { useEffect, useState } from 'react';
import './ProfileBanner.css';
import PlayButton from '../components/PlayButton';
import MoreInfoButton from '../components/MoreInfoButton';
import { getProfileBanner } from '../queries/getProfileBanner';
import { ProfileBanner as ProfileBannerType } from '../types';
import resumePdf from '../Anil_Kumar_Devandla_Resume.pdf';

const ProfileBanner: React.FC = () => {

  const [bannerData, setBannerData] = useState<ProfileBannerType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfileBanner();
      setBannerData(data);
    }
    fetchData();
  }, []);

  if (!bannerData) return <div>Loading...</div>;

  const handlePlayClick = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Anil_Kumar_Devandla_Resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLinkedinClick = () => {
    window.open(bannerData.linkedinLink, '_blank');
  };

  return (
    <div className="profile-banner">
      <div className="banner-content">
        <h1 className="banner-headline" id='headline'>{bannerData.headline}</h1>
        <p className="banner-description">
          {bannerData.profileSummary}
        </p>

        <div className="banner-buttons">
          <PlayButton onClick={handlePlayClick} label="Resume" />
          <MoreInfoButton onClick={handleLinkedinClick} label="LinkedIn" />
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
