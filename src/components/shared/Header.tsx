import React from 'react';
import { Row, Column, Heading } from '@unlayer/react-elements';
import { Theme } from '../../theme/tokens';
import { OnboardingContent } from '../../content/onboarding';

export function Header({ theme, content }: { theme: Theme; content: OnboardingContent }) {
  return (
    <Row>
      <Column>
        <Heading color={theme.colors.primary} textAlign="center" fontSize="24px" padding={theme.spacing.base}>
          {content.headline}
        </Heading>
      </Column>
    </Row>
  );
}
