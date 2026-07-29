import React from 'react';
import { Row, Column, Heading as BaseHeading, Paragraph as BaseParagraph } from '@unlayer/react-elements';
const Paragraph = BaseParagraph as any;
const Heading = BaseHeading as any;
import { Theme } from '../../theme/tokens';
import { ContentPayload } from '../../content/onboarding';

export function Header({ theme, content }: { theme: Theme; content: ContentPayload }) {
  return (
    <Row>
      <Column>
        <Paragraph color="#888888" fontSize="11px" textAlign="center" padding="0 0 20px 0">
          View in Browser
        </Paragraph>
        <Heading color={theme.colors.primary} textAlign="center" fontSize="32px" padding="0 0 10px 0" style={{ fontWeight: '900', letterSpacing: '-1px' }}>
          ❖ EK
        </Heading>
        <Heading color={theme.colors.text} textAlign="center" fontSize="24px">
          {content.headline}
        </Heading>
      </Column>
    </Row>
  );
}
