import React from 'react';
import { Document } from '@unlayer/react-elements';
import { Header } from '../../components/shared/Header';
import { HeroSection } from '../../components/shared/HeroSection';
import { CTAButton } from '../../components/shared/CTAButton';
import { ReceiptItems } from '../../components/shared/ReceiptItems';
import { Theme } from '../../theme/tokens';
import { ContentPayload } from '../../content/onboarding';

export function Receipt({ theme, content }: { theme: Theme; content: ContentPayload }) {
  return (
    <Document backgroundColor={theme.colors.background} fontFamily={theme.fontFamily}>
      <Header theme={theme} content={content} />
      <HeroSection theme={theme} content={content} />
      <ReceiptItems theme={theme} content={content} />
      <CTAButton theme={theme} content={content} />
    </Document>
  );
}
