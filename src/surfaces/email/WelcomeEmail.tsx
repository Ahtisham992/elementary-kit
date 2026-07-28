import React from 'react';
import { Email, Row, Column, Heading, Paragraph, Button } from '@unlayer/react-elements';
import { onboardingContent } from '../../content/onboarding';

export function WelcomeEmail() {
  return (
    <Email style={{ backgroundColor: onboardingContent.brandColors.background }}>
      <Row>
        <Column>
          <Heading
            style={{
              color: onboardingContent.brandColors.primary,
              textAlign: 'center',
            }}
          >
            {onboardingContent.headline}
          </Heading>
          <Paragraph
            style={{
              color: onboardingContent.brandColors.text,
              fontSize: '16px',
            }}
          >
            {onboardingContent.bodyCopy}
          </Paragraph>
          <Button
            href={onboardingContent.ctaUrl}
            style={{
              backgroundColor: onboardingContent.brandColors.primary,
              color: '#ffffff',
            }}
          >
            {onboardingContent.ctaText}
          </Button>
        </Column>
      </Row>
    </Email>
  );
}
