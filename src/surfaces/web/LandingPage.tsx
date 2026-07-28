import React from 'react';
import { Body } from '@unlayer/react-elements';
import { Header } from '../../components/shared/Header';
import { HeroSection } from '../../components/shared/HeroSection';
import { CTAButton } from '../../components/shared/CTAButton';
import { Theme } from '../../theme/tokens';
import { OnboardingContent } from '../../content/onboarding';

export function LandingPage({ theme, content }: { theme: Theme; content: OnboardingContent }) {
  return (
    <Body style={{ backgroundColor: theme.colors.background, fontFamily: theme.fontFamily }}>
      <Header theme={theme} content={content} />
      <HeroSection theme={theme} content={content} />
      <CTAButton theme={theme} content={content} />
    </Body>
  );
}
