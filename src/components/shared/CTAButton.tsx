import React from 'react';
import { Row, Column, Button } from '@unlayer/react-elements';
import { Theme } from '../../theme/tokens';
import { ContentPayload } from '../../content/onboarding';

export function CTAButton({ theme, content }: { theme: Theme; content: ContentPayload }) {
  return (
    <Row>
      <Column>
        <Button
          href={content.ctaUrl}
          backgroundColor={theme.colors.primary}
          color="#ffffff"
          padding="12px 24px"
          borderRadius="6px"
          fontWeight={700}
        >
          {content.ctaText}
        </Button>
      </Column>
    </Row>
  );
}
