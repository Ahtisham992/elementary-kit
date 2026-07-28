import React from 'react';
import { Row, Column, Button } from '@unlayer/react-elements';
import { Theme } from '../../theme/tokens';
import { OnboardingContent } from '../../content/onboarding';

export function CTAButton({ theme, content }: { theme: Theme; content: OnboardingContent }) {
  return (
    <Row>
      <Column>
        <Button
          href={content.ctaUrl}
          style={{
            backgroundColor: theme.colors.primary,
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: 'bold',
            marginTop: theme.spacing.base,
            marginBottom: theme.spacing.base,
          }}
        >
          {content.ctaText}
        </Button>
      </Column>
    </Row>
  );
}
