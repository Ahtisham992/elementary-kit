import React from 'react';
import { Row, Column, Paragraph } from '@unlayer/react-elements';
import { Theme } from '../../theme/tokens';
import { ContentPayload } from '../../content/onboarding';

export function HeroSection({ theme, content }: { theme: Theme; content: ContentPayload }) {
  return (
    <Row>
      <Column>
        <Paragraph color={theme.colors.text} fontSize="16px" lineHeight="1.6" padding={theme.spacing.base}>
          {content.bodyCopy}
        </Paragraph>
      </Column>
    </Row>
  );
}
