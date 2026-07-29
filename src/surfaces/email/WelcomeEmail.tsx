import React from 'react';
import { Email } from '@unlayer/react-elements';
import { Header } from '../../components/shared/Header';
import { HeroSection } from '../../components/shared/HeroSection';
import { CTAButton } from '../../components/shared/CTAButton';
import { Footer } from '../../components/shared/Footer';
import { Theme } from '../../theme/tokens';
import { ContentPayload } from '../../content/onboarding';

export function WelcomeEmail({ theme, content }: { theme: Theme; content: ContentPayload }) {
  return (
    <Email backgroundColor={theme.colors.background} fontFamily={theme.fontFamily}>
      <Header theme={theme} content={content} />
      <HeroSection theme={theme} content={content} />
      <CTAButton theme={theme} content={content} />
      <Footer theme={theme} />
    </Email>
  );
}
